export type Status = "active" | "inactive" | "retired";
export type Gender = "men" | "women";
export type Division =
  | "Singles"
  | "Tag Team"
  | "Women's Singles"
  | "Women's Tag Team"
  | "Manager";
export type WrestlerRole = "wrestler" | "manager";
export type MatchType =
  | "singles"
  | "tag-team"
  | "steel-cage"
  | "ladder"
  | "battle-royal"
  | "tournament"
  | "submission"
  | "no-disqualification";

export type WinMethod =
  | "pinfall"
  | "submission"
  | "disqualification"
  | "countout"
  | "no-contest"
  | "draw"
  | "elimination"
  | "ladder"
  | "technical";

export type ArticleCategory =
  | "breaking"
  | "news"
  | "results"
  | "announcements"
  | "backstage";

export type MediaCategory =
  | "latest-video"
  | "highlights"
  | "matches"
  | "backstage"
  | "interviews"
  | "photo-gallery";

export type MediaItemType = "video" | "image";

export interface Record {
  wins: number;
  losses: number;
  draws: number;
}

export interface Wrestler {
  id: string;
  name: string;
  ringName: string;
  nickname: string;
  image: string;
  imageFull?: string;
  role?: WrestlerRole;
  weightClass: string;
  gender: Gender;
  division: Division;
  height: string;
  weight: string;
  from: string;
  debut: string;
  record: Record;
  winRate: number;
  style: string;
  status: Status;
  finisher: string;
  bio: string;
  championships: string[];
  rivalries: string[];
  relatedMedia: string[];
  latestMatchId?: string;
}

export interface Competitor {
  wrestlerId: string;
  wrestler: string;
  team?: number;
}

export interface MatchResult {
  winner: string | "draw";
  method: WinMethod;
  time: string;
  winnerImage?: string;
}

export interface Match {
  id: string;
  eventId: string;
  eventSlug: string;
  eventName: string;
  date: string;
  city: string;
  type: MatchType;
  championship?: string;
  competitors: Competitor[];
  result: MatchResult;
  rating?: number;
  description?: string;
  isMainEvent?: boolean;
}

export interface EventItem {
  id: string;
  slug: string;
  name: string;
  tagline?: string;
  city: string;
  venue?: string;
  date: string;
  endDate?: string;
  status: "upcoming" | "live" | "completed";
  matches: string[];
  ticketsUrl?: string;
  posterImage: string;
  heroImage?: string;
  description?: string;
}

export interface TitleReign {
  champion: string;
  reign: number;
  from: string;
  to: string | null;
  days: number;
  defenses: number;
  opponent?: string;
}

export interface Championship {
  id: string;
  name: string;
  shortName: string;
  image: string;
  weightClass?: string;
  currentChampion: {
    wrestlerId: string;
    wrestler: string;
    image: string;
    nickname: string;
  } | null;
  reign: number;
  daysHeld: number;
  defenses: number;
  lastDefense: {
    event: string;
    date: string;
    opponent: string;
  } | null;
  history: TitleReign[];
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: ArticleCategory;
  author: string;
  date: string;
  readTime: number;
  image: string;
  featured: boolean;
}

export interface Story {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  content: string;
  status: "active" | "past" | "upcoming";
  participants: string[];
  image: string;
}

export interface MediaItem {
  id: string;
  type: MediaItemType;
  category: MediaCategory;
  title: string;
  description: string;
  thumbnail: string;
  duration?: string;
  date: string;
  url: string;
}
