import type { Metadata } from "next";
import Link from "next/link";
import ResumeCard from "./resumeCard";

export const metadata: Metadata = {
  description: "John's Resume",
};

export default function Page() {
  return (
    <div className="prose prose-black p-2 max-w-4xl m-auto lg:prose-lg prose-hr:mt-6 prose-hr:mb-6 prose-img:m-0 lg:prose-img:m-0 prose-hr:border-0 lg:prose-hr:border-0 prose-hr:bg-gray-600 lg:prose-hr:bg-gray-600 prose-hr:h-[2px] lg:prose-hr:h-[2px]">
      <h1 className="text-center font-bold">Resume</h1>
      <ResumeCard
        title="John Scolaro"
        imageSrc="/images/profile.jpg"
        imageAltText="An Image of John"
        roundImg={true}
      >
        <p>
          I'm a senior software developer with a wide range of experience across
          many different technologies. I love writing software and building
          things. I mean, I made this whole website for fun! Surely that counts
          for something.
        </p>
        <p>
          I have the most experience working in client-facing roles on Python
          based web applications, large-scale data analysis / visualisation, and
          large distributed systems.
        </p>
      </ResumeCard>
      <hr className=""></hr>
      <h2>Experience</h2>
      <ResumeCard
        title="Polymathian (now Deswik)"
        imageSrc="/images/resume/polymathian_logo.jpg"
        imageAltText="Polymathian Logo"
        roundImg={false}
        date="2021 - 2023"
      >
        <p>Main roles as an application developer:</p>
        <ul>
          <li>
            The creation and maintenance of webapps for mine planners, used to
            optimise their day-to-day operations. Honestly, I've probably
            written hundreds of thousands of lines of Python.
          </li>
          <li>Improving the core optimisation engine in C++.</li>
          <li>
            Take client progress meetings and conduct training with end users.
            Liaise with product managers about client needs and future
            proposals.
          </li>
          <li>
            I started a documentation server to document all optimisation engine
            constraint tables and used the CI/CD build system to force
            developers to write documentation for their tables. 😈 Given we had
            many hundreds of tables, this was extremely useful.
          </li>
        </ul>
      </ResumeCard>
      <ResumeCard
        title="CSIRO"
        imageSrc="/images/resume/csiro_logo.png"
        imageAltText="CSIRO Logo"
        roundImg={false}
        date="2018 - 2021"
      >
        <p>Main roles within the Embedded Intelligence Team:</p>
        <ul>
          <li>
            Setup a ML pipeline + analysis of massive distributed data from
            embedded devices, analysis in Python, and the subsequent deployment
            of ML algorithms on thousands of embedded devices.
          </li>
          <li>
            Writing software in C with a team of engineers, designed to run on
            ARM M4F Cortex devices.
          </li>
          <li>
            Designing and manufacturing printed circuit boards in Altium
            Designer for various projects.
          </li>
          <li>
            Design and creation of an automatic test jig that was sent overseas
            and used to test thousands of manufactured circuit boards. The test
            jig informed production systems of new devices ready for sale, and
            logs could be analysed to detect faults in circuit boards remotely.
          </li>
        </ul>
      </ResumeCard>
      <ResumeCard
        title="University of Queensland - Tutor"
        imageSrc="/images/resume/uq_logo.svg"
        imageAltText="UQ Logo"
        roundImg={false}
        date="2014-2018"
      >
        <p>
          While studying for my degree, I tutored 7 different courses. I taught
          the "Signals, Systems, and Control" course for 3 years consecutively
          as the head tutor. I am most proud of creating the final project for
          UQ's FPGA course, which I designed, administered, and marked as the
          head tutor in my final year.
        </p>
      </ResumeCard>
      <hr></hr>
      <h2>Education</h2>
      <ResumeCard
        title="University of Queensland"
        imageSrc="/images/resume/uq_logo.svg"
        imageAltText="UQ Logo"
        roundImg={false}
      >
        <p>
          Bachelor of Electrical Engineering and a Bachelor of Physics with
          First Class Honors.
        </p>
      </ResumeCard>
      <ResumeCard
        title="Univeristy of Toronto"
        imageSrc="/images/resume/uoft_logo.png"
        imageAltText="UofT Logo"
        roundImg={false}
      >
        <p>
          I completed a semester at the University of Toronto, where (if I'm
          completely honest) I mainly travelled around Canada + US and played a
          lot of ice hockey.
        </p>
      </ResumeCard>
      <hr></hr>
      <ResumeCard title="Skills and Interests" roundImg={false}>
        <ul>
          <li>
            I've written production code in C, C++, Java, Python, JavaScript,
            and more.
          </li>
          <li>
            I've used more Python modules than I can shake a stick at, but I'm
            very familiar with MongoDB, SQLAlchemy, Pandas, Numpy, Flask,
            Django, pytest, Tensorflow, SciPy, Matplotlib, Plotly, etc.
          </li>
          <li>
            Obviously familiar with the holy trinity of ✨HTML, CSS,
            Javascript✨. Maybe we can stop listing them on job advertisements
            soon. I'd rather make a website with 🔥Next.js + Tailwind 🔥.
          </li>
          <li>
            Plenty of experience with AWS. I'd list off all the services I know
            and have used, but you'd pass away from boredom before I finished
            listing all the acronyms. 😴
          </li>
          <li>
            At one point, I peaked in the top ~80 pinball players in Australia.
            (Alas, no more, but feel free to check out my profile{" "}
            <Link href={"https://www.ifpapinball.com/player.php?p=69367"}>
              here
            </Link>
            .
          </li>
          <li>
            I love leaving{" "}
            <Link
              href={
                "https://www.google.com/maps/contrib/113054639780181758122/"
              }
            >
              Google Reviews
            </Link>{" "}
            and have amassed over 30M photo views over the years.
          </li>
          <li>
            I have a{" "}
            <Link href={"https://www.youtube.com/@john.scolaro/videos"}>
              YouTube channel
            </Link>{" "}
            where I mainly upload renders in 3D animation/modelling software
            Blender.
          </li>
          <li>
            If you're active and use Strava, I run my own Strava data
            visualisation website called{" "}
            <Link href={"https://active-statistics.com"}>
              Active Statistics
            </Link>
            .
          </li>
        </ul>
      </ResumeCard>
    </div>
  );
}
