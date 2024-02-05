import Bull from "bull";
import { ImageClassificationJob } from "@prisma/client";

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

async function processImageJob(processData: ProcessImageJob) {
  const { webhookUrl, job } = processData;
}
