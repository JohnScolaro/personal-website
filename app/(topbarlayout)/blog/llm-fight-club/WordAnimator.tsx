"use client";

import { useEffect, useState } from "react";

interface WordAnimatorProps {
  words: string[];
  interval?: number; // how long the word stays fully visible
  offset?: number; // extra delay only before first transition
  fadeDuration?: number; // fade in/out duration
}

export default function WordAnimator({
  words,
  interval = 1000,
  offset = 0,
  fadeDuration = 300,
}: WordAnimatorProps) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let transitionTimer: NodeJS.Timeout;
    let fadeTimer: NodeJS.Timeout;

    const startTransition = (delay: number) => {
      transitionTimer = setTimeout(() => {
        setVisible(false); // start fading out

        fadeTimer = setTimeout(() => {
          setIndex((prev) => (prev + 1) % words.length); // change word
          setVisible(true); // start fading in
          startTransition(interval); // from now on, always use interval
        }, fadeDuration); // switch word after fade out completes
      }, delay);
    };

    startTransition(interval + offset);

    return () => {
      clearTimeout(transitionTimer);
      clearTimeout(fadeTimer);
    };
  }, [words, interval, offset, fadeDuration]);

  return (
    <span
      style={{
        transition: `opacity ${fadeDuration}ms ease`,
        opacity: visible ? 1 : 0,
        display: "inline-block",
      }}
    >
      {words[index]}
    </span>
  );
}
