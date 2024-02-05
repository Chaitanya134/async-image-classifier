import { ReloadIcon } from "@radix-ui/react-icons";

export default function Loading() {
  return (
    <div className="grid h-full place-items-center">
      <ReloadIcon className="h-10 w-10 animate-spin" />
    </div>
  );
}
