import { getJobsInCompletedState } from "@/data-access/job";
import CompletedCard from "./completed-card";

export const dynamic = "force-dynamic";

export default async function CompletedPage() {
  const completedJobs = await getJobsInCompletedState();
  return (
    <div className="grid h-full place-items-center overflow-auto">
      <div className="flex w-full flex-col items-center justify-center gap-8 py-8">
        {completedJobs.length === 0 && (
          <h1 className="text-lg">No task in completed state</h1>
        )}
        {completedJobs.map((job) => (
          <CompletedCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}
