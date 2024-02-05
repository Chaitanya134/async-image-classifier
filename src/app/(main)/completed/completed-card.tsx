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
import { Separator } from "@/components/ui/separator";
import { ClassifyResult } from "@/lib/imagga";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ImageClassificationJobWithImage } from "@/lib/types";
import RetryButton from "./retry-button";

type CompletedCardProps = {
  job: ImageClassificationJobWithImage;
};

export default function CompletedCard({ job }: CompletedCardProps) {
  const isSvg = getFileExtension(job.imageName) === "svg";
  const result = JSON.parse(job.result!) as ClassifyResult;

  return (
    <Card key={job.id} className="w-full">
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
            <span title={job.completedAt!.toString()} className="ml-2">
              Completed:{" "}
              {formatDistanceToNow(job.completedAt!, { includeSeconds: true })}{" "}
              ago
            </span>
          </>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex w-full flex-col gap-4 xl:flex-row">
          <div className="relative aspect-video h-[400px]">
            <Image
              src={`data:image/${isSvg ? "svg+xml" : "png"};base64,${job.image}`}
              alt={"Image sent for classification"}
              className="mt-2 object-contain text-center text-gray-600"
              fill
            />
          </div>
          {
            <Separator
              orientation="horizontal"
              className="my-2 block xl:hidden"
            />
          }
          {<Separator orientation="vertical" className="hidden xl:h-[400px]" />}
          <ScrollArea className="h-[400px] w-full">
            <div className="space-y-2">
              {result.tags.length === 0 && (
                <div className="grid h-[400px] w-full place-items-center">
                  <RetryButton
                    jobId={job.id}
                    imaggaUploadId={job.imaggaUploadId}
                  />
                </div>
              )}
              {result.tags.map(({ confidence, tag }, index) => (
                <div
                  key={index}
                  className="grid w-full grid-cols-12 items-center gap-2 pr-8"
                >
                  <span className="col-span-3 break-words">{tag.en}</span>
                  <div
                    aria-hidden
                    className="col-span-8 h-8 bg-black"
                    style={{
                      width: confidence.toFixed(2) + "%",
                      opacity:
                        Math.max(parseFloat(confidence.toFixed(2)), 5) + "%",
                    }}
                  />
                  <span className="col-span-1">{confidence.toFixed(2)}%</span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
}
