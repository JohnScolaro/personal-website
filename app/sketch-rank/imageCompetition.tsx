"use client";

import Image from "next/image";
import { useState } from "react";
import sketchRankSecurity from "../../lib/encryption";
import {
  getRandomImageId,
  getImageFileFromImageId,
  getImageUrlFromImageName,
} from "./utils";

interface ImageCompetitionProps {
  numImages: number;
}

export default function ImageCompetition(props: ImageCompetitionProps) {
  const [imageId1, setImageId1] = useState(getRandomImageId(props.numImages));
  const [imageId2, setImageId2] = useState(
    getRandomImageId(props.numImages, imageId1)
  );
  const [sessionId, setSessionId] = useState(
    Math.floor(Math.random() * 1000000000)
  );

  function newImages() {
    const newImage1Id = getRandomImageId(props.numImages);
    const newImage2Id = getRandomImageId(props.numImages, newImage1Id);
    setImageId1(newImage1Id);
    setImageId2(newImage2Id);
  }

  const handleImageClick = async (isFirstImageWinner: boolean) => {
    const winner = isFirstImageWinner ? imageId1 : imageId2;
    const loser = isFirstImageWinner ? imageId2 : imageId1;

    // Send a request to your API route with the winner and loser IDs
    const response = await fetch("/api/sketch-rank/ingest", {
      method: "POST",
      body: JSON.stringify({
        winner: winner,
        loser: loser,
        sessionId: sessionId,
        secret: sketchRankSecurity(winner, loser, sessionId),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      // Handle a successful response from your API here.
    } else {
      // Handle unsuccessful response here.
    }

    newImages();
  };

  return (
    <div className="flex flex-col sm:flex-row md:justify-center gap-4 items-center">
      <div
        className="p-2 border-2 rounded-lg border-gray-200 hover:border-gray-400 w-fit"
        onClick={() => handleImageClick(true)}
      >
        <Image
          src={getImageUrlFromImageName(getImageFileFromImageId(imageId1))}
          alt="Image 1"
          width={500}
          height={500}
          loading="eager"
        />
      </div>
      <div
        className="p-2 border-2 rounded-lg border-gray-200 hover:border-gray-400 w-fit"
        onClick={() => handleImageClick(false)}
      >
        <Image
          src={getImageUrlFromImageName(getImageFileFromImageId(imageId2))}
          alt="Image 2"
          width={500}
          height={500}
          loading="eager"
        />
      </div>
    </div>
  );
}
