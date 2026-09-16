// ============================================================
// CORE ROSTER TYPES
// ============================================================

export type Status = "active" | "inactive" | "retired";

export type Gender = "men" | "women";

export type WrestlerRole =
  | "wrestler"
  | "manager"
  | "tag-team"
  | "referee"
  | "announcer"
  | "commentator"
  | "commentators";

export type WrestlerType =
  | "singles"
  | "tag-team"
  | "manager"
  | "referee"
  | "announcer"
  | "commentator"
  | "commentators";

export type Division =
  | "Singles"
  | "Tag Team"
  | "Women's Singles"
  | "Women's Tag Team"
  | "Manager"
  | "Officials"
  | "Broadcast Team";


// ============================================================
// MATCH TYPES
// ============================================================

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

export interface Record {
  wins: number;
  losses: number;
  draws: number;
}


// ============================================================
// ROSTER / WRESTLER
// ============================================================

export interface Wrestler {
  /**
   * Internal unique identifier.
   *
   * Example:
   * "bde"
   * "aj-francis"
   * "arianna-grace"
   */
  id: string;

  /**
   * Legal / real name.
   *
   * Example:
   * "Brandon Jared Collymore"
   */
  name: string;

  /**
   * Name used by the promotion.
   *
   * Example:
   * "BDE"
   * "AJ FRANCIS"
   */
  ringName: string;

  /**
   * Character nickname.
   *
   * Example:
   * "Brandon Does Everything"
   */
  nickname: string;

  /**
   * Main roster card image.
   */
  image?: string;

  /**
   * Larger image used on profile/detail pages.
   */
  imageFull?: string;

  /**
   * Person's role within the promotion.
   *
   * wrestler
   * manager
   * tag-team
   * referee
   * announcer
   */
  role?: WrestlerRole;

  /**
   * Roster entity type.
   */
  type?: WrestlerType;

  /**
   * Members for tag teams.
   *
   * Example:
   * ["John Skyler", "Jason Hotch"]
   */
  members?: string[];

  /**
   * Weight / roster classification.
   *
   * Example:
   * "Heavyweight"
   * "Singles"
   * "Women's Singles"
   * "Manager"
   * "Official"
   */
  weightClass: string;

  /**
   * Biological / roster gender classification.
   */
  gender: Gender;

  /**
   * Current roster division.
   */
  division: Division;

  /**
   * Height.
   *
   * "6'0\""
   * "Not listed"
   * "Team"
   */
  height: string;

  /**
   * Weight.
   *
   * "220 lbs"
   * "Not listed"
   * "N/A"
   */
  weight: string;

  /**
   * Billed-from location.
   */
  from: string;

  /**
   * Professional debut year/date.
   */
  debut: string;

  /**
   * Indus Matworks career record.
   */
  record: Record;

  /**
   * Calculated win percentage.
   */
  winRate: number;

  /**
   * Wrestling / professional role style.
   *
   * Examples:
   * "Technical"
   * "High Flyer"
   * "Powerhouse"
   * "Play-by-Play"
   * "Management"
   */
  style: string;

  /**
   * Current roster status.
   */
  status: Status;

  /**
   * Finishing move.
   *
   * Managers / referees / announcers can use "N/A".
   */
  finisher: string;

  /**
   * Roster biography.
   */
  bio: string;

  /**
   * Championships won within Indus Matworks.
   */
  championships: string[];

  /**
   * Active or historical rivalries.
   */
  rivalries: string[];

  /**
   * IDs of related media items.
   */
  relatedMedia: string[];

  /**
   * Optional latest match reference.
   */
  latestMatchId?: string;
}


// ============================================================
// MATCH COMPETITORS
// ============================================================

export interface Competitor {
  /**
   * Wrestler/team ID.
   */
  wrestlerId: string;

  /**
   * Display name.
   */
  wrestler: string;

  /**
   * Optional team number.
   *
   * Example:
   * team: 1
   * team: 2
   */
  team?: number;
}


// ============================================================
// MATCH RESULT
// ============================================================

export interface MatchResult {
  /**
   * Winner's wrestler ID/name or "draw".
   */
  winner: string | "draw";

  /**
   * Method used to finish the match.
   */
  method: WinMethod;

  /**
   * Match duration.
   *
   * Example:
   * "12:34"
   */
  time: string;

  /**
   * Optional winner image.
   */
  winnerImage?: string;
}


// ============================================================
// MATCH
// ============================================================

export interface Match {
  /**
   * Unique match ID.
   */
  id: string;

  /**
   * Event ID.
   */
  eventId: string;

  /**
   * Event URL slug.
   */
  eventSlug: string;

  /**
   * Event display name.
   */
  eventName: string;

  /**
   * Match date.
   */
  date: string;

  /**
   * Event city.
   */
  city: string;

  /**
   * Match stipulation/type.
   */
  type: MatchType;

  /**
   * Championship being contested, if any.
   */
  championship?: string;

  /**
   * Match competitors.
   */
  competitors: Competitor[];

  /**
   * Match result.
   */
  result: MatchResult;

  /**
   * Optional star rating.
   */
  rating?: number;

