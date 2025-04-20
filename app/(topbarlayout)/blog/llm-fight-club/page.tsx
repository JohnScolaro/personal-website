import type { Metadata } from "next";
import Date from "../../../../components/date";
import AnimatedBarChart from "./AnimatedBarChart";
import WordAnimator from "./WordAnimator";
import Image from "next/image";
import Link from "next/link";
import BattleHeatmap from "./HeatMapChart";

import battle from "./battle.png";
import lions from "./lions_vs_sun.webp";
import lions2 from "./lions_vs_sun_2.png";
import colours from "./colours.png";
import jellyfish from "./jellyfish.png";

export const metadata: Metadata = {
  title: "LLM Fight Club",
  description:
    "Using technology to answer important questions like: Who would win in a fight, X or Y.",
};

export default function Page() {
  return (
    <>
      <article className="prose prose-black max-w-4xl m-auto p-4 lg:prose-lg lg:m-auto prose-img:m-auto prose-img:max-w-xl prose-img:w-full">
        <h1 className="mb-1 lg:mb-1 text-center">LLM Fight Club</h1>
        <div className="text-center">
          <Date dateString={"2025-04-19"} />
        </div>
        <p>
          AI's pretty cool, eh? As humanity has been grappling with large
          language models (LLMs), and new audiovisual generative models over the
          last year or two, we've found oodles of fun new niches where it can
          help us be more productive. For me personally, it's
        </p>
        <ul>
          <li>dramatically improved my programming productivity,</li>
          <li>made a lot of funny images to make people laugh, and</li>
          <li>written a lot of stories about our family dog.</li>
        </ul>
        <p>
          There is no doubt that AI in its current form has dramatically
          increased my productivity at work, and slightly improved my day-to-day
          life.
        </p>
        <p>
          But come on - improve work productivity? Who cares about that. What
          we're all wondering is "Can AI solve the big questions?".
        </p>
        <p>
          You know, things like: "Who would win in a fight between a{" "}
          <WordAnimator
            words={[
              "moose",
              "whale",
              "goose",
              "snake",
              "zebra",
              "otter",
              "koala",
            ]}
            fadeDuration={100}
            interval={1500}
          />{" "}
          and a{" "}
          <WordAnimator
            words={[
              "donkey",
              "gerbil",
              "weasel",
              "poodle",
              "gopher",
              "pigeon",
              "baboon",
              "beetle",
              "jaguar",
              "salmon",
            ]}
            fadeDuration={100}
            interval={1500}
            offset={750}
          />
          ?"
        </p>
        <Image
          src={battle}
          alt="A military battle style oil painting in which a horse sized duck fights 1000 duck sized horses."
          width={1536}
          height={1024}
          className="rounded-lg"
        ></Image>
        <p className="text-center text-gray-600 -mt-2 mb-6 text-base italic">
          Who would win in a fight? 1 horse sized duck vs 1000 duck sized
          horses?
        </p>
        <h2>A Stupid Idea</h2>
        <p>
          I stumbled upon{" "}
          <Link href={"https://www.word-battle.com/"}>this game</Link> which
          uses AI to battle different phrases to see who wins, and I harkened
          back to countless childhood conversations about who would win in
          fights. I remembered the{" "}
          <Link href={"https://knowyourmeme.com/memes/who-would-win"}>
            who would win
          </Link>{" "}
          set of meme templates that brought us such intellectual curiousities
          as:
        </p>
        <Image
          src={lions}
          alt="A meme asking: Who would win? 1 trillion lions, or the sun?"
          width={640}
          height={640}
          className="rounded-lg border-2 border-gray-300"
        ></Image>
        <p>
          I normally ask these questions to my friends because sometimes it's
          just fun to ask stupid questions. Something both my friends and LLMs
          have in common is that they're both black boxes that respond if you
          talk to them. Depending on the LLM, or the friend, you'll get a
          different response to the same input. ChatGPT's responses are usually
          more accurate, but my friends are usually funnier.
        </p>
        <p>
          LLM's also won't make up excuses to not hang out with you if you
          propose 12 hours of continuously estimating the winners of fights.
        </p>
        <p>
          So I figured: "Can I use AI to figure out who would win in a battle
          royale of <b>ALL WORDS EVER</b>? I'll give it a crack. Humanity
          deserves to know the answer.
        </p>
        <Image
          src={lions2}
          alt="An AI generated image of 1 trillion lions fighting the sun."
          width={1536}
          height={1024}
        ></Image>
        <p className="text-center text-gray-600 -mt-2 mb-6 text-base italic">
          What if a trillion lions did battle the sun?
        </p>
        <h2>Problem Solving</h2>
        Ok, immediately we have two problems to solve:
        <ul>
          <li>What LLM am I going to use?</li>
          <li>I need to determine a fight format.</li>
        </ul>
        <h3>Which LLM to use?</h3>
        <p>
          I could see this project potentially needing a maximum of 1 million
          queries and :
        </p>
        <p>If I use a prompt similar to this:</p>
        <pre className="bg-gray-900 text-green-400 font-mono p-6 rounded-lg shadow-md text-sm leading-relaxed whitespace-pre-wrap">
          {`Respond only with the winner's name, and no explanations.\nYou're judging a hypothetical fight between two nouns.\nImagine they come to life and battle in any environment that makes sense.\nThink creatively and consider all interpretations of each noun.\n\nWhich would win in a fight: {noun1} or {noun2}`}
        </pre>
        <p>
          Because the tokenisation of text is significantly more complex than
          "one word = one token", I just asked ChatGPT how many tokens this
          prompt was and it says ~60-65. Let's say that a successful single word
          output is 2 tokens on average. Assuming the model correctly outputs a
          single word for every query, for 1 million prompts, we're looking at:
        </p>
        <ul>
          <li>65 million input tokens</li>
          <li>2 million output tokens</li>
        </ul>
        <p>
          for a total cost of $81 USD. Using their cheapest model, we're looking
          at $4 USD. But that opens the door for mistakes that cost extra money,
          I need to make an account and add my card details, and paying for LLM
          results? In this economy? What if I just run an LLM locally using
          Ollama instead?
        </p>
        <p>
          I tested a couple different Ollama models to see if any could solve my
          problem.
        </p>
        <p>
          {" "}
          <b>deepseek-r1:7b</b>: Deepseeks whole schtick is that it likes to
          think. If I tell it to respond with a single token, it first thinks
          for 30 seconds and spews out hundreds of tokens before finally
          responding with a single token. This means getting a single result
          takes ~30 seconds, which is unacceptable.
        </p>
        <p>
          <b>tinyllama</b>: Tinyllama is a small (tiny even?) LLM model from
          Meta. It's definately fast, but it sucks. I found it impossible to
          prompt so that it returns a single word. Also I was prompting with the
          fight: "Who would win in a fight between a jellyfish and a hammer?".
          Think about that for a second. All the humans I've asked has said
          "Obviously Hammer", but tinyllama was adamant the jellyfish would win.
          Unacceptable.
        </p>
        <Image
          src={jellyfish}
          alt="Smithers from The Simpsons responding with 'jellyfish' as Mr Burns hits the trap door button"
          width={966}
          height={660}
        ></Image>
        <p>
          <b>gemma3:4b</b>: Gemma3 is an open source Google model based on their
          Gemini tech. I found that this model reliably responds with a single
          word, thinks a hammer would beat a jellyfish, and yields an answer in
          ~0.5 seconds. Excellent.
        </p>
        <p>
          Now, if I conveniently don't think about my power bill next month, I
          can generate answers for the low-low cost of $0! At least the money I
          am implicitly paying stays in the Australian economy.
        </p>
        <h3>Fight Format</h3>
        <p>
          How do we fight a whole bunch of different words? In my mind we have
          two formats:
        </p>
        <ul>
          <li>Round-robin, where every word battles every other word.</li>
          <li>Knockout bracket, where the loser is eliminated.</li>
        </ul>
        <p>
          Round robin is preferable becuase I think it will yield more
          interesting data, but it drastically increases the number of battles
          we need to perform. For only 1,000 competitors, we need to perform
          1,000,000 battles. At a rate of 2 battles each second, that will take
          almost a week of continuous battling.{" "}
        </p>
        <p>
          {" "}
          In a knockout elimination competition, we only need 999 battles for
          1000 competitors, so it's a lot more feasble. However, since it only
          takes one unlucky battle to knock you out, I think the results would
          be a lot less accurate and interesting.
        </p>
        <p>
          Originally my plan was to battle every english word against each
          other. With round robin this sadly isn't feasible, which means we also
          need to decide how we're going to cut down the number of competitors
          who are going to battle. The results of each set of battles is shown
          below:
        </p>
        <h2>Battle 1: Most Popular Nouns</h2>
        <p>
          When I first hacked together this competition, my first idea was to
          battle the X most popular nouns in the English language. I know almost
          nothing about the state of language libraries in Python, and with
          ChatGPT I had some almost working code in only a few seconds! It used
          the `wordnet` module of the{" "}
          <Link href={"https://www.nltk.org/index.html"}>nltk</Link> library to
          get all words, and the{" "}
          <Link href={"https://pypi.org/project/wordfreq/"}>wordfreq</Link>{" "}
          library to get word frequencies.
        </p>
        <p>
          I wrote some code to query ollama, and save the results in a sensible
          format and left my laptop on overnight to grind battles.
        </p>
        <p>
          Then the next night day I changed my latop settings to not sleep
          immediately, and <i>actually </i>ran the experiment.
        </p>
        <p>Here is a heatmap of the results:</p>
        <BattleHeatmap
          players={["test", "test2"]}
          results={[
            [1, -1],
            [-1, 1],
          ]}
        ></BattleHeatmap>
        <h2>Battle 2: Animals</h2>
        <p></p>
        <h2>Battle 3: Colours?</h2>
        <p></p>
        <Image
          src={colours}
          alt="An AI generated image of the 7 colours of the ranbow all fighting each other with knives."
          width={1536}
          height={1024}
        ></Image>
        <AnimatedBarChart />
      </article>
    </>
  );
}
