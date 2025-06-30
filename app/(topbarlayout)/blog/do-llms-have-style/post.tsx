"use client";

import Date from "../../../../components/date";
import Card from "../../../../components/card";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function LLMStylePost() {
  return (
    <>
      <article className="prose prose-black max-w-4xl m-auto p-4 lg:prose-lg lg:m-auto prose-img:m-auto prose-img:max-w-xl prose-img:w-full">
        <h1 className="mb-1 lg:mb-1 text-center">Do LLM's have style?</h1>
        <div className="text-center">
          <Date dateString={"2025-04-19"} />
        </div>
        <p>
          As a primarily backend software developer, the intricacies and great
          depth of frontend software development is uncharted territory. I can
          cobble together something basic (like this site) and adhere to its
          style of "mainly white with some gray and black text" and things don't
          look too terrible.
        </p>
        <p>
          I recently made a website to send out marriage invitations however,
          and my stock standard card didn't cut it any more:
        </p>
        <div className="flex justify-center my-4">
          <Card title="See!" description="How boring is this!" />
        </div>
        <p>
          I gave an LLM my <code>&lt;Card&gt;</code> component and said
          something like: "Make it fit for a wedding invitation!", and it
          created a nice friendlier, lighter card, which when paired with pink
          accents, looked quite nice:
        </p>
        <WeddingStyledCard></WeddingStyledCard>
        <p>
          And this got me thinking: "What other tailwind themes can LLM's
          generate?" I'm sure they can spew out some more generic cards, but can
          I prompt them to give me anything <i>freaky</i>? Let's test this idea.
        </p>
        <p>
          All the cards below were generated with ChatGPT with the following
          prompt:
        </p>
        <blockquote>
          Please generate me a 'card' component for my next.js website. Please
          make the card look good on mobile and desktop. The card is designed to
          hold only a single sentence inside it. The card should wholly embrace
          the following theme in every way, with no limits as to what can be
          customised and how. The only limitation is that all modifications must
          be made in a single tsx file.
        </blockquote>
        <p>
          Any further text I added after this prompt has been inserted into the
          tastefully created cards below. Never fear, all other text on this
          page was artfully regurgitated by a human.
        </p>
        <GothicCard>The theme is gothic.</GothicCard>
        <div className="mt-6"></div>
        <BrutalistCard>The theme is brutalist.</BrutalistCard>
        <div className="mt-6"></div>
        <MinimalistCard>The theme is minimalist.</MinimalistCard>
        <div className="mt-6"></div>
        <MaximalistCard>The theme is maximalist.</MaximalistCard>
        <p>
          🤔 - Not half bad! The brutalist card appears to be a watered down
          version of{" "}
          <a href="https://neo-brutalism-ui-library.vercel.app/components/card">
            this
          </a>{" "}
          brutalist card which was lovingly created by a human. So while it's
          'neat' that this can be done, I'm not hugely surprised.
        </p>
        <p>
          Ok, so we can recreate themes that have been flogged half to death.
          LLM's are professionals are regurgitating tailwind, so when combined
          with the creativity of an actual human, maybe we can cook up some new
          never-before-seen themes.
        </p>
        <BananaCard>The theme is banana.</BananaCard>
        <div className="mt-6"></div>
        <p>
          I enjoyed this one a lot, so I got Gemini to take a hack at it too:
        </p>
        <GeminiBananaCard>The theme is banana.</GeminiBananaCard>
        <p>
          The rest use using ChatGPT again. Gemini has a penchant for external
          libraries, custom global styles, and generally disobeying the prompt
          in order to create gratuitously complex components.
        </p>
        <AnimationOverloadCard>
          The theme is animation overload.
        </AnimationOverloadCard>
        <div className="mt-6"></div>
        <CryingBabyFlightCard>
          The theme is "That feeling when a baby is crying behind you on a 12
          hour flight".
        </CryingBabyFlightCard>
        <div className="mt-6"></div>
        <TheWayIAreCard>
          The theme is the song "The way I are" by Timberland.
        </TheWayIAreCard>
        <h2>Takeaways</h2>
        <ul>
          <li>
            {" "}
            I feel like LLM's overuse large rounded components. These cards were
            made with tailwind, and ChatGPT loves to slap on{" "}
            <code className="before:content-none after:content-none">
              rounded-3xl
            </code>{" "}
            by default.{" "}
            <code className="before:content-none after:content-none">
              rounded-3xl
            </code>{" "}
            is to frontend style as the hand-with-too-many-fingers is to image
            generation.
          </li>
          <li>The vibe was captured surprisingly well.</li>
          <li>
            I don't think these cards look very good, and I probably wouldn't
            use them. I do think that they're a fairly good jumping off point
            though for further refinement.
          </li>
        </ul>
        <Image
          src={"/images/blog/do-llms-have-style/rounded.png"}
          alt="test."
          width={1454}
          height={1408}
          className="rounded-3xl"
        ></Image>
      </article>
    </>
  );
}

