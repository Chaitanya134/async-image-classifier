import { prisma } from "@/lib/prisma";
import { splitBufferIntoChunks } from "@/lib/utils";

const MAX_CHUNK_SIZE = 1024 * 1024; // 1MB

export async function POST(req: Request, res: Response) {
  try {
    const data = await req.formData();
    const image: File | null = data.get("image") as unknown as File;

    if (!image) {
      return Response.json({ message: "No image found" }, { status: 400 });
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const chunks = splitBufferIntoChunks(buffer, MAX_CHUNK_SIZE);

    const imageChunks = chunks.map((chunk, index) => {
      return {
        index: index + 1,
        data: chunk,
      };
    });

    const job = await prisma.imageClassificationJob.create({
      data: {
        status: "PENDING",
        images: {
          create: {
            data: chunks,
          },
        },
      },
    });

    return Response.json({ message: "Success" }, { status: 200 });
  } catch (err) {
    console.log(err);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
