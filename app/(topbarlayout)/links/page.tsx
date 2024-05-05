import type { Metadata } from "next";
import Card from "../../../components/card";

export const metadata: Metadata = {
  title: "Recipes",
  description: "A list of all recipes important enough for me to write down",
};

export default function Page() {
  return (
    <>
      <section>
        <div className="max-w-6xl p-4 m-auto">
          <div className="flex flex-col items-center mt-4 gap-4">
            <Card
              title="LinkedIn"
              description="Business John"
              link="https://www.linkedin.com/in/johnscolaro/"
            ></Card>
            <Card
              title="GitHub"
              description="Hackerman John"
              link="https://github.com/JohnScolaro"
            ></Card>
            <Card
              title="Stack Overflow"
              description="Debugger John"
              link="https://stackoverflow.com/users/5834938/john-scolaro"
            ></Card>
            <Card
              title="IFPA"
              description="Pinball John"
              link="https://www.ifpapinball.com/player.php?p=69367"
            ></Card>
            <Card
              title="Google Maps"
              description="Restaurant Critic John"
              link="https://www.google.com/maps/contrib/113054639780181758122/reviews/"
            ></Card>
            <Card
              title="YouTube"
              description="Videographer John"
              link="https://www.youtube.com/channel/UCYSIT8sX6y8wp7hkwtecoQg"
            ></Card>
            <Card
              title="Strava"
              description="Athlete John"
              link="https://www.strava.com/athletes/94896104"
            ></Card>
          </div>
        </div>
      </section>
    </>
  );
}
