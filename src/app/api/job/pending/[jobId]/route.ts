import { setJobPending } from "@/data-access/job";
import { imageClassificationQueue } from "@/lib/queue";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  const { jobId, imaggaUploadId } = (await req.json()) as any;
  await setJobPending(jobId);

  revalidatePath("/", "layout");

  imageClassificationQueue.add("imageClassification", {
    webhookUrl: `http://localhost:3000/api/job/completed/${jobId}`,
    job: { id: jobId, imaggaUploadId },
  });

  return Response.json({ message: "success" });
}
