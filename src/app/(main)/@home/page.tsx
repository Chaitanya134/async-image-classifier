"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";

export default function HomePage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    const files = event.target.files;
    if (!files || files.length === 0) return;
    setSelectedFile(files[0]);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(files[0]);
    setIsLoading(false);
  };

  const classifyDisabled = !selectedFile || isLoading;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    try {
      const res = await fetch("/api/job", { method: "POST", body: formData });
      const data = await res.json();
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form
      className="flex h-full items-center justify-center"
      onSubmit={handleSubmit}
    >
      <Card>
        <CardHeader>
          <CardTitle>Upload an Image</CardTitle>
          <CardDescription>Submit an Image for Classification</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Input
              id="picture"
              type="file"
              accept="image/*"
              name="image"
              onChange={handleFileChange}
            />
            {isLoading && (
              <ReloadIcon className="mx-auto mt-6 h-6 w-6 animate-spin text-slate-500" />
            )}
            {previewImage && selectedFile && (
              <div className="relative aspect-video w-full">
                <Image
                  src={previewImage}
                  alt={selectedFile.name}
                  className="mt-2 object-contain text-center text-gray-600"
                  fill
                />
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="ml-auto" disabled={classifyDisabled}>
            Classify
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
