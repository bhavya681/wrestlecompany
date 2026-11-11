import { RosterDirectory } from "@/components/wrestlers/RosterDirectory";

export const metadata = {
  title: "Roster",
  description:
    "The Indus Matworks roster — athletes, champions, tag teams, and officials.",
};

export default function RosterPage() {
  return <RosterDirectory />;
}