  /**
   * Optional match description.
   */
  description?: string;

  /**
   * Whether this was the main event.
   */
  isMainEvent?: boolean;
}


// ============================================================
// EVENTS
// ============================================================

export interface EventItem {
  /**
   * Unique event ID.
   */
  id: string;

  /**
   * URL-friendly event slug.
   */
  slug: string;

  /**
   * Event name.
   */
  name: string;

  /**
   * Optional event tagline.
   */
  tagline?: string;

  /**
   * Event city.
   */
  city: string;

  /**
   * Venue.
   */
  venue?: string;

  /**
   * Start date.
   */
  date: string;

  /**
   * Optional end date for multi-day events.
   */
  endDate?: string;

  /**
   * Current event status.
   */
  status: "upcoming" | "live" | "completed";

  /**
   * Match IDs belonging to this event.
   */
  matches: string[];

  /**
   * External ticket URL.
   */
  ticketsUrl?: string;

  /**
   * Event poster.
   */
  posterImage: string;

  /**
   * Optional large hero image.
   */
  heroImage?: string;

  /**
   * Event description.
   */
  description?: string;
}


// ============================================================
// CHAMPIONSHIP / TITLES
// ============================================================

export interface TitleReign {
  /**
   * Champion's wrestler ID/name.
   */
  champion: string;

  /**
   * Number of this champion's reign.
   */
  reign: number;

  /**
   * Reign start date.
   */
  from: string;

  /**
   * Reign end date.
   *
   * null = current champion.
   */
  to: string | null;

  /**
   * Number of days held.
   */
  days: number;

  /**
   * Successful defenses.
   */
  defenses: number;

  /**
   * Optional opponent from the final defense.
   */
  opponent?: string;
}

export interface Championship {
  /**
   * Unique championship ID.
   */
  id: string;

  /**
   * Full championship name.
   */
  name: string;

  /**
   * Short display name.
   */
  shortName: string;

  /**
   * Championship graphic/logo.
   */
  image: string;

  /**
   * Optional division/weight class.
   */
  weightClass?: string;

  /**
   * Current champion.
   *
   * null = vacant championship.
   */
  currentChampion: {
    wrestlerId: string;
    wrestler: string;
    image: string;
    nickname: string;
  } | null;

  /**
   * Current reign number.
   */
  reign: number;

  /**
   * Current reign duration.
   */
  daysHeld: number;

  /**
   * Successful defenses during current reign.
   */
  defenses: number;

  /**
   * Most recent title defense.
   *
   * null = no defense yet.
   */
  lastDefense: {
    event: string;
    date: string;
    opponent: string;
  } | null;

  /**
   * Complete championship history.
   */
  history: TitleReign[];
}


// ============================================================
// NEWS / ARTICLES
// ============================================================

export type ArticleCategory =
  | "breaking"
  | "news"
  | "results"
  | "announcements"
  | "backstage";

export interface Article {
  /**
   * Unique article ID.
   */
  id: string;

  /**
   * URL-friendly slug.
   */
  slug: string;

  /**
   * Article title.
   */
  title: string;

  /**
   * Short article summary.
   */
  excerpt: string;

  /**
   * Full article content.
   */
  content: string;

  /**
   * Article category.
   */
  category: ArticleCategory;

  /**
   * Article author.
   */
  author: string;

  /**
   * Publication date.
   */
  date: string;

  /**
   * Estimated reading time in minutes.
   */
  readTime: number;

  /**
   * Article hero/thumbnail image.
   */
  image: string;

  /**
   * Whether this article is featured.
   */
  featured: boolean;
}


// ============================================================
// STORYLINES / FEUDS
// ============================================================

export interface Story {
  /**
   * Unique storyline ID.
   */
  id: string;

  /**
   * URL-friendly slug.
   */
  slug: string;

  /**
   * Storyline title.
   */
  title: string;

  /**
   * Storyline subtitle.
   */
  subtitle: string;

  /**
   * Short storyline summary.
   */
  excerpt: string;

  /**
   * Full storyline content.
   */
  content: string;

  /**
   * Storyline state.
   */
  status: "active" | "past" | "upcoming";

  /**
   * Wrestler IDs / names involved.
   */
  participants: string[];

  /**
   * Storyline image.
   */
  image: string;
}


// ============================================================
// MEDIA
// ============================================================

export type MediaCategory =
  | "latest-video"
  | "highlights"
  | "matches"
  | "backstage"
  | "interviews"
  | "photo-gallery";

export type MediaItemType = "video" | "image";

export interface MediaItem {
  /**
   * Unique media ID.
   */
  id: string;

  /**
   * Media format.
   */
  type: MediaItemType;

  /**
   * Media category.
   */
  category: MediaCategory;

  /**
   * Media title.
   */
  title: string;

  /**
   * Media description.
   */
  description: string;

  /**
   * Thumbnail image.
   */
  thumbnail: string;

  /**
   * Video duration.
   */
  duration?: string;

  /**
   * Publication date.
   */
  date: string;

  /**
   * Video/image destination URL.
   */
  url: string;
}