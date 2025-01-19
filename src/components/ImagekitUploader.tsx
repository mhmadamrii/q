"use client";

import React from "react";
import { ImageKitProvider, IKImage, IKUpload } from "imagekitio-next";

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
  console.log("image current", image);
  return (
    <div>
      <ImageKitProvider
        publicKey={publicKey}
        urlEndpoint={urlEndpoint}
        authenticator={authenticator}
      >
        <div>
          <h2>File upload</h2>
          <IKUpload
            fileName="test-upload.png"
            onError={onError}
            onSuccess={(res) => setImage(res?.url)}
            className="border border-red-500"
          />
        </div>
        {image !== "" && (
          <IKImage
            urlEndpoint={urlEndpoint}
            src={image}
            lqip={{ active: true }}
            alt="Alt text"
          />
        )}
      </ImageKitProvider>
    </div>
  );
}
