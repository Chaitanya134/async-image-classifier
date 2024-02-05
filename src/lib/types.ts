import { ImageClassificationJob } from "@prisma/client";

export type ImageClassificationJobWithImage = ImageClassificationJob & {
  image: string;
};
