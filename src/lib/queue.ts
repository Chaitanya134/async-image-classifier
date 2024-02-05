import { Queue, Worker } from "bullmq";
import { classifyImage } from "./imagga";

export const imageClassificationQueue = new Queue("imageClassification");

type ProcessImageJob = {
  webhookUrl: string;
  job: { id: string; imaggaUploadId: string };
};

async function processImageJob(processJob: any) {
  const { webhookUrl, job } = processJob.data as ProcessImageJob;
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

// Worker can process a maximum of 1 request per 10000ms (10sec)
const worker = new Worker(
  "imageClassification",
  async (job) => processImageJob(job),
  {
    limiter: { duration: 10000, max: 1 },
    connection: { host: "localhost", port: 6379 },
  },
);
