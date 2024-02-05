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
import { ImageClassificationJob } from "@prisma/client";
import { Separator } from "@/components/ui/separator";
import { ClassifyResult } from "@/lib/imagga";
import { ScrollArea } from "@/components/ui/scroll-area";

type CompletedCardProps = {
  job: ImageClassificationJob & { image: string };
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
        <CardDescription title={job.createdAt.toString()}>
          {formatDistanceToNow(job.createdAt, { includeSeconds: true })} ago
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex w-full gap-4">
          <div className="relative aspect-video h-[400px]">
            <Image
              src={`data:image/${isSvg ? "svg+xml" : "png"};base64,${job.image}`}
              alt={"Image sent for classification"}
              className="mt-2 object-contain text-center text-gray-600"
              fill
            />
          </div>
          <Separator orientation="vertical" className="h-[400px]" />
          <ScrollArea className="h-[400px] w-full">
            <div className="space-y-2">
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
                        Math.max(parseFloat(confidence.toFixed(2)), 10) + "%",
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