function WeddingStyledCard() {
  return (
    <div className="mx-4 sm:mx-auto my-8 p-6 sm:p-8 max-w-md sm:max-w-xl bg-white rounded-2xl shadow-lg border border-gray-200 text-center font-serif">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
        Example wedding invitation card!
      </h1>
    </div>
  );
}

// Gothic font from Google Fonts
const gothicFont = `
  @import url('https://fonts.googleapis.com/css2?family=UnifrakturCook:wght@700&display=swap');
`;

function GothicCard({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style jsx global>
        {gothicFont}
      </style>
      <div className="flex justify-center">
        <div className="bg-black/80 border-4 border-gray-700 rounded-3xl shadow-xl relative p-6 sm:p-10 text-center max-w-md sm:max-w-xl">
          {/* Ornamental Frame */}
          <div className="absolute -top-3 -left-3 w-8 h-8 bg-gray-700 rotate-45"></div>
          <div className="absolute -top-3 -right-3 w-8 h-8 bg-gray-700 rotate-45"></div>
          <div className="absolute -bottom-3 -left-3 w-8 h-8 bg-gray-700 rotate-45"></div>
          <div className="absolute -bottom-3 -right-3 w-8 h-8 bg-gray-700 rotate-45"></div>

          <p className="font-[UnifrakturCook] text-gray-200 text-xl sm:text-2xl drop-shadow-[0_1px_2px_rgba(255,255,255,0.2)] tracking-wider">
            {children}
          </p>

          {/* Glow effect */}
          <div className="absolute inset-0 rounded-3xl ring-2 ring-purple-900 animate-pulse opacity-10 pointer-events-none"></div>
        </div>
      </div>
    </>
  );
}

function MinimalistCard({ children }: { children: string }) {
  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-sm border border-neutral-200 rounded-2xl p-6 md:p-8 transition-shadow duration-300 hover:shadow-md">
        <p className="text-neutral-800 text-lg md:text-xl leading-relaxed tracking-wide text-center">
          {children}
        </p>
      </div>
      <style jsx>{`
        div {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
        }
      `}</style>
    </div>
  );
}

