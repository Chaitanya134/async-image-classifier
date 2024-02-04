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
import { useToast } from "@/components/ui/use-toast";

export default function HomePage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    setSelectedFile(files[0]);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(files[0]);
  };

  const classifyDisabled = !selectedFile || isLoading;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const form = e.currentTarget;
      const formData = new FormData(form);
      const res = await fetch("/api/job", { method: "POST", body: formData });
      const data = await res.json();
      resetForm(form);
      toast({
        title: "Image classification proccess started",
        description: "Your image is currently in pending state",
      });
    } catch (err) {
      console.log(err);
      toast({
        title: "Error occured",
        description: "Error uploading file",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  function resetForm(form: HTMLFormElement) {
    form.reset();
    setSelectedFile(null);
    setPreviewImage(null);
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
            {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            Classify
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
