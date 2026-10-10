
import type { Championship, TitleReign } from "@/types";

export const championships: Championship[] = [
  /* ============================================================
     1. IM WORLD CHAMPIONSHIP
     ============================================================ */
  {
    id: "im-world-championship",
    name: "IM WORLD CHAMPIONSHIP",
    shortName: "World",
    image: "/images/belt-world.svg",
    weightClass: "Open Weight",
    division: "Men's Singles",

    currentChampion: {
      wrestlerId: "bhupinder-gujjar",
      wrestler: "Bhupinder Gujjar",
      image:
        "https://user43115.na.imgto.link/public/20261010/b81f5d9bbc7d908a3d9a2a4c-image.avif",
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
        champion: "Malkeet Brawler",
        reign: 1,
        from: "2023-06-15",
        to: "2024-06-15",
        days: 365,
        defenses: 12,
      },
    ],
  },

  /* ============================================================
     2. IM UNIVERSAL CHAMPIONSHIP
     ============================================================ */
  {
    id: "im-universal-championship",
    name: "IM UNIVERSAL CHAMPIONSHIP",
    shortName: "Universal",
    image: "/images/belt-world.svg",
    weightClass: "Open Weight",
    division: "Men's Singles",

    currentChampion: null,

    reign: 0,
    daysHeld: 0,
    defenses: 0,
    lastDefense: null,
    history: [],
  },

  /* ============================================================
     3. IM WOMEN'S WORLD CHAMPIONSHIP
     ============================================================ */
  {
    id: "im-womens-world-championship",
    name: "IM WOMEN'S WORLD CHAMPIONSHIP",
    shortName: "Women's World",
    image: "/images/belt-womens.svg",
    weightClass: "Women's",
    division: "Women's Singles",

    currentChampion: {
      wrestlerId: "priscilla-kelly",
      wrestler: "Prscilla Kelly",
      image:
        "https://user43115.na.imgto.link/public/20261010/d71df1c4f49abbdbae93f96c-image.avif",
      nickname: "Hell's Favorite Harlot",
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
        champion: "Prscilla Kelly",
        reign: 1,
        from: "2024-09-30",
        to: null,
        days: 112,
        defenses: 6,
      },
      {
        champion: "Ishani Rathore",
        reign: 1,
        from: "2024-06-01",
        to: "2024-09-30",
        days: 121,
        defenses: 4,
      },
    ],
  },

  /* ============================================================
     4. IM MEN'S TAG TEAM CHAMPIONSHIP
     ============================================================ */
  {
    id: "im-mens-tag-team-championship",
    name: "IM MEN'S TAG TEAM CHAMPIONSHIP",
    shortName: "Men's Tag",
    image: "/images/belt-tag.svg",
    weightClass: "Tag Team",
    division: "Men's Tag Team",

    currentChampion: {
      wrestlerId: "the-maharaja",
      wrestler: "The Maharaja",
      image:
        "https://user43115.na.imgto.link/public/20261010/5b8e752d12e2ebc24bfb0414-image.avif",
      nickname: "The Modern Day Maharaja",
      members: ["Raj Dhesi", "Indus Enforcer"],
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
        champion: "The Maharaja",
        reign: 1,
        from: "2024-10-05",
        to: null,
        days: 88,
        defenses: 4,
      },
      {
        champion: "Star Twin",
        reign: 1,
        from: "2024-06-15",
        to: "2024-10-05",
        days: 112,
        defenses: 6,
      },
    ],
  },

  /* ============================================================
     5. IM WOMEN'S TAG TEAM CHAMPIONSHIP
     ============================================================ */
  {
    id: "im-womens-tag-team-championship",
    name: "IM WOMEN'S TAG TEAM CHAMPIONSHIP",
    shortName: "Women's Tag",
    image: "/images/belt-tag.svg",
    weightClass: "Women's Tag Team",
    division: "Women's Tag Team",

    currentChampion: {
      wrestlerId: "the-icconics",
      wrestler: "The Icconics",
      image:
        "https://user43115.na.imgto.link/public/20261010/3f2162e5b7f47bec458c9527-image.avif",
      nickname: "The Australian Sensation",
      members: ["Cassie Lee", "Jessica McKay"],
    },

    reign: 1,
    daysHeld: 88,
    defenses: 4,

    lastDefense: {
      event: "IM: RISING",
      date: "2024-12-14",
      opponent: "The Renegade Twins",
    },

    history: [
      {
        champion: "The Icconics",
        reign: 1,
        from: "2024-10-05",
        to: null,
        days: 88,
        defenses: 4,
      },
      {
        champion: "The Renegade Twins",
        reign: 1,
        from: "2024-06-15",
        to: "2024-10-05",
        days: 112,
        defenses: 6,
      },
    ],
  },

  /* ============================================================
     6. IM NATIONAL CHAMPIONSHIP
     ============================================================ */
  {
    id: "im-national-championship",
    name: "IM NATIONAL CHAMPIONSHIP",
    shortName: "National",
    image: "/images/belt-national.svg",
    weightClass: "Open Weight",
    division: "Men's Singles",

    currentChampion: {
      wrestlerId: "kevin-malik",
      wrestler: "Kevin Malik",
      image:
        "https://user43115.na.imgto.link/public/20261010/06810ca63ede16a2e65607d7-image.avif",
      nickname: "The Delhi Destroyer",
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
        champion: "Kevin Malik",
        reign: 1,
        from: "2024-11-01",
        to: null,
        days: 74,
        defenses: 3,
      },
      {
        champion: "Baliyaan Akki",
        reign: 1,
        from: "2024-08-15",
        to: "2024-11-01",
        days: 78,
        defenses: 2,
      },
    ],
  },
];

/* ============================================================
   TITLE HISTORY LOOKUP
   ============================================================ */

/**
 * Derive title histories from the championship records.
 * This avoids duplicated data and non-null assertions.
 */
export const titleHistoryData: Record<string, TitleReign[]> =
  Object.fromEntries(
    championships.map((championship) => [
      championship.id,
      championship.history,
    ])
  );