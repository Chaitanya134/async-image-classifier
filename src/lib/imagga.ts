import got from "got";

const apiKey = process.env.IMAGGA_API_KEY;
const apiSecret = process.env.IMAGGA_API_SECRET;

type ImaggaResponse<TResult> = {
  result: TResult;
  status: {
    text: string;
    type: "success" | "error";
  };
};

type UploadResult = {
  upload_id: string;
};

export type ClassifyResult = {
  tags: {
    confidence: number;
    tag: {
      en: string;
    };
  }[];
};

/**
 * Uploads an image to Imagga for processing.
 *
 * @param {FormData} data - The FormData containing the image file to upload.
 * @returns {Promise<ImaggaResponse<UploadResult>>} A Promise that resolves to the Imagga API response for the upload operation.
 */
export async function uploadImageToImagga(data: FormData) {
  const res = await got.post("https://api.imagga.com/v2/uploads", {
    body: data,
    username: apiKey,
    password: apiSecret,
  });

  return JSON.parse(res.body) as unknown as ImaggaResponse<UploadResult>;
}

/**
 * Retrieves classification results for an image from Imagga with a 40% chance of resulting in error.
 *
 * @param {string} uploadId - The unique identifier of the uploaded image in Imagga.
 * @returns {Promise<ImaggaResponse<ClassifyResult>>} A Promise that resolves to the Imagga API response for image classification.
 */
export async function classifyImage(uploadId: string) {
  const res = await got(
    `https://api.imagga.com/v2/tags?image_upload_id=${encodeURIComponent(uploadId)}`,
    { username: apiKey, password: apiSecret },
  );

  const response = JSON.parse(
    res.body,
  ) as unknown as ImaggaResponse<ClassifyResult>;

  // mock an error while classifying image with probability of 40%
  if (Math.random() <= 0.4) {
    response.status.type = "error";
    response.result.tags = [];
  }

  return response;
}
