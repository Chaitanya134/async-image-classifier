import { setJobCompleted } from "@/data-access/job";

export async function POST(req: Request) {
  const { jobId, completionStatus, result } = req.body as any;
  await setJobCompleted({
    jobId,
    completionStatus,
    result,
  });

  Response.json({ message: "success" });
}
