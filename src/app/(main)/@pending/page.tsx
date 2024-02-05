import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getJobsInPendingState } from "@/data-access/job";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { getFileExtension } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function PendingPage() {
  const pendingJobs = await getJobsInPendingState();
  return (
    <div className="grid h-full place-items-center overflow-auto">
      <div className="flex w-full flex-col items-center justify-center gap-4 py-8">
        {pendingJobs.length === 0 && (
          <h1 className="text-lg">No task in pending state</h1>
        )}
        {pendingJobs.map((job) => {
          const isSvg = getFileExtension(job.imageName) === "svg";
          return (
            <Card key={job.id} className="w-full max-w-sm">
              <CardHeader>
                <CardTitle className="line-clamp-1" title={job.imageName}>
                  {job.imageName}
                </CardTitle>
                <CardDescription title={job.createdAt.toString()}>
                  {formatDistanceToNow(job.createdAt, { includeSeconds: true })}{" "}
                  ago
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <div className="relative aspect-video w-full">
                    <Image
                      src={`data:image/${isSvg ? "svg+xml" : "png"};base64,${job.image}`}
                      alt={"Image sent for classification"}
                      className="mt-2 object-contain text-center text-gray-600"
                      fill
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
