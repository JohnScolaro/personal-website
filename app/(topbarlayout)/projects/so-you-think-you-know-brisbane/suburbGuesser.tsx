"use client";

import suburbInfo from "./suburbInfo.json";
import { useEffect, useState } from "react";
import { CenteredSpinner } from "../../../../components/spinner/spinner";
import Image from "next/image";
import WrappedAwesomeButton from "../../../../components/wrapped-awesome-button";
import ReactSelect from "../../../../components/wrapped-select";
import JSConfetti from "js-confetti";

export default function SuburbGuesser() {
  const [imageName, setImageName] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(true);
  const [guess, setGuess] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showNext, setShowNext] = useState(false);
  const [selectKey, setSelectKey] = useState(0);
  const [lastSuburbs, setLastSuburbs] = useState<string[]>([]);

  const easySuburbs = [
    "Brisbane City",
    "South Brisbane",
    "Spring Hill",
    "Kangaroo Point",
    "Petrie Terrace",
    "Fortitude Valley",
    "Milton",
    "New Farm",
    "Highgate Hill",
    "Herston",
    "West End",
    "East Brisbane",
    "Kelvin Grove",
    "Teneriffe",
    "Woolloongabba",
    "Dutton Park",
    "Paddington",
    "Red Hill",
    "Auchenflower",
    "Bowen Hills",
    "Newstead",
  ]; // A set of 'easy' suburbs to ensure that users get a couple sensible suburbs initially, so they can feel good about themselves.

  // Populate options for the ReactSelect component
  const options = Object.keys(suburbInfo).map((suburb) => ({
    value: suburb,
    label: suburb,
  }));

  // Function to get a random suburb name from suburbInfo.json
  function getRandomSuburb(exclude: string[]): string {
    const availableSuburbs = Object.keys(suburbInfo).filter(
      (suburb) => !exclude.includes(suburb)
    );
    const randomIndex = Math.floor(Math.random() * availableSuburbs.length);
    return availableSuburbs[randomIndex];
  }

  // Function to load a new image
  function loadNewImage() {
    setFeedback(null);
    setGuess(null);
    setSelectKey((prevKey) => prevKey + 1);
    setShowNext(false);

    let newSuburb;
    if (lastSuburbs.length <= 1) {
      // Use an initial known suburb for the first 2 selections
      const remainingEasySuburbs = easySuburbs.filter(
        (suburb) => !lastSuburbs.includes(suburb)
      );

      // Randomly select from remaining easy suburbs
      newSuburb =
        remainingEasySuburbs[
          Math.floor(Math.random() * remainingEasySuburbs.length)
        ];
    } else {
      // Random suburb excluding the last 40 suburbs
      newSuburb = getRandomSuburb(lastSuburbs);
    }

    // Update image and lastSuburbs list
    setImageLoading(true);
    setImageName(newSuburb);
    setLastSuburbs((prev) => {
      const updatedList = [...prev, newSuburb];
      return updatedList.length > 40 ? updatedList.slice(1) : updatedList;
    });
  }

  // Set initial image on component mount
  useEffect(() => {
    loadNewImage();
  }, []);

  // Helper function to construct the image URL
  function getImageUrlFromImageName(imageName) {
    return `/images/do-you-think-you-know-brisbane/${suburbInfo[imageName]}`;
  }

  // Handle submit guess
  function handleSubmitGuess() {
    if (guess === imageName) {
      const jsConfetti = new JSConfetti();
      jsConfetti.addConfetti({
        confettiRadius: 4,
        confettiNumber: 150,
        confettiColors: ["#006bb6", "#ffd51a"], // Colours of the Brisbane City Council Logo :D
      });
      setFeedback(`🎉 Correct! 🎉`);
    } else {
      setFeedback(`WRONG! It's ${imageName}`);
    }
    setShowNext(true); // Show "Next Suburb" button
  }

  // Handle give up
  function handleGiveUp() {
    setFeedback(`It's ${imageName}`);
    setShowNext(true); // Show "Next Suburb" button
  }

  return (
    <>
      <div className="flex flex-col items-center mt-8">
        <div className="flex flex-col sm:flex-row md:justify-center gap-4 items-center mt-2">
          {imageName !== null && (
            <div className="p-2 border-2 rounded-lg border-gray-200 hover:border-gray-400 w-fit relative">
              {imageLoading ? (
                <div className="absolute w-full h-full left-0 top-0 bg-white rounded-lg">
                  <CenteredSpinner />
                </div>
              ) : null}
              <Image
                className="cursor-pointer"
                src={getImageUrlFromImageName(imageName)}
                alt={`An image of ${imageName}, a suburb of Brisbane`}
                width={500}
                height={500}
                loading="eager"
                onLoad={() => setImageLoading(false)}
                priority={true}
              />
            </div>
          )}
        </div>
        {/* Select dropdown for guessing */}
        <div className="mt-4 w-64 z-10">
          <ReactSelect
            key={selectKey}
            options={options}
            onChange={(option) => setGuess(option ? option.value : null)}
            defaultValue={null}
            isClearable={true}
            id="suburbDropdown"
            required
          />
        </div>

        {/* Feedback on the guess */}
        {feedback && (
          <p
            className={`mt-2 text-lg font-semibold ${
              feedback.includes("Correct") ? "text-green-700" : "text-red-600"
            }`}
          >
            {feedback}
          </p>
        )}

        {/* Submit and Give Up buttons */}
        {!showNext && (
          <div className="flex gap-2 mt-4">
            <WrappedAwesomeButton
              onPress={handleSubmitGuess}
              disabled={!guess} // Disable if no guess selected
              containerProps={{ type: "button" }}
            >
              Submit
            </WrappedAwesomeButton>
            <WrappedAwesomeButton
              onPress={handleGiveUp}
              containerProps={{ type: "button" }}
            >
              Give Up
            </WrappedAwesomeButton>
          </div>
        )}
        {/* Next Suburb Button */}
        {showNext && (
          <WrappedAwesomeButton
            onPress={loadNewImage}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            containerProps={{ type: "button" }}
          >
            Next Suburb
          </WrappedAwesomeButton>
        )}
      </div>
    </>
  );
}
