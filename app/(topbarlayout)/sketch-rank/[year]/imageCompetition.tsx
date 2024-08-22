"use client";

import Image from "next/image";
import { useState } from "react";
import sketchRankSecurity from "../../../../lib/encryption";
import {
  getRandomImageId,
  getImageFileFromImageId,
  getImageUrlFromImageName,
} from "./utils";
import { CenteredSpinner } from "../../../../components/spinner/spinner";

interface ImageCompetitionProps {
  year: string;
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
  const [imagesRanked, setImagesRanked] = useState(0);
  const [image1Loading, setImage1Loading] = useState(true);
  const [image2Loading, setImage2Loading] = useState(true);

  function newImages() {
    // Image 1 can't be either of the previous images, and image 2 can't be
    // either of the previous images OR image 1.
    const newImage1Id = getRandomImageId(props.numImages, [imageId1, imageId2]);
    const newImage2Id = getRandomImageId(props.numImages, [
      imageId1,
      imageId2,
      newImage1Id,
    ]);

    setImage1Loading(true);
    setImage2Loading(true);

    setImageId1(newImage1Id);
    setImageId2(newImage2Id);
  }

  const handleImageClick = async (isFirstImageWinner: boolean) => {
    setImagesRanked(imagesRanked + 1);
    const winner = isFirstImageWinner ? imageId1 : imageId2;
    const loser = isFirstImageWinner ? imageId2 : imageId1;

    // Send a request to your API route with the winner and loser IDs
    fetch("/api/sketch-rank/ingest", {
      method: "POST",
      body: JSON.stringify({
        winner: winner,
        loser: loser,
        sessionId: sessionId,
        year: props.year,
        secret: sketchRankSecurity(winner, loser, sessionId, props.year),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status === 200) {
        // Handle successful response here
      } else {
        // handle non-200 response here
      }
    });

    newImages();
  };

  return (
    <>
      <div className="flex flex-row gap-2 justify-center">
        <div className="p-2 text-bold border-2 rounded-lg border-gray-200">
          Images ranked: {imagesRanked + " " + selectEmoji(imagesRanked)}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row md:justify-center gap-4 items-center mt-2">
        <div className="p-2 border-2 rounded-lg border-gray-200 hover:border-gray-400 w-fit relative">
          {image1Loading || image2Loading ? (
            <div className="absolute w-full h-full left-0 top-0 bg-white rounded-lg">
              <CenteredSpinner />
            </div>
          ) : null}
          <Image
            className="cursor-pointer"
            src={getImageUrlFromImageName(
              props.year,
              getImageFileFromImageId(imageId1)
            )}
            alt="Image 1"
            width={500}
            height={500}
            loading="eager"
            onLoad={(event) => {
              setImage1Loading(false);
            }}
            onClick={() => {
              handleImageClick(true);
            }}
          />
        </div>
        <div className="p-2 border-2 rounded-lg border-gray-200 hover:border-gray-400 w-fit relative">
          {image1Loading || image2Loading ? (
            <div className="absolute w-full h-full left-0 top-0 bg-white rounded-lg">
              <CenteredSpinner />
            </div>
          ) : null}
          <Image
            className="cursor-pointer"
            src={getImageUrlFromImageName(
              props.year,
              getImageFileFromImageId(imageId2)
            )}
            alt="Image 2"
            width={500}
            height={500}
            loading="eager"
            onLoad={(event) => {
              setImage2Loading(false);
            }}
            onClick={() => {
              handleImageClick(false);
            }}
          />
        </div>
      </div>
    </>
  );
}

function selectEmoji(numImagesRanked: number) {
  if (numImagesRanked < 1) {
    return "😴";
  }
  if (numImagesRanked < 2) {
    return "😪";
  }
  if (numImagesRanked < 5) {
    return "😌";
  }
  if (numImagesRanked < 10) {
    return "🥹";
  }
  if (numImagesRanked < 15) {
    return "😳";
  }
  if (numImagesRanked < 20) {
    return "😲";
  }
  if (numImagesRanked < 25) {
    return "😮";
  }
  if (numImagesRanked < 30) {
    return "🫡";
  }
  if (numImagesRanked < 35) {
    return "🫢";
  }
  if (numImagesRanked < 40) {
    return "😈";
  }
  if (numImagesRanked < 45) {
    return "🥵";
  }
  if (numImagesRanked < 50) {
    return "🥴";
  }
  if (numImagesRanked < 100) {
    return "😱";
  }

  return "🤯";
}
