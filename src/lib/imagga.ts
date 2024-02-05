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

export async function uploadImageToImagga(data: FormData) {
  const res = await got.post("https://api.imagga.com/v2/uploads", {
    body: data,
    username: apiKey,
    password: apiSecret,
  });

  return JSON.parse(res.body) as unknown as ImaggaResponse<UploadResult>;
}

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
