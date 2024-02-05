import Bull from "bull";
import { classifyImage } from "./imagga";

// Queue can process a maximum of 1 request per 1000 ms(1s)
export const imageClassificationQueue = new Bull("imageClassification", {
  limiter: {
    max: 1,
    duration: 1000,
  },
});

type ProcessImageJob = {
  webhookUrl: string;
  job: { id: string; imaggaUploadId: string };
};

async function processImageJob(processData: any) {
  const { webhookUrl, job } = processData as ProcessImageJob;

  const res = await classifyImage(job.imaggaUploadId);
  const status = res.status.type;

  await fetch(webhookUrl, {
    method: "POST",
    body: JSON.stringify({
      message: "Job Completed",
      jobId: job.id,
      result: res.result,
      completionStatus: status === "success" ? "SUCCESS" : "ERROR",
    }),
  });
}

imageClassificationQueue.process(processImageJob);
