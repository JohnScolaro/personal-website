"use client";

import { useState, useEffect } from "react";

const getRandomImage = (imageArray) => {
  const randomIndex = Math.floor(Math.random() * imageArray.length);
  return imageArray[randomIndex];
};

export default function ImageCompetition() {
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const imageArray = ["1.png", "2.png", "3.png", "4.png"];

  useEffect(() => {
    newImages();
  }, []);

  function newImages() {
    const newImage1 = getRandomImage(imageArray);
    let newImage2;
    do {
      newImage2 = getRandomImage(imageArray);
    } while (newImage1 === newImage2);

    setImage1(newImage1);
    setImage2(newImage2);
  }

  const handleImageClick = async (isFirstImageWinner: boolean) => {
    const winner = isFirstImageWinner ? image1 : image2;
    const loser = isFirstImageWinner ? image2 : image1;

    // Send a request to your API route with the winner and loser IDs
    const response = await fetch("/api/record-winner", {
      method: "POST",
      body: JSON.stringify({ winner: winner, loser: loser }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      // Handle a successful response from your API here.
    } else {
      // Handle unseccuessful response here.
    }

    newImages();
  };

  return (
    <div>
      <div onClick={() => handleImageClick(true)}>
        <img src={`/images/sketch-rank/${image1}`} alt="Image 1" />
      </div>
      <div onClick={() => handleImageClick(false)}>
        <img src={`/images/sketch-rank/${image2}`} alt="Image 2" />
      </div>
    </div>
  );
}
