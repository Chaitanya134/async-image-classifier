import { Queue, Worker } from "bullmq";
import { classifyImage } from "./imagga";

export const JOB_PROCESSING_DELAY = 5 * 1000; // 5000 milliseconds (5 seconds) delay between processing each job
export const imageClassificationQueue = new Queue("imageClassification");

type ProcessImageJob = {
  webhookUrl: string;
  job: { id: string; imaggaUploadId: string };
};

/**
 * Processes an image classification job by calling the Imagga API, updating the job status, and notifying the user.
 *
 * @param {Object} processJob - The data associated with the image classification job.
 * @param {string} processJob.data.webhookUrl - The URL to send the job completion notification.
 * @param {Object} processJob.data.job - Details of the image classification job.
 * @param {string} processJob.data.job.id - The unique identifier of the job.
 * @param {string} processJob.data.job.imaggaUploadId - The Imagga upload ID associated with the image.
 * @returns {Promise<void>} A Promise that resolves once the job processing is complete.
 */
async function processImageJob(processJob: { data: ProcessImageJob }) {
  const { webhookUrl, job } = processJob.data;
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