function MaximalistCard({ children }: { children: string }) {
  return (
    <div className="flex items-center justify-center">
      <div
        className="max-w-md w-full border-[6px] border-double border-black shadow-2xl rounded-3xl overflow-hidden relative animate-fade-in"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(250,250,250,0.85) 100%), url('https://www.transparenttextures.com/patterns/damask.png')",
          backgroundBlendMode: "overlay",
          backdropFilter: "blur(10px)",
          fontFamily: "'Playfair Display', serif",
        }}
      >
        <div className="p-8 text-center relative z-10">
          <h1 className="text-2xl md:text-3xl font-extrabold text-purple-800 drop-shadow-lg">
            {children}
          </h1>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-2 left-2 w-10 h-10 bg-pink-400 rounded-full border-4 border-white shadow-md animate-pulse" />
        <div className="absolute bottom-2 right-2 w-10 h-10 bg-cyan-300 rounded-full border-4 border-white shadow-md animate-bounce" />
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-yellow-200 border-8 border-red-500 rounded-full blur-2xl opacity-70 animate-spin-slow" />
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          0% {
            transform: rotate(0deg) translateX(-50%);
          }
          100% {
            transform: rotate(360deg) translateX(-50%);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .animate-fade-in {
          animation: fade-in 1.5s ease-out forwards;
          opacity: 0;
        }

        @keyframes fade-in {
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

function BrutalistCard({ children }: { children: string }) {
  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md border-4 border-black bg-white px-6 py-10 shadow-[8px_8px_0_0_#000] transition-all hover:shadow-[12px_12px_0_0_#000]">
        <p className="text-black font-mono text-xl md:text-2xl font-bold uppercase tracking-widest text-center leading-tight break-words">
          {children}
        </p>
      </div>
      <style jsx>{`
        div {
          box-sizing: border-box;
        }
        @media (max-width: 640px) {
          p {
            font-size: 1.125rem;
          }
        }
      `}</style>
    </div>
  );
}

function BananaCard({ children }: { children: string }) {
  return (
    <div className="flex items-center justify-center">
      <div className="relative max-w-md w-full rounded-[2rem] p-6 sm:p-10 shadow-2xl border-4 border-yellow-400 bg-gradient-to-tr from-yellow-300 via-yellow-200 to-yellow-100">
        <div className="absolute -top-6 -left-6 w-16 h-16 rounded-full bg-yellow-400 border-4 border-white transform rotate-[-20deg] shadow-lg flex items-center justify-center text-white text-3xl">
          🍌
        </div>
        <h1 className="text-center text-yellow-900 font-bold text-xl sm:text-2xl leading-snug tracking-wide">
          {children}
        </h1>
        <div className="absolute bottom-[-20px] right-[-20px] w-24 h-24 bg-yellow-500 rounded-full rotate-[25deg] shadow-md flex items-center justify-center border-4 border-yellow-300 text-white text-2xl">
          🍌
        </div>
      </div>
    </div>
  );
}

function AnimationOverloadCard({ children }: { children: string }) {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (bgRef.current) {
        bgRef.current.style.backgroundPosition = `${Math.random() * 100}% ${
          Math.random() * 100
        }%`;
      }
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div
        className="relative p-6 md:p-12 rounded-3xl border-4 border-white shadow-2xl overflow-hidden animate-spin-slow hover:scale-105 transition-transform duration-500 ease-in-out"
        style={{
          animation: "pulseBorder 4s infinite alternate",
          background:
            "linear-gradient(270deg, #ff00cc, #3333ff, #00ffcc, #ffcc00, #ff0066)",
          backgroundSize: "1000% 1000%",
        }}
        ref={bgRef}
      >
        <div className="absolute inset-0 opacity-20 animate-gradient bg-gradient-to-br from-pink-500 via-blue-500 to-green-500 blur-2xl" />

        <p className="relative text-white text-center text-lg md:text-2xl font-extrabold animate-bounce tracking-wide animate-text-flicker z-10">
          {children}
        </p>

        <style jsx>{`
          .animate-spin-slow {
            animation: spin 20s linear infinite;
          }

          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }

          @keyframes pulseBorder {
            0% {
              border-color: #ff00cc;
              box-shadow: 0 0 10px #ff00cc;
            }
            100% {
              border-color: #00ffff;
              box-shadow: 0 0 30px #00ffff;
            }
          }

          .animate-text-flicker {
            animation: flicker 2s infinite;
          }

          @keyframes flicker {
            0%,
            19.999%,
            22%,
            62.999%,
            64%,
            100% {
              opacity: 1;
              text-shadow: 0 0 5px #fff, 0 0 10px #0ff, 0 0 20px #0ff;
            }
            20%,
            21.999%,
            63%,
            63.999% {
              opacity: 0.4;
              text-shadow: none;
            }
          }

          @keyframes gradient {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }

          .animate-gradient {
            animation: gradient 8s ease infinite;
          }
        `}</style>
      </div>
    </div>
  );
}

function CryingBabyFlightCard({ children }: { children: string }) {
  const [shake, setShake] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShake(true);
      setTimeout(() => setShake(false), 300);
    }, 4000); // periodic shaking like turbulence
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div
        className={`relative max-w-md w-full p-6 rounded-3xl border-4 border-red-400 shadow-[0_0_60px_rgba(255,0,0,0.2)] bg-gradient-to-br from-gray-800 to-gray-700 text-white font-semibold text-lg md:text-xl text-center leading-snug tracking-tight transition-transform duration-300 ${
          shake ? "animate-shake" : ""
        }`}
      >
        <div className="absolute top-[-20px] right-[-20px] animate-ping-slow">
          <svg
            className="w-10 h-10 text-pink-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 0C4.477 0 0 4.477 0 10h4a6 6 0 0112 0h4c0-5.523-4.477-10-10-10z" />
          </svg>
        </div>
        <p className="z-10 relative">{children}</p>
        <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none z-0" />
      </div>

      <style jsx>{`
        @keyframes shake {
          0% {
            transform: translate(0px, 0px) rotate(0deg);
          }
          25% {
            transform: translate(-2px, 1px) rotate(-1deg);
          }
          50% {
            transform: translate(2px, -2px) rotate(1deg);
          }
          75% {
            transform: translate(-1px, 2px) rotate(0deg);
          }
          100% {
            transform: translate(1px, -1px) rotate(1deg);
          }
        }

        .animate-shake {
          animation: shake 0.3s;
        }

        @keyframes pingSlow {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(1.8);
            opacity: 0;
          }
        }

        .animate-ping-slow {
          animation: pingSlow 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        .bg-noise {
          background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTAnIGhlaWdodD0nMTAnIHZpZXdCb3g9JzAgMCAxMCAxMCcgeG1sbnM9J2h0dHA6Ly93d3cudzMuLm9yZy8yMDAwL3N2Zyc+PHJlY3Qgd2lkdGg9JzEnIGhlaWdodD0nMScgZmlsbD0nI0ZGRic+PC9yZWN0PjxyZWN0IHg9JzMnIHk9JzInIHdpZHRoPScxJyBoZWlnaHQ9JzEnIGZpbGw9JyNEREQnPjwvcmVjdD48cmVjdCB4PSc1JyB5PSc0JyB3aWR0aD0nMScgaGVpZ2h0PScxJyBmaWxsPScjQkJCJz48L3JlY3Q+PHJlY3QgeD0nOCcgeT0nNicgd2lkdGg9JzEnIGhlaWdodD0nMScgZmlsbD0nI0ZGRic+PC9yZWN0Pjwvc3ZnPg==");
          background-repeat: repeat;
        }
      `}</style>
    </div>
  );
}

