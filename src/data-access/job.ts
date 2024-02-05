import prisma from "@/lib/prisma";
import { ImageClassificationJob } from "@prisma/client";

export async function getJobsInPendingState() {
  const jobs = await prisma.imageClassificationJob.findMany({
    include: {
      images: true,
    },
    where: { status: "PENDING" },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Combine the image chunks into one single image
  return jobs.map(({ images, ...job }) => ({
    ...job,
    image: images.reduce((data, image) => data + image.data, ""),
  }));
}

export async function getJobsInCompletedState() {
  const jobs = await prisma.imageClassificationJob.findMany({
    include: {
      images: true,
    },
    where: { status: "COMPLETED" },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Combine the image chunks into one single image
  return jobs.map(({ images, ...job }) => ({
    ...job,
    image: images.reduce((data, image) => data + image.data, ""),
  }));
}

type SetJobCompleted = {
  job: ImageClassificationJob;
  result: string;
  completionStatus: ImageClassificationJob["completionStatus"];
};

export async function setJobCompleted({
  job,
  result,
  completionStatus,
}: SetJobCompleted) {
  await prisma.imageClassificationJob.update({
    data: {
      status: "COMPLETED",
      completionStatus,
      result,
      completedAt: new Date(),
    },
    where: { id: job.id },
  });
}
