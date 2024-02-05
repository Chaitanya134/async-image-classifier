"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useState } from "react";

type RetryButtonProps = {
  jobId: string;
  imaggaUploadId: string;
};

export default function RetryButton({
  jobId,
  imaggaUploadId,
}: RetryButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleClick() {
    try {
      setIsLoading(true);
      await fetch(`/api/job/pending/${jobId}`, {
        method: "POST",
        body: JSON.stringify({
          jobId: jobId,
          imaggaUploadId: imaggaUploadId,
        }),
      });
      toast({
        title: "Image sent for classification again",
        description: "Your image is currently in pending state",
      });
      router.refresh();
    } catch (err) {
      console.log(err);
      toast({
        title: "Error occured",
        description: "Error while retrying",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Button variant="destructive-outline" size="lg" onClick={handleClick}>
      {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
      {isLoading ? "Retrying" : "Retry"}
    </Button>
  );
}
