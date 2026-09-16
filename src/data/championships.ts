import type { Championship, TitleReign } from "@/types";

export const championships: Championship[] = [
  {
    id: "im-world-championship",
    name: "IM WORLD CHAMPIONSHIP",
    shortName: "World",
    image: "/images/belt-world.svg",
    weightClass: "Open Weight",
    currentChampion: {
      wrestlerId: "arjun-rao",
      wrestler: "Arjun Rao",
      image: "https://i.pravatar.cc/400?img=11",
      nickname: "The Lion of Mumbai",
    },
    reign: 1,
    daysHeld: 126,
    defenses: 7,
    lastDefense: {
      event: "IM: Revolution",
      date: "2024-11-22",
      opponent: "Vikram Singh",
    },
    history: [
      {
        champion: "Arjun Rao",
        reign: 1,
        from: "2024-06-15",
        to: null,
        days: 126,
        defenses: 7,
      },
      {
        champion: "Sameer Verma",
        reign: 1,
        from: "2023-06-15",
        to: "2024-06-15",
        days: 365,
        defenses: 12,
      },
    ],
  },
  {
    id: "im-womens-championship",
    name: "IM WOMEN'S CHAMPIONSHIP",
    shortName: "Women's",
    image: "/images/belt-womens.svg",
    weightClass: "Women's",
    currentChampion: {
      wrestlerId: "riya-sharma",
      wrestler: "Riya Sharma",
      image: "https://i.pravatar.cc/400?img=26",
      nickname: "The Storm",
    },
    reign: 1,
    daysHeld: 89,
    defenses: 5,
    lastDefense: {
      event: "IM: RISING",
      date: "2024-12-14",
      opponent: "Ananya Desai",
    },
    history: [
      {
        champion: "Riya Sharma",
        reign: 1,
        from: "2024-09-30",
        to: null,
        days: 89,
        defenses: 5,
      },
    ],
  },
  {
    id: "im-tag-team-championship",
    name: "IM TAG TEAM CHAMPIONSHIP",
    shortName: "Tag Team",
    image: "/images/belt-tag.svg",
    weightClass: "Tag Team",
    currentChampion: {
      wrestlerId: "mumbai-mavericks",
      wrestler: "The Mumbai Mavericks",
      image: "https://picsum.photos/seed/mumbai-mavericks/400/500",
      nickname: "City of Dreams Champions",
    },
    reign: 1,
    daysHeld: 67,
    defenses: 3,
    lastDefense: {
      event: "IM: RISING",
      date: "2024-12-14",
      opponent: "The Delhi Dynasty",
    },
    history: [
      {
        champion: "The Mumbai Mavericks",
        reign: 1,
        from: "2024-10-05",
        to: null,
        days: 67,
        defenses: 3,
      },
    ],
  },
  {
    id: "im-national-championship",
    name: "IM NATIONAL CHAMPIONSHIP",
    shortName: "National",
    image: "/images/belt-national.svg",
    weightClass: "Open Weight",
    currentChampion: {
      wrestlerId: "kabir-khan",
      wrestler: "Kabir Khan",
      image: "https://i.pravatar.cc/400?img=13",
      nickname: "The Technician",
    },
    reign: 1,
    daysHeld: 45,
    defenses: 2,
    lastDefense: {
      event: "IM: RISING",
      date: "2024-12-14",
      opponent: "Dev Malhotra",
    },
    history: [
      {
        champion: "Kabir Khan",
        reign: 1,
        from: "2024-11-01",
        to: null,
        days: 45,
        defenses: 2,
      },
    ],
  },
];

export const titleHistoryData: Record<string, TitleReign[]> = {
  "im-world-championship": championships.find((c) => c.id === "im-world-championship")!.history,
  "im-womens-championship": championships.find((c) => c.id === "im-womens-championship")!.history,
  "im-tag-team-championship": championships.find((c) => c.id === "im-tag-team-championship")!.history,
  "im-national-championship": championships.find((c) => c.id === "im-national-championship")!.history,
};
