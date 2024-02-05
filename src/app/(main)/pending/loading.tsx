import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="grid h-full place-items-center gap-8 py-8">
      <Skeleton className="h-[300px] w-full max-w-sm rounded-xl" />
      <Skeleton className="h-[300px] w-full max-w-sm rounded-xl" />
      <Skeleton className="h-[300px] w-full max-w-sm rounded-xl" />
    </div>
  );
}
