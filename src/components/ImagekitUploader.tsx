"use client";

import React from "react";
import { ImageKitProvider, IKImage, IKUpload } from "imagekitio-next";
import { UploadImageIcon } from "./icons/UploadImageIcon";
import { Input } from "./ui/input";

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

export function ImageKitUploader() {
  const [image, setImage] = React.useState("");
  return (
    <div className="itec-center flex flex-col justify-center gap-2">
      <ImageKitProvider
        publicKey={publicKey}
        urlEndpoint={urlEndpoint}
        authenticator={authenticator}
      >
        <Input
          placeholder="Start your question with 'What', 'Why', 'How', etc"
          className="rounded-none border-b-0 border-l-0 border-r-0 border-t-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        {image !== "" ? (
          <IKImage
            urlEndpoint={urlEndpoint}
            src={image}
            lqip={{ active: true }}
            alt="Alt text"
            className="w-full rounded-md"
            width={600}
            height={300}
            style={{ objectFit: "contain" }}
          />
        ) : (
          <div className="flex items-center gap-2 border">
            <UploadImageIcon />
            <IKUpload
              fileName="test-upload.png"
              onError={onError}
              onSuccess={(res) => setImage(res?.url)}
            />
          </div>
        )}
      </ImageKitProvider>
    </div>
  );
}
