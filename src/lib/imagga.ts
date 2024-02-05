import got from "got";

const apiKey = process.env.IMAGGA_API_KEY;
const apiSecret = process.env.IMAGGA_API_SECRET;

type UploadImageResponse = {
  result: {
    upload_id: string;
  };
  status: {
    text: string;
    type: "success" | "error";
  };
};

export async function uploadImageToImagga(data: FormData) {
  const res = await got.post("https://api.imagga.com/v2/uploads", {
    body: data,
    username: apiKey,
    password: apiSecret,
  });

  return JSON.parse(res.body) as unknown as UploadImageResponse;
}
