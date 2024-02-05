import { setJobCompleted } from "@/data-access/job";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  const { jobId, completionStatus, result } = (await req.json()) as any;
  await setJobCompleted({
    jobId,
    completionStatus,
    result: JSON.stringify(result),
  });

  revalidatePath("/", "layout");

  return Response.json({ message: "success" });
}
