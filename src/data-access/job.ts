import prisma from "@/lib/prisma";

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
