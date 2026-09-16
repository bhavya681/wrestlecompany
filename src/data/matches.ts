import type { Match } from "@/types";

export const matches: Match[] = [
  // =========================================================
  // IM: AFTERMATH (Upcoming - 2026-10-18)
  // =========================================================
  {
    id: "match-af-01",
    eventId: "aftermath",
    eventSlug: "aftermath",
    eventName: "IM: AFTERMATH",
    date: "2026-10-18",
    city: "Mumbai",
    type: "steel-cage",
    championship: "im-world-championship",
    competitors: [
      { wrestlerId: "bhupinder-gujjar", wrestler: "Bhupinder Gujjar" },
      { wrestlerId: "baliyaan-akki", wrestler: "Baliyaan Akki" },
    ],
    result: {
      winner: "",
      method: "pinfall",
      time: "",
      winnerImage: "https://m.media-amazon.com/images/M/MV5BZTI5MmI2YjEtMDRjNy00MDVhLWJkMDMtNzE4NDIzMDZmYzM1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    },
    rating: 0,
    description:
      "The culmination of an intense rivalry. Bhupinder Gujjar defends the IM World Championship inside a Steel Cage against 'The Technocrat' Baliyaan Akki. No escape, no disqualification.",
    isMainEvent: true,
  },
  {
    id: "match-af-02",
    eventId: "aftermath",
    eventSlug: "aftermath",
    eventName: "IM: AFTERMATH",
    date: "2026-10-18",
    city: "Mumbai",
    type: "singles",
    competitors: [
      { wrestlerId: "dev", wrestler: "Dev" },
      { wrestlerId: "kevin-malik", wrestler: "Kevin Malik" },
    ],
    result: {
      winner: "",
      method: "pinfall",
      time: "",
    },
    description:
      "A clash of heavy power: Dev takes on Kevin Malik in an explosive heavyweight showcase.",
  },
  {
    id: "match-af-03",
    eventId: "aftermath",
    eventSlug: "aftermath",
    eventName: "IM: AFTERMATH",
    date: "2026-10-18",
    city: "Mumbai",
    type: "singles",
    competitors: [
      { wrestlerId: "ishani-rathore", wrestler: "Ishani Rathore" },
      { wrestlerId: "angel-hayze", wrestler: "Angel Hayze" },
    ],
    result: {
      winner: "",
      method: "pinfall",
      time: "",
    },
    championship: "im-womens-championship",
    description:
      "Ishani Rathore defends the IM Women's Championship against the relentless Angel Hayze in a high-stakes title bout.",
  },
  {
    id: "match-af-04",
    eventId: "aftermath",
    eventSlug: "aftermath",
    eventName: "IM: AFTERMATH",
    date: "2026-10-18",
    city: "Mumbai",
    type: "tag-team",
    competitors: [
      { wrestlerId: "star-twin", wrestler: "Star Twin" },
      { wrestlerId: "epico", wrestler: "Epico" },
    ],
    result: {
      winner: "",
      method: "pinfall",
      time: "",
    },
    championship: "im-tag-team-championship",
    description:
      "Star Twin put their IM Tag Team Championships on the line against Epico in a fiercely anticipated rematch.",
  },
  {
    id: "match-af-05",
    eventId: "aftermath",
    eventSlug: "aftermath",
    eventName: "IM: AFTERMATH",
    date: "2026-10-18",
    city: "Mumbai",
    type: "singles",
    competitors: [
      { wrestlerId: "bde", wrestler: "BDE" },
      { wrestlerId: "malkeet-brawler", wrestler: "Malkeet Brawler" },
    ],
    result: {
      winner: "",
      method: "pinfall",
      time: "",
    },
    description:
      "High-flying sensation BDE collides with hardcore veteran Malkeet Brawler in a battle of pure velocity versus brute force.",
  },
  {
    id: "match-af-06",
    eventId: "aftermath",
    eventSlug: "aftermath",
    eventName: "IM: AFTERMATH",
    date: "2026-10-18",
    city: "Mumbai",
    type: "ladder",
    competitors: [
      { wrestlerId: "aleah-james", wrestler: "Aleah James" },
      { wrestlerId: "samara", wrestler: "Samara" },
    ],
    result: {
      winner: "",
      method: "ladder",
      time: "",
    },
    description:
      "A high-flying ladder match to determine the next top contender for the IM Women's Championship.",
  },

  // =========================================================
  // IM: NATIONAL SHOWCASE (2025-02-15) - Recent Results
  // =========================================================
  {
    id: "match-ns-01",
    eventId: "national-showcase",
    eventSlug: "national-showcase",
    eventName: "IM: NATIONAL SHOWCASE",
    date: "2025-02-15",
    city: "Kolkata",
    type: "singles",
    championship: "im-world-championship",
    competitors: [
      { wrestlerId: "bhupinder-gujjar", wrestler: "Bhupinder Gujjar" },
      { wrestlerId: "big-kon", wrestler: "Big Kon" },
    ],
    result: {
      winner: "bhupinder-gujjar",
      method: "pinfall",
      time: "24:18",
      winnerImage: "https://m.media-amazon.com/images/M/MV5BZTI5MmI2YjEtMDRjNy00MDVhLWJkMDMtNzE4NDIzMDZmYzM1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    },
    rating: 4.8,
    description:
      "In a colossal main event, Bhupinder Gujjar withstood the punishing onslaught of Big Kon to retain the IM World Title with a staggering spinebuster.",
    isMainEvent: true,
  },
  {
    id: "match-ns-02",
    eventId: "national-showcase",
    eventSlug: "national-showcase",
    eventName: "IM: NATIONAL SHOWCASE",
    date: "2025-02-15",
    city: "Kolkata",
    type: "singles",
    championship: "im-national-championship",
    competitors: [
      { wrestlerId: "baliyaan-akki", wrestler: "Baliyaan Akki" },
      { wrestlerId: "dev", wrestler: "Dev" },
    ],
    result: {
      winner: "baliyaan-akki",
      method: "submission",
      time: "18:42",
      winnerImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5qy6h9gUyzO6panivV8QkCmBbKCGdPNQ_iT3AaN4Q6A&s=10",
    },
    rating: 4.5,
    description:
      "Baliyaan Akki proved his technical mastery by locking in a modified crossface on Dev to successfully retain the National Championship.",
  },
  {
    id: "match-ns-03",
    eventId: "national-showcase",
    eventSlug: "national-showcase",
    eventName: "IM: NATIONAL SHOWCASE",
    date: "2025-02-15",
    city: "Kolkata",
    type: "singles",
    championship: "im-womens-championship",
    competitors: [
      { wrestlerId: "ishani-rathore", wrestler: "Ishani Rathore" },
      { wrestlerId: "aleah-james", wrestler: "Aleah James" },
    ],
    result: {
      winner: "ishani-rathore",
      method: "pinfall",
      time: "15:20",
      winnerImage: "https://user32962.na.imgto.link/public/20260916/image-2.avif",
    },
    rating: 4.2,
    description:
      "Ishani Rathore retained her Women's Championship against the agile Aleah James with her signature finishing maneuver.",
  },

  // =========================================================
  // IM: RISING (2024-12-14)
  // =========================================================
  {
    id: "match-ris-01",
    eventId: "rising",
    eventSlug: "rising",
    eventName: "IM: RISING",
    date: "2024-12-14",
    city: "Bengaluru",
    type: "singles",
    competitors: [
      { wrestlerId: "bhupinder-gujjar", wrestler: "Bhupinder Gujjar" },
      { wrestlerId: "shane-haste", wrestler: "Shane Haste" },
    ],
    result: {
      winner: "bhupinder-gujjar",
      method: "pinfall",
      time: "16:40",
      winnerImage: "https://m.media-amazon.com/images/M/MV5BZTI5MmI2YjEtMDRjNy00MDVhLWJkMDMtNzE4NDIzMDZmYzM1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    },
    rating: 4.5,
    description: "Bhupinder Gujjar defeated international contender Shane Haste in a physical brawl.",
    championship: "im-world-championship",
    isMainEvent: true,
  },
  {
    id: "match-ris-02",
    eventId: "rising",
    eventSlug: "rising",
    eventName: "IM: RISING",
    date: "2024-12-14",
    city: "Bengaluru",
    type: "singles",
    championship: "im-womens-championship",
    competitors: [
      { wrestlerId: "ishani-rathore", wrestler: "Ishani Rathore" },
      { wrestlerId: "angel-hayze", wrestler: "Angel Hayze" },
    ],
    result: {
      winner: "ishani-rathore",
      method: "pinfall",
      time: "14:15",
      winnerImage: "https://user32962.na.imgto.link/public/20260916/image-2.avif",
    },
    rating: 4.0,
    description: "Ishani Rathore retained her title after countering Angel Hayze's top-rope attempt.",
  },
  {
    id: "match-ris-03",
    eventId: "rising",
    eventSlug: "rising",
    eventName: "IM: RISING",
    date: "2024-12-14",
    city: "Bengaluru",
    type: "singles",
    competitors: [
      { wrestlerId: "bde", wrestler: "BDE" },
      { wrestlerId: "dev", wrestler: "Dev" },
    ],
    result: {
      winner: "bde",
      method: "pinfall",
      time: "12:50",
      winnerImage: "https://tnawrestling.com/media/fighters/cutouts/d74d3bd9c9d458580a3a4b4f7a9e37e0-2-1.png",
    },
    rating: 4.2,
    description: "BDE surprised the audience with an electric Fall From Glory to pin Dev clean.",
  },
  {
    id: "match-ris-04",
    eventId: "rising",
    eventSlug: "rising",
    eventName: "IM: RISING",
    date: "2024-12-14",
    city: "Bengaluru",
    type: "tag-team",
    championship: "im-tag-team-championship",
    competitors: [
      { wrestlerId: "star-twin", wrestler: "Star Twin" },
      { wrestlerId: "beer-city-bruiser", wrestler: "Beer City Bruiser" },
    ],
    result: {
      winner: "star-twin",
      method: "pinfall",
      time: "17:10",
      winnerImage: "https://www.postwrestling.com/wp-content/uploads/2022/04/maxresdefault-1-1-678x381.jpg",
    },
    rating: 4.0,
    description: "Star Twin retained the Tag Team titles with a synchronized double-team finisher.",
  },

  // =========================================================
  // IM: REVOLUTION (2024-11-22)
  // =========================================================
  {
    id: "match-rev-01",
    eventId: "revolution",
    eventSlug: "revolution",
    eventName: "IM: REVOLUTION",
    date: "2024-11-22",
    city: "Delhi",
    type: "singles",
    championship: "im-world-championship",
    competitors: [
      { wrestlerId: "bhupinder-gujjar", wrestler: "Bhupinder Gujjar" },
      { wrestlerId: "malkeet-brawler", wrestler: "Malkeet Brawler" },
    ],
    result: {
      winner: "bhupinder-gujjar",
      method: "pinfall",
      time: "26:14",
      winnerImage: "https://m.media-amazon.com/images/M/MV5BZTI5MmI2YjEtMDRjNy00MDVhLWJkMDMtNzE4NDIzMDZmYzM1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    },
    rating: 4.9,
    description:
      "In the monumental main event, Bhupinder Gujjar defeated veteran Malkeet Brawler to claim the IM World Championship.",
    isMainEvent: true,
  },
  {
    id: "match-rev-02",
    eventId: "revolution",
    eventSlug: "revolution",
    eventName: "IM: REVOLUTION",
    date: "2024-11-22",
    city: "Delhi",
    type: "singles",
    championship: "im-national-championship",
    competitors: [
      { wrestlerId: "baliyaan-akki", wrestler: "Baliyaan Akki" },
      { wrestlerId: "kevin-malik", wrestler: "Kevin Malik" },
    ],
    result: {
      winner: "baliyaan-akki",
      method: "submission",
      time: "19:02",
      winnerImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5qy6h9gUyzO6panivV8QkCmBbKCGdPNQ_iT3AaN4Q6A&s=10",
    },
    rating: 4.4,
    description:
      "Baliyaan Akki submitted Kevin Malik with surgical precision to inaugurate his reign as National Champion.",
  },
  {
    id: "match-rev-03",
    eventId: "revolution",
    eventSlug: "revolution",
    eventName: "IM: REVOLUTION",
    date: "2024-11-22",
    city: "Delhi",
    type: "singles",
    competitors: [
      { wrestlerId: "konosuke-takeshita", wrestler: "Konosuke Takeshita" },
      { wrestlerId: "phoenix-king", wrestler: "Phoenix King" },
    ],
    result: {
      winner: "konosuke-takeshita",
      method: "pinfall",
      time: "23:45",
      winnerImage: "https://api.ddtpro.jp/files/67bd66b49342b300022f3740/KONOSUKETAKESHITA_thumbnail.png",
    },
    rating: 5.0,
    description:
      "A 5-star international masterpiece. Takeshita and Phoenix King received a standing ovation from the Delhi crowd.",
  },
  {
    id: "match-rev-04",
    eventId: "revolution",
    eventSlug: "revolution",
    eventName: "IM: REVOLUTION",
    date: "2024-11-22",
    city: "Delhi",
    type: "tag-team",
    championship: "im-tag-team-championship",
    competitors: [
      { wrestlerId: "star-twin", wrestler: "Star Twin" },
      { wrestlerId: "epico", wrestler: "Epico" },
    ],
    result: {
      winner: "star-twin",
      method: "pinfall",
      time: "16:15",
      winnerImage: "https://www.postwrestling.com/wp-content/uploads/2022/04/maxresdefault-1-1-678x381.jpg",
    },
    rating: 4.0,
    description:
      "Star Twin captured the inaugural IM Tag Team Championship in a breathless contest against Epico.",
  },

  // =========================================================
  // IM: STORM FRONT (2024-09-30) - Inaugural Event
  // =========================================================
  {
    id: "match-sf-01",
    eventId: "storm-front",
    eventSlug: "storm-front",
    eventName: "IM: STORM FRONT",
    date: "2024-09-30",
    city: "Chennai",
    type: "tournament",
    competitors: [
      { wrestlerId: "bhupinder-gujjar", wrestler: "Bhupinder Gujjar" },
      { wrestlerId: "baliyaan-akki", wrestler: "Baliyaan Akki" },
    ],
    result: {
      winner: "bhupinder-gujjar",
      method: "pinfall",
      time: "25:30",
      winnerImage: "https://m.media-amazon.com/images/M/MV5BZTI5MmI2YjEtMDRjNy00MDVhLWJkMDMtNzE4NDIzMDZmYzM1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    },
    rating: 4.9,
    description:
      "The tournament classic to determine the #1 contender. Bhupinder Gujjar edged out Baliyaan Akki in a breathless classic.",
    isMainEvent: true,
  },
  {
    id: "match-sf-02",
    eventId: "storm-front",
    eventSlug: "storm-front",
    eventName: "IM: STORM FRONT",
    date: "2024-09-30",
    city: "Chennai",
    type: "singles",
    competitors: [
      { wrestlerId: "ishani-rathore", wrestler: "Ishani Rathore" },
      { wrestlerId: "aleah-james", wrestler: "Aleah James" },
    ],
    result: {
      winner: "ishani-rathore",
      method: "pinfall",
      time: "11:45",
      winnerImage: "https://user32962.na.imgto.link/public/20260916/image-2.avif",
    },
    rating: 4.1,
    description: "Ishani Rathore became the inaugural IM Women's Champion with a decisive pinfall.",
    championship: "im-womens-championship",
  },
  {
    id: "match-sf-03",
    eventId: "storm-front",
    eventSlug: "storm-front",
    eventName: "IM: STORM FRONT",
    date: "2024-09-30",
    city: "Chennai",
    type: "singles",
    competitors: [
      { wrestlerId: "pranjay", wrestler: "Pranjay" },
      { wrestlerId: "malkeet-brawler", wrestler: "Malkeet Brawler" },
    ],
    result: {
      winner: "malkeet-brawler",
      method: "pinfall",
      time: "14:10",
      winnerImage: "https://www.wrestlesquare.com/wp-content/uploads/2017/03/malkeet.jpg",
    },
    rating: 4.3,
    description: "Malkeet Brawler claimed a hard-hitting victory over Pranjay with a thunderous powerbomb.",
  },
];
