
import { championships } from "@/data";
import type { Wrestler } from "@/types";

/* ============================================================
   ROSTER FILTERS
   ============================================================ */

export type RosterGenderFilter = "all" | "men" | "women";

export type RosterTagTeamFilter = "all" | "mens" | "womens" | "mixed";

export type RosterPrimaryFilter =
  | RosterGenderFilter
  | RosterTagTeamFilter
  | "tag"
  | "champions";

export type RosterCategoryFilter =
  | "all"
  | "singles"
  | "tag"
  | "champions"
  | "managers"
  | "referees"
  | "announcers"
  | "commentators";

/* ============================================================
   CHAMPIONSHIP DEFINITIONS
   ============================================================ */

export const CHAMPIONSHIP_NAMES = {
  MEN_WORLD: "IM World Championship",
  MEN_UNIVERSAL: "IM Universal Championship",
  WOMENS_WORLD: "IM Women's World Championship",
  MENS_TAG_TEAM: "IM Men's Tag Team Championship",
  WOMENS_TAG_TEAM: "IM Women's Tag Team Championship",
} as const;

export type ChampionshipDivision =
  | "mens-singles"
  | "womens-singles"
  | "mens-tag-team"
  | "womens-tag-team";

export const CHAMPIONSHIP_DIVISIONS: Record<
  ChampionshipDivision,
  readonly string[]
> = {
  "mens-singles": [
    CHAMPIONSHIP_NAMES.MEN_WORLD,
    CHAMPIONSHIP_NAMES.MEN_UNIVERSAL,
  ],
  "womens-singles": [
    CHAMPIONSHIP_NAMES.WOMENS_WORLD,
  ],
  "mens-tag-team": [
    CHAMPIONSHIP_NAMES.MENS_TAG_TEAM,
  ],
  "womens-tag-team": [
    CHAMPIONSHIP_NAMES.WOMENS_TAG_TEAM,
  ],
};

/* ============================================================
   FIELD NORMALIZERS
   ============================================================ */

function normalizeField(value?: string | null): string {
  return String(value ?? "")
    .toLowerCase()
    .trim()
    .replace(/[_]+/g, "-")
    .replace(/\s+/g, " ");
}

function getFields(wrestler: Wrestler) {
  return {
    role: normalizeField(wrestler.role),
    type: normalizeField(wrestler.type),
    division: normalizeField(wrestler.division),
    weightClass: normalizeField(wrestler.weightClass),
  };
}

function normalizeChampionshipName(
  value?: string | null
): string {
  return normalizeField(value).replace(/[’‘]/g, "'");
}

/* ============================================================
   ROLE DETECTION
   ============================================================ */

export function isTagTeam(wrestler: Wrestler): boolean {
  const { role, type, division, weightClass } = getFields(wrestler);

  return (
    role === "tag-team" ||
    role === "tag team" ||
    type === "tag-team" ||
    type === "tag team" ||
    division.includes("tag team") ||
    weightClass.includes("tag team")
  );
}

export function isManager(wrestler: Wrestler): boolean {
  const { role, type, division, weightClass } = getFields(wrestler);

  return (
    role === "manager" ||
    type === "manager" ||
    division.includes("management") ||
    division.includes("manager") ||
    weightClass.includes("manager")
  );
}

export function isReferee(wrestler: Wrestler): boolean {
  const { role, type, division, weightClass } = getFields(wrestler);

  return (
    role === "referee" ||
    role === "refree" ||
    type === "referee" ||
    type === "refree" ||
    division.includes("referee") ||
    division.includes("refree") ||
    weightClass.includes("referee") ||
    weightClass.includes("refree")
  );
}

export function isAnnouncer(wrestler: Wrestler): boolean {
  const { role, type, division, weightClass } = getFields(wrestler);

  return (
    role === "announcer" ||
    role === "ring-announcer" ||
    role === "ring announcer" ||
    type === "announcer" ||
    type === "ring-announcer" ||
    type === "ring announcer" ||
    division.includes("announcer") ||
    division.includes("ring announcer") ||
    weightClass.includes("announcer") ||
    weightClass.includes("ring announcer")
  );
}

