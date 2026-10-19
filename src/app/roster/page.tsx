
import { ChampionshipSpotlight } from "@/components/wrestlers/ChampionshipSpotlight";
import { RosterDirectory } from "@/components/wrestlers/RosterDirectory";

export const metadata = {
  title: "Roster",
  description:
    "The Indus Matworks roster — athletes, tag teams, champions and officials shaping professional wrestling from India for the world.",
};

export default function RosterPage() {
  return (
    <>
      <ChampionshipSpotlight />

      <RosterDirectory />
    </>
  );
}
