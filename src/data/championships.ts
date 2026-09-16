import type { Championship, TitleReign } from "@/types";

export const championships: Championship[] = [
  {
    id: "im-world-championship",
    name: "IM WORLD CHAMPIONSHIP",
    shortName: "World",
    image: "/images/belt-world.svg",
    weightClass: "Open Weight",
    currentChampion: {
      wrestlerId: "bhupinder-gujjar",
      wrestler: "Bhupinder Gujjar",
      image:
        "https://m.media-amazon.com/images/M/MV5BZTI5MmI2YjEtMDRjNy00MDVhLWJkMDMtNzE4NDIzMDZmYzM1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
      nickname: "The Powerhouse",
    },
    reign: 1,
    daysHeld: 184,
    defenses: 9,
    lastDefense: {
      event: "IM: REVOLUTION",
      date: "2024-11-22",
      opponent: "Big Kon",
    },
    history: [
      {
        champion: "Bhupinder Gujjar",
        reign: 1,
        from: "2024-06-15",
        to: null,
        days: 184,
        defenses: 9,
      },
      {
        champion: "malkeet-brawler",
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
      wrestlerId: "ishani-rathore",
      wrestler: "Ishani Rathore",
      image: "https://user32962.na.imgto.link/public/20260916/image-2.avif",
      nickname: "The Rajput Queen",
    },
    reign: 1,
    daysHeld: 112,
    defenses: 6,
    lastDefense: {
      event: "IM: RISING",
      date: "2024-12-14",
      opponent: "Angel Hayze",
    },
    history: [
      {
        champion: "Ishani Rathore",
        reign: 1,
        from: "2024-09-30",
        to: null,
        days: 112,
        defenses: 6,
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
      wrestlerId: "star-twin",
      wrestler: "Star Twin",
      image:
        "https://www.postwrestling.com/wp-content/uploads/2022/04/maxresdefault-1-1-678x381.jpg",
      nickname: "The Stellar Tandem",
    },
    reign: 1,
    daysHeld: 88,
    defenses: 4,
    lastDefense: {
      event: "IM: RISING",
      date: "2024-12-14",
      opponent: "Epico",
    },
    history: [
      {
        champion: "Star Twin",
        reign: 1,
        from: "2024-10-05",
        to: null,
        days: 88,
        defenses: 4,
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
      wrestlerId: "baliyaan-akki",
      wrestler: "Baliyaan Akki",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5qy6h9gUyzO6panivV8QkCmBbKCGdPNQ_iT3AaN4Q6A&s=10",
      nickname: "The Technocrat",
    },
    reign: 1,
    daysHeld: 74,
    defenses: 3,
    lastDefense: {
      event: "IM: RISING",
      date: "2024-12-14",
      opponent: "Dev",
    },
    history: [
      {
        champion: "Baliyaan Akki",
        reign: 1,
        from: "2024-11-01",
        to: null,
        days: 74,
        defenses: 3,
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