export function isCommentator(wrestler: Wrestler): boolean {
  const { role, type, weightClass, division } = getFields(wrestler);

  return (
    role === "commentator" ||
    role === "commentators" ||
    type === "commentator" ||
    type === "commentators" ||
    weightClass.includes("commentator") ||
    division.includes("commentator")
  );
}

export function isSinglesWrestler(wrestler: Wrestler): boolean {
  return (
    !isTagTeam(wrestler) &&
    !isManager(wrestler) &&
    !isReferee(wrestler) &&
    !isAnnouncer(wrestler) &&
    !isCommentator(wrestler)
  );
}

/* ============================================================
   CHAMPIONSHIP LOOKUPS
   ============================================================ */

const activeChampionshipNames = new Set<string>(
  Object.values(CHAMPIONSHIP_NAMES).map(
    normalizeChampionshipName
  )
);

const championWrestlerIds = new Set<string>(
  championships.flatMap((championship) => {
    const wrestlerId =
      championship.currentChampion?.wrestlerId;

    return wrestlerId ? [wrestlerId] : [];
  })
);

export function isActiveChampionship(
  championshipName?: string | null
): boolean {
  if (!championshipName) return false;

  return activeChampionshipNames.has(
    normalizeChampionshipName(championshipName)
  );
}

export function getChampionshipDivision(
  championshipName?: string | null
): ChampionshipDivision | null {
  if (!championshipName) return null;

  const normalizedName =
    normalizeChampionshipName(championshipName);

  for (const [division, names] of Object.entries(
    CHAMPIONSHIP_DIVISIONS
  ) as [ChampionshipDivision, readonly string[]][]) {
    if (
      names.some(
        (name) =>
          normalizeChampionshipName(name) === normalizedName
      )
    ) {
      return division;
    }
  }

  return null;
}

/**
 * True when the wrestler holds a current championship.
 *
 * The championship records are the primary source. The legacy
 * wrestler.championships field is supported only for active title
 * names to avoid treating historical titles as current titles.
 */
export function isChampion(wrestler: Wrestler): boolean {
  if (championWrestlerIds.has(wrestler.id)) {
    return true;
  }

  return (
    Array.isArray(wrestler.championships) &&
    wrestler.championships.some(
      (name) =>
        typeof name === "string" &&
        isActiveChampionship(name)
    )
  );
}

export function holdsChampionship(
  wrestler: Wrestler,
  championshipName: string
): boolean {
  if (!isActiveChampionship(championshipName)) {
    return false;
  }

  const targetName =
    normalizeChampionshipName(championshipName);

  const hasCurrentRecord = championships.some(
    (championship) =>
      normalizeChampionshipName(championship.name) ===
        targetName &&
      championship.currentChampion?.wrestlerId === wrestler.id
  );

  if (hasCurrentRecord) {
    return true;
  }

  return (
    Array.isArray(wrestler.championships) &&
    wrestler.championships.some(
      (name) =>
        typeof name === "string" &&
        normalizeChampionshipName(name) === targetName
    )
  );
}

/* ============================================================
   FILTER PREDICATES
   ============================================================ */

export function matchesGender(
  wrestler: Wrestler,
  gender: RosterGenderFilter
): boolean {
  if (gender === "all") return true;

  return normalizeField(wrestler.gender) === gender;
}

export function matchesTagTeamDivision(
  wrestler: Wrestler,
  filter: RosterTagTeamFilter
): boolean {
  if (filter === "all") return true;

  if (!isTagTeam(wrestler)) return false;

  const division = normalizeField(wrestler.division);

  switch (filter) {
    case "mens":
      return division === "tag team";
    case "womens":
      return division === "women's tag team";
    case "mixed":
      return division === "mixed tag team";
    default:
      return true;
  }
}

