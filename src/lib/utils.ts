import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Splits a Buffer into chunks of a specified size.
 * @param buffer - The Buffer to be split.
 * @param maxChunkSize - The maximum size of each chunk.
 * @returns An array of string chunks of buffer encoded to base64.
 */
export function splitBufferIntoChunks(buffer: Buffer, maxChunkSize: number) {
  const chunks = [];
  let offset = 0;

  while (offset < buffer.length) {
    const chunk = buffer.subarray(offset, offset + maxChunkSize);
    chunks.push(chunk.toString("base64"));
    offset += maxChunkSize;
  }

  return chunks;
}

/**
 * Gets the file extension from a given filename.
 *
 * @param {string} filename - The filename from which to extract the extension.
 * @returns {string} The file extension (without the dot) or an empty string if no extension is found.
 * @example
 * const filename = "example_image.png";
 * const extension = getFileExtension(filename);
 * console.log(extension); // Output: "png"
 */
export function getFileExtension(filename: string) {
  return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
}
