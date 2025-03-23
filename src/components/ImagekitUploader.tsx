"use client";

import React from "react";
import { ImageKitProvider, IKUpload } from "imagekitio-next";
import { ImagePlus } from "lucide-react";
import { Button } from "./ui/button";

const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

const authenticator = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/imagekit/auth");

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`,
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

const onError = (err: any) => {
  console.log("Error", err);
};

export function ImageKitUploader({
  onQuestionImageChange,
}: {
  onQuestionImageChange: (image: string) => void;
}) {
  const imageRef = React.useRef<HTMLInputElement>(null);
  return (
    <div className="itec-center flex flex-col justify-center gap-2">
      <ImageKitProvider
        publicKey={publicKey}
        urlEndpoint={urlEndpoint}
        authenticator={authenticator}
      >
        <div className="flex items-center gap-2 border">
          <Button onClick={() => imageRef.current?.click()}>
            <ImagePlus className="h-4 w-4" />
          </Button>
          <IKUpload
            ref={imageRef}
            fileName="test-upload.png"
            onError={onError}
            onLoad={() => console.log("loading upload image..")}
            onSuccess={(res) => onQuestionImageChange(res?.url)}
            className="hidden"
          />
        </div>
      </ImageKitProvider>
    </div>
  );
}
