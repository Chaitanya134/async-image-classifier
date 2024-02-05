import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="grid h-full place-items-center gap-8 py-8">
      <Skeleton className="h-[500px] w-full rounded-xl" />
      <Skeleton className="h-[500px] w-full rounded-xl" />
      <Skeleton className="h-[500px] w-full rounded-xl" />
    </div>
  );
}
