import { getJobsInPendingState } from "@/data-access/job";
import PendingCard from "./pending-card";

export default async function PendingPage() {
  const pendingJobs = await getJobsInPendingState();
  return (
    <div className="grid h-full place-items-center overflow-auto">
      <div className="flex w-full flex-col items-center justify-center gap-4 py-8">
        {pendingJobs.length === 0 && (
          <h1 className="text-lg">No task in pending state</h1>
        )}
        {pendingJobs.map((job) => (
          <PendingCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}