function TheWayIAreCard({ children }: { children: string }) {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-full max-w-md md:max-w-2xl text-center">
        <div className="absolute inset-0 blur-3xl opacity-40 animate-pulse bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-3xl z-0" />
        <div className="relative z-10 rounded-3xl border border-gray-700 bg-black bg-opacity-70 shadow-[0_0_40px_rgba(0,255,255,0.2)] backdrop-blur-xl p-6 md:p-10">
          <div className="text-white text-xl md:text-3xl font-extrabold tracking-wide font-mono neon-text">
            {children}
          </div>
        </div>
      </div>

      <style jsx>{`
        .neon-text {
          text-shadow: 0 0 5px #0ff, 0 0 10px #0ff, 0 0 20px #0ff, 0 0 40px #0ff,
            0 0 80px #0ff;
          animation: flicker 2.5s infinite alternate;
        }

        @keyframes flicker {
          0% {
            opacity: 1;
            text-shadow: 0 0 5px #0ff, 0 0 10px #0ff, 0 0 20px #0ff,
              0 0 40px #0ff;
          }
          50% {
            opacity: 0.7;
            text-shadow: 0 0 2px #0ff, 0 0 4px #0ff, 0 0 8px #0ff;
          }
          100% {
            opacity: 1;
            text-shadow: 0 0 5px #0ff, 0 0 10px #0ff, 0 0 20px #0ff,
              0 0 40px #0ff;
          }
        }
      `}</style>
    </div>
  );
}

function GeminiBananaCard({ children }: { children: string }) {
  return (
    <div className="flex items-center justify-center p-4 font-sans">
      {/* The main container handles the hover effects and positioning */}
      <div className="group relative w-full max-w-xs transform transition-all duration-300 ease-in-out hover:-rotate-3 hover:scale-105 sm:max-w-sm md:max-w-md">
        {/* The Stem */}
        <div
          className="absolute -top-4 left-10 h-8 w-5 -rotate-45 transform rounded-t-full rounded-b-sm bg-gradient-to-b from-[#6b4a2f] to-[#4a3420] shadow-sm transition-all duration-300 ease-in-out group-hover:-translate-y-1 sm:left-12"
          aria-hidden="true"
        />

        {/* The Brown Bottom Tip */}
        <div
          className="absolute -bottom-2 right-10 z-20 h-4 w-4 rotate-12 transform rounded-full bg-[#4a3420] shadow-sm sm:right-12"
          aria-hidden="true"
        />

        {/* A subtle brown "bruise" that appears on hover */}
        <div
          className="absolute right-1/4 top-1/4 h-3 w-3 rounded-full bg-amber-800/50 opacity-0 blur-[1px] transition-opacity duration-500 group-hover:opacity-100"
          aria-hidden="true"
        />

        {/* The main body of the banana card */}
        <div
          className="relative z-10 flex min-h-[100px] items-center justify-center bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500 p-6 text-stone-800 shadow-lg ring-2 ring-yellow-500/50 sm:p-8"
          style={{
            // These border-radius values create the curved, organic banana shape
            borderTopLeftRadius: "50% 100%",
            borderTopRightRadius: "50% 100%",
            borderBottomLeftRadius: "50% 100%",
            borderBottomRightRadius: "50% 100%",
            // A slight rotation for a more natural look
            transform: "rotate(-4deg)",
          }}
        >
          {/* Speckled Texture Overlay */}
          <div
            className="absolute inset-0 h-full w-full opacity-10"
            style={{
              // An inline SVG provides a subtle noise texture, like a banana peel, without needing an external file.
              backgroundImage:
                "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOCIgbnVtT2N0YXZlcz0iMyIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZKSIvPjwvc3ZnPg==')",
              mixBlendMode: "multiply",
              // The texture needs to follow the same curved shape
              borderTopLeftRadius: "50% 100%",
              borderTopRightRadius: "50% 100%",
              borderBottomLeftRadius: "50% 100%",
              borderBottomRightRadius: "50% 100%",
            }}
            aria-hidden="true"
          />

          {/* The Sentence */}
          <p className="relative z-20 text-center text-lg font-medium italic md:text-xl">
            {children}
          </p>
        </div>
      </div>
    </div>
  );
}
