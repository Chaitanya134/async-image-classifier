import { setJobPending } from "@/data-access/job";
import { JOB_PROCESSING_DELAY, imageClassificationQueue } from "@/lib/queue";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  const { jobId, imaggaUploadId } = (await req.json()) as any;
  await setJobPending(jobId);

  revalidatePath("/", "layout");

  imageClassificationQueue.add(
    "imageClassification",
    {
      webhookUrl: `${process.env.CLIENT_URL}/api/job/completed/${jobId}`,
      job: { id: jobId, imaggaUploadId },
    },
    { delay: JOB_PROCESSING_DELAY },
  );

  return Response.json({ message: "success" });
}
