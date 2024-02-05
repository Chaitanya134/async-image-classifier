import { uploadImageToImagga } from "@/lib/imagga";
import { prisma } from "@/lib/prisma";
import { imageClassificationQueue } from "@/lib/queue";
import { splitBufferIntoChunks } from "@/lib/utils";
import got from "got";
import { revalidatePath } from "next/cache";

const MAX_CHUNK_SIZE = 1024 * 1024; // 1MB

export async function POST(req: Request, res: Response) {
  try {
    const data = await req.formData();
    const image: File | null = data.get("image") as unknown as File;

    if (!image) {
      return Response.json({ message: "No image found" }, { status: 400 });
    }

    const res = await uploadImageToImagga(data);
    console.log({ res });
    if (res.status.type === "error") {
      throw Error("Error in uploading image. Try again");
    }

    const uploadId = res.result.upload_id;

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const chunks = splitBufferIntoChunks(buffer, MAX_CHUNK_SIZE);

    const job = await prisma.imageClassificationJob.create({
      data: {
        imaggaUploadId: uploadId,
        imageName: image.name,
        status: "PENDING",
        images: {
          create: {
            data: chunks,
          },
        },
      },
    });

    imageClassificationQueue.add({
      webhookUrl: process.env.WEBHOOK_URL,
      job: { id: job.id, imaggaUploadId: job.imaggaUploadId },
    });

    revalidatePath("/");

    return Response.json({ message: "Success" }, { status: 200 });
  } catch (err) {
    console.log(err);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
