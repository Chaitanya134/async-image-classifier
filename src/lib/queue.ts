import { Queue, Worker } from "bullmq";
import { classifyImage } from "./imagga";

// Queue can process a maximum of 1 request per 1000 ms(1s)
export const imageClassificationQueue = new Queue("imageClassification");

type ProcessImageJob = {
  webhookUrl: string;
  job: { id: string; imaggaUploadId: string };
};

async function processImageJob(processJob: any) {
  const { webhookUrl, job } = processJob.data as ProcessImageJob;
  const res = await classifyImage(job.imaggaUploadId);
  const status = res.status.type;
  console.log(res.result.tags);

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

const worker = new Worker(
  "imageClassification",
  async (job) => processImageJob(job),
  {
    limiter: { duration: 1000, max: 1 },
    connection: { host: "localhost", port: 6379 },
  },
);
