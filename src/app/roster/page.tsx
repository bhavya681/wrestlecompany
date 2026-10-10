import { RosterDirectory } from "@/components/wrestlers/RosterDirectory";
import { ChampionshipSpotlight } from "@/components/wrestlers/ChampionshipSpotlight";
import { RosterHero, type RosterHeroStat } from "@/components/wrestlers/RosterHero";
import { isChampion, isReferee, isTagTeam } from "@/lib/roster";
import { wrestlers } from "@/data";

export const metadata = {
  title: "Roster",
  description:
    "The Indus Matworks roster — athletes, tag teams, champions and officials shaping professional wrestling from India for the world.",
};

export default function RosterPage() {
  const stats: RosterHeroStat[] = [
    { label: "Athletes", value: wrestlers.length },
    {
      label: "Men",
      value: wrestlers.filter((wrestler) => wrestler.gender === "men")
        .length,
    },
    {
      label: "Women",
      value: wrestlers.filter((wrestler) => wrestler.gender === "women")
        .length,
    },
    { label: "Tag Teams", value: wrestlers.filter(isTagTeam).length },
    {
      label: "Champions",
      value: wrestlers.filter(isChampion).length,
      tone: "gold",
    },
    { label: "Officials", value: wrestlers.filter(isReferee).length },
  ];

  return (
    <>
      <RosterHero stats={stats} />

      <ChampionshipSpotlight />

      <RosterDirectory />
    </>
  );
}