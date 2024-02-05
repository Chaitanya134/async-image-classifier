import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { getFileExtension } from "@/lib/utils";
import { ImageClassificationJobWithImage } from "@/lib/types";

type PendingCardProps = {
  job: ImageClassificationJobWithImage;
};
export default function PendingCard({ job }: PendingCardProps) {
  const isSvg = getFileExtension(job.imageName) === "svg";

  return (
    <Card key={job.id} className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="line-clamp-1" title={job.imageName}>
          {job.imageName}
        </CardTitle>
        <CardDescription>
          <>
            <span title={job.createdAt.toString()} className="mr-2">
              Created:{" "}
              {formatDistanceToNow(job.createdAt, { includeSeconds: true })} ago
            </span>
            •
            <span title={job.pendingAt.toString()} className="ml-2">
              Pending:{" "}
              {formatDistanceToNow(job.pendingAt, { includeSeconds: true })} ago
            </span>
          </>
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
}
