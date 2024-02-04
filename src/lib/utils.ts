import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function splitBufferIntoChunks(buffer: Buffer, chunkSize: number) {
  const chunks = [];
  let offset = 0;

  while (offset < buffer.length) {
    const chunk = buffer.slice(offset, offset + chunkSize);
    chunks.push(chunk);
    offset += chunkSize;
  }

  return chunks;
}