export function matchesCategory(
  wrestler: Wrestler,
  category: RosterCategoryFilter
): boolean {
  switch (category) {
    case "all":
      return true;

    case "singles":
      return isSinglesWrestler(wrestler);

    case "tag":
      return isTagTeam(wrestler);

    case "champions":
      return isChampion(wrestler);

    case "managers":
      return isManager(wrestler);

    case "referees":
      return isReferee(wrestler);

    case "announcers":
      return isAnnouncer(wrestler);

    case "commentators":
      return isCommentator(wrestler);

    default:
      return true;
  }
}

/* ============================================================
   SEARCH
   ============================================================ */

export function getSearchText(wrestler: Wrestler): string {
  return [
    wrestler.name,
    wrestler.ringName,
    wrestler.nickname,
    wrestler.division,
    wrestler.weightClass,
    wrestler.role,
    wrestler.type,
    wrestler.from,
    wrestler.style,
    wrestler.finisher,
    wrestler.height,
    wrestler.weight,
    ...(wrestler.members ?? []),
    ...(wrestler.championships ?? []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

/* ============================================================
   DISPLAY LABELS
   ============================================================ */

export function getRoleLabel(wrestler: Wrestler): string {
  if (isTagTeam(wrestler)) return "TAG TEAM";
  if (isManager(wrestler)) return "MANAGER";
  if (isReferee(wrestler)) return "REFEREE";
  if (isCommentator(wrestler)) return "COMMENTATOR";
  if (isAnnouncer(wrestler)) return "RING ANNOUNCER";

  return "ATHLETE";
}

export function getDivisionLabel(wrestler: Wrestler): string {
  if (isTagTeam(wrestler)) {
    const gender = normalizeField(wrestler.gender);

    if (gender === "women") return "WOMEN'S TAG TEAM";
    if (gender === "men") return "MEN'S TAG TEAM";

    return "TAG TEAM";
  }

  if (isManager(wrestler)) return "MANAGEMENT";
  if (isReferee(wrestler)) return "OFFICIAL";

  if (isCommentator(wrestler) || isAnnouncer(wrestler)) {
    return "BROADCAST TEAM";
  }

  if (normalizeField(wrestler.gender) === "women") {
    return wrestler.division || "WOMEN'S DIVISION";
  }

  return wrestler.weightClass || wrestler.division || "SINGLES";
}

/* ============================================================
   RECORDS AND WIN RATE
   ============================================================ */

export function getRecord(wrestler: Wrestler) {
  const {
    wins = 0,
    losses = 0,
    draws = 0,
  } = wrestler.record ?? { wins: 0, losses: 0, draws: 0 };

  return {
    wins,
    losses,
    draws,
    total: wins + losses + draws,
  };
}

export function getRecordLabel(wrestler: Wrestler): string {
  const { wins, losses, draws } = getRecord(wrestler);

  return `${wins}W-${losses}L-${draws}D`;
}

export function getWinRate(wrestler: Wrestler): number {
  const { wins, total } = getRecord(wrestler);

  if (!total) return 0;

  return Math.round((wins / total) * 100);
}

export function getWinRateLabel(wrestler: Wrestler): string {
  const { total } = getRecord(wrestler);

  if (!total) return "N/A";

  return `${getWinRate(wrestler)}%`;
}

/* ============================================================
   LOCATION AND COUNTRY
   ============================================================ */

export function getLocation(wrestler: Wrestler): string | null {
  const from = wrestler.from?.trim();

  return from || null;
}

export function getCountry(wrestler: Wrestler): string | null {
  const location = getLocation(wrestler);

  if (!location) return null;

  const parts = location
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

  return parts.at(-1) || null;
}

export function getFlagEmoji(wrestler: Wrestler): string | null {
  const country = getCountry(wrestler);

  if (!country) return null;

  return countryToFlag(country);
}

export function countryToFlag(country: string): string | null {
  const key = country
    .trim()
    .toLowerCase()
    .replace(/[.,]/g, "")
    .replace(/\s+/g, " ");

  const map: Record<string, string> = {
    india: "🇮🇳",
    "united states": "🇺🇸",
    usa: "🇺🇸",
    us: "🇺🇸",
    "u.s.a": "🇺🇸",
    canada: "🇨🇦",
    "united kingdom": "🇬🇧",
    uk: "🇬🇧",
    england: "🇬🇧",
    scotland: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
    wales: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
    "northern ireland": "🇬🇧",
    mexico: "🇲🇽",
    japan: "🇯🇵",
    australia: "🇦🇺",
    italy: "🇮🇹",
    slovakia: "🇸🇰",
    "puerto rico": "🇵🇷",
    ireland: "🇮🇪",
    france: "🇫🇷",
    germany: "🇩🇪",
    spain: "🇪🇸",
    brazil: "🇧🇷",
    argentina: "🇦🇷",
    china: "🇨🇳",
    korea: "🇰🇷",
    "south korea": "🇰🇷",
    "north korea": "🇰🇵",
    russia: "🇷🇺",
    "new zealand": "🇳🇿",
    netherlands: "🇳🇱",
    belgium: "🇧🇪",
    switzerland: "🇨🇭",
    austria: "🇦🇹",
    poland: "🇵🇱",
    sweden: "🇸🇪",
    norway: "🇳🇴",
    denmark: "🇩🇰",
    finland: "🇫🇮",
    portugal: "🇵🇹",
    greece: "🇬🇷",
    turkey: "🇹🇷",
    "south africa": "🇿🇦",
    egypt: "🇪🇬",
    nigeria: "🇳🇬",
    kenya: "🇰🇪",
    singapore: "🇸🇬",
    "hong kong": "🇭🇰",
    taiwan: "🇹🇼",
    thailand: "🇹🇭",
    "united arab emirates": "🇦🇪",
    "saudi arabia": "🇸🇦",
  };

  return map[key] ?? null;
}

/* ============================================================
   PLACEHOLDER VALUES
   ============================================================ */

const PLACEHOLDER_VALUES = new Set([
  "",
  "n/a",
  "na",
  "not listed",
  "unknown",
  "team",
  "-",
  "tbd",
]);

export function hasValue(
  value?: string | null
): value is string {
  if (typeof value !== "string") return false;

  return !PLACEHOLDER_VALUES.has(
    value.trim().toLowerCase()
  );
}

/* ============================================================
   IMAGE HANDLING
   ============================================================ */

export function normalizeImageSource(
  source?: string | null
): string | null {
  if (!source) return null;

  let value = source.trim();

  if (!value) return null;

  const markdownMatch = value.match(/^\[.*?\]\((.*?)\)$/);

  if (markdownMatch?.[1]) {
    value = markdownMatch[1].trim();
  }

  value = value.replace(/^["']|["']$/g, "");

  return value || null;
}

export function getWrestlerImage(
  wrestler: Wrestler
): string | null {
  return (
    normalizeImageSource(wrestler.image) ??
    normalizeImageSource(wrestler.imageFull)
  );
}

export function getWrestlerPortraitAlt(
  wrestler: Wrestler
): string {
  const name = wrestler.ringName || wrestler.name;

  return wrestler.nickname
    ? `${name}, known as ${wrestler.nickname}`
    : name;
}

/* ============================================================
   NAME TYPOGRAPHY
   ============================================================ */

export function getNameLines(ringName?: string): {
  kicker?: string;
  display: string;
} {
  const value = (ringName || "").trim();

  if (!value) return { display: "" };

  const words = value.split(/\s+/);

  if (words.length === 2) {
    const [first, second] = words;

    if (first.length <= 4) {
      return {
        kicker: first,
        display: second,
      };
    }
  }

  return { display: value };
}