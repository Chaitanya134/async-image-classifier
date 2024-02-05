import { setJobCompleted } from "@/data-access/job";

export async function POST(req: Request) {
  const { jobId, completionStatus, result } = (await req.json()) as any;
  await setJobCompleted({
    jobId,
    completionStatus,
    result: JSON.stringify(result),
  });

  return Response.json({ message: "success" });
}
