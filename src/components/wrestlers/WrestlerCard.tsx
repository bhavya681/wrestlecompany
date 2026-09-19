// "use client";

// import Link from "next/link";
// import type { ReactNode } from "react";

// import { cn } from "@/lib/utils";
// import { Badge } from "@/components/ui/Button";
// import type { Wrestler } from "@/types";

// interface WrestlerCardProps {
//   wrestler: Wrestler;
//   variant?: "default" | "compact" | "profile";
//   showDetails?: boolean;
// }

// /* =========================================================
//    PROFILE LINK
//    ========================================================= */

// function ProfileLink({
//   href,
//   children,
//   className,
//   ariaLabel,
// }: {
//   href: string;
//   children: ReactNode;
//   className?: string;
//   ariaLabel?: string;
// }) {
//   return (
//     <Link
//       href={href}
//       aria-label={ariaLabel}
//       className={cn(
//         "group relative block overflow-hidden outline-none",
//         "focus-visible:ring-2 focus-visible:ring-accent-red",
//         "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
//         className
//       )}
//     >
//       {children}
//     </Link>
//   );
// }

// /* =========================================================
//    STATUS DOT
//    ========================================================= */

// function StatusDot({
//   status,
// }: {
//   status: Wrestler["status"];
// }) {
//   const statusStyles: Record<string, string> = {
//     active:
//       "bg-green-400 shadow-[0_0_12px_rgba(74,222,128,0.8)]",

//     inactive:
//       "bg-yellow-400 shadow-[0_0_12px_rgba(250,204,21,0.7)]",

//     retired: "bg-gray-500",
//   };

//   return (
//     <span className="inline-flex items-center gap-2">
//       <span
//         className={cn(
//           "h-1.5 w-1.5 rounded-full",
//           statusStyles[status] ?? "bg-gray-500"
//         )}
//         aria-hidden="true"
//       />

//       <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/60">
//         {status}
//       </span>
//     </span>
//   );
// }

// /* =========================================================
//    ROLE HELPERS
//    ========================================================= */

// /**
//  * Converts the roster role/type into the label displayed
//  * on the card.
//  *
//  * Supported:
//  * - Wrestler
//  * - Diva
//  * - Tag Team
//  * - Manager
//  * - Commentator
//  * - Ring Announcer
//  * - Referee
//  */

// function getRoleLabel(wrestler: Wrestler) {
//   const role = String(wrestler.role || "").toLowerCase();
//   const type = String(wrestler.type || "").toLowerCase();
//   const division = String(wrestler.division || "").toLowerCase();
//   const weightClass = String(wrestler.weightClass || "").toLowerCase();

//   /* TAG TEAM */
//   if (
//     role === "tag-team" ||
//     type === "tag-team" ||
//     division.includes("tag team") ||
//     weightClass.includes("tag team")
//   ) {
//     return "TAG TEAM";
//   }

//   /* MANAGER */
//   if (
//     role === "manager" ||
//     type === "manager" ||
//     division.includes("management") ||
//     weightClass.includes("manager")
//   ) {
//     return "MANAGER";
//   }

//   /* REFEREE */
//   if (
//     role === "referee" ||
//     type === "referee" ||
//     division.includes("referee") ||
//     weightClass.includes("referee") ||
//     weightClass.includes("refree")
//   ) {
//     return "REFEREE";
//   }

//   /* COMMENTATOR */
//   if (
//     role === "commentator" ||
//     role === "commentator" ||
//     division.includes("commentator") ||
//     division.includes("broadcast") ||
//     weightClass.includes("commentator")
//   ) {
//     return "COMMENTATOR";
//   }

//   /* RING ANNOUNCER */
//   if (
//     role === "announcer" ||
//     type === "announcer" ||
//     weightClass.includes("ring announcer") ||
//     division.includes("ring announcer")
//   ) {
//     return "RING ANNOUNCER";
//   }

//   /* FEMALE ATHLETE */
//   if (wrestler.gender === "women") {
//     return "ATHLETE";
//   }

//   /* MALE WRESTLER */
//   return "ATHLETE";
// }

// /* =========================================================
//    DIVISION LABEL
//    ========================================================= */

// function getDivisionLabel(wrestler: Wrestler) {
//   const role = String(wrestler.role || "").toLowerCase();
//   const type = String(wrestler.type || "").toLowerCase();
//   const division = String(wrestler.division || "").toLowerCase();
//   const weightClass = String(wrestler.weightClass || "").toLowerCase();

//   /* TAG TEAM */
//   if (
//     role === "tag-team" ||
//     type === "tag-team" ||
//     division.includes("tag team") ||
//     weightClass.includes("tag team")
//   ) {
//     return "TAG TEAM";
//   }

//   /* MANAGER */
//   if (
//     role === "manager" ||
//     type === "manager" ||
//     division.includes("management") ||
//     weightClass.includes("manager")
//   ) {
//     return "MANAGEMENT";
//   }

//   /* REFEREE */
//   if (
//     role === "referee" ||
//     type === "referee" ||
//     division.includes("referee") ||
//     weightClass.includes("referee") ||
//     weightClass.includes("refree")
//   ) {
//     return "OFFICIAL";
//   }

//   /* COMMENTATOR */
//   if (
//     role === "commentator" ||
//     division.includes("commentator") ||
//     division.includes("broadcast") ||
//     weightClass.includes("commentator")
//   ) {
//     return "BROADCAST TEAM";
//   }

//   /* RING ANNOUNCER */
//   if (
//     role === "announcer" ||
//     type === "announcer" ||
//     weightClass.includes("ring announcer")
//   ) {
//     return "BROADCAST TEAM";
//   }

//   /* FEMALE */
//   if (wrestler.gender === "women") {
//     return wrestler.division || "WOMEN'S DIVISION";
//   }

//   /* MALE */
//   return wrestler.weightClass || wrestler.division || "SINGLES";
// }

// /* =========================================================
//    BADGE VARIANT
//    ========================================================= */

// function getBadgeVariant(
//   wrestler: Wrestler
// ): "red" | "gold" {
//   const role = String(wrestler.role || "").toLowerCase();
//   const type = String(wrestler.type || "").toLowerCase();

//   if (
//     role === "manager" ||
//     role === "tag-team" ||
//     role === "referee" ||
//     role === "announcer" ||
//     role === "commentator" ||
//     type === "manager" ||
//     type === "tag-team" ||
//     type === "referee" ||
//     type === "announcer"
//   ) {
//     return "gold";
//   }

//   return "red";
// }

// /* =========================================================
//    RECORD
//    ========================================================= */

// function getRecordLabel(wrestler: Wrestler) {
//   const {
//     wins = 0,
//     losses = 0,
//     draws = 0,
//   } = wrestler.record || {};

//   return `${wins}W-${losses}L-${draws}D`;
// }

// /* =========================================================
//    WIN RATE
//    ========================================================= */

// function getWinRate(wrestler: Wrestler) {
//   const {
//     wins = 0,
//     losses = 0,
//     draws = 0,
//   } = wrestler.record || {};

//   const total = wins + losses + draws;

//   if (!total) return 0;

//   return Math.round((wins / total) * 100);
// }

// function getWinRateLabel(wrestler: Wrestler) {
//   const {
//     wins = 0,
//     losses = 0,
//     draws = 0,
//   } = wrestler.record || {};

//   const total = wins + losses + draws;

//   if (!total) return "N/A";

//   return `${Math.round((wins / total) * 100)}%`;
// }

// /* =========================================================
//    IMAGE URL NORMALIZER
//    ========================================================= */

// /**
//  * Your data currently contains some URLs like:
//  *
//  * [https://example.com/image.jpg](https://example.com/image.jpg)
//  *
//  * This converts them into:
//  *
//  * https://example.com/image.jpg
//  *
//  * It also supports normal URLs.
//  */

// function normalizeImageSource(
//   source?: string | null
// ): string | null {
//   if (!source) return null;

//   let value = source.trim();

//   if (!value) return null;

//   /* Remove Markdown image/link format */
//   const markdownMatch = value.match(
//     /^\[.*?\]\((.*?)\)$/
//   );

//   if (markdownMatch?.[1]) {
//     value = markdownMatch[1].trim();
//   }

//   /* Remove accidental surrounding quotes */
//   value = value.replace(/^["']|["']$/g, "");

//   return value || null;
// }

// /* =========================================================
//    WRESTLER IMAGE
//    ========================================================= */

// function WrestlerImage({
//   wrestler,
//   className,
// }: {
//   wrestler: Wrestler;
//   sizes?: string;
//   className: string;
// }) {
//   const imageSource =
//     normalizeImageSource(wrestler.image) ||
//     normalizeImageSource(wrestler.imageFull);

//   /* NO IMAGE */
//   if (!imageSource) {
//     return (
//       <div className="flex h-full w-full items-center justify-center bg-background-secondary">
//         <div className="text-center">
//           <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-black/20">
//             <span className="font-display text-2xl font-black text-accent-red">
//               {wrestler.ringName?.charAt(0) || "W"}
//             </span>
//           </div>

//           <p className="font-display text-lg font-black uppercase text-white">
//             {wrestler.ringName}
//           </p>

//           <p className="mt-2 font-mono text-[8px] uppercase tracking-[0.2em] text-white/30">
//             Image unavailable
//           </p>
//         </div>
//       </div>
//     );
//   }

//   /*
//    * IMPORTANT:
//    *
//    * Using normal <img> here instead of next/image means
//    * external domains such as:
//    *
//    * tnawrestling.com
//    * encrypted-tbn0.gstatic.com
//    * chatgpt.com
//    * user32962.na.imgto.link
//    *
//    * do NOT need to be added to next.config.js.
//    */

//   return (
//     <img
//       src={imageSource}
//       alt={wrestler.ringName || wrestler.name}
//       className={className}
//       loading="lazy"
//       decoding="async"
//     />
//   );
// }

// /* =========================================================
//    TEAM MEMBERS
//    ========================================================= */

// function TeamMembers({
//   wrestler,
// }: {
//   wrestler: Wrestler;
// }) {
//   if (!wrestler.members?.length) return null;

//   return (
//     <div className="mt-2 flex flex-wrap items-center gap-1.5">
//       {wrestler.members.map((member) => (
//         <span
//           key={member}
//           className="rounded-sm border border-accent-gold/20 bg-accent-gold/5 px-2 py-0.5 font-mono text-[8px] font-semibold uppercase tracking-[0.12em] text-accent-gold"
//         >
//           {member}
//         </span>
//       ))}
//     </div>
//   );
// }

// /* =========================================================
//    RECORD STATS
//    ========================================================= */

// function RecordStats({
//   wrestler,
// }: {
//   wrestler: Wrestler;
// }) {
//   const {
//     wins = 0,
//     losses = 0,
//     draws = 0,
//   } = wrestler.record || {};

//   const total = wins + losses + draws;
//   const winRate = getWinRate(wrestler);

//   return (
//     <div>
//       <div className="flex items-end justify-between">
//         <div>
//           <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-foreground-muted">
//             Career Record
//           </p>

//           <div className="mt-1.5 flex items-center gap-1.5 font-mono">
//             <span className="text-sm font-bold text-foreground">
//               {wins}W
//             </span>

//             <span className="text-xs text-foreground-muted">
//               -
//             </span>

//             <span className="text-sm font-bold text-foreground">
//               {losses}L
//             </span>

//             <span className="text-xs text-foreground-muted">
//               -
//             </span>

//             <span className="text-sm font-bold text-foreground">
//               {draws}D
//             </span>
//           </div>
//         </div>

//         <div className="text-right">
//           <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-foreground-muted">
//             Win Rate
//           </p>

//           <p className="mt-1 font-display text-lg font-bold text-accent-gold">
//             {total ? `${winRate}%` : "N/A"}
//           </p>
//         </div>
//       </div>

//       {total > 0 ? (
//         <>
//           <div className="mt-3 h-1 overflow-hidden rounded-full bg-background-tertiary">
//             <div
//               className="h-full rounded-full bg-accent-red transition-all duration-700 ease-out group-hover:bg-accent-gold"
//               style={{
//                 width: `${Math.min(winRate, 100)}%`,
//               }}
//             />
//           </div>

//           <p className="mt-2 font-mono text-[8px] uppercase tracking-[0.16em] text-foreground-muted-dark">
//             {total} {total === 1 ? "Match" : "Matches"}
//           </p>
//         </>
//       ) : (
//         <p className="mt-3 font-mono text-[8px] uppercase tracking-[0.16em] text-foreground-muted-dark">
//           No recorded matches
//         </p>
//       )}
//     </div>
//   );
// }

// /* =========================================================
//    CARD TOP META
//    ========================================================= */

// function CardTopMeta({
//   wrestler,
// }: {
//   wrestler: Wrestler;
// }) {
//   const badgeVariant = getBadgeVariant(wrestler);
//   const roleLabel = getRoleLabel(wrestler);

//   return (
//     <div className="absolute left-4 right-4 top-4 z-20 flex items-start justify-between gap-2">
//       <Badge variant={badgeVariant} size="sm">
//         {roleLabel}
//       </Badge>

//       <div className="rounded-full border border-white/10 bg-black/50 px-2.5 py-1.5 backdrop-blur-md">
//         <StatusDot status={wrestler.status} />
//       </div>
//     </div>
//   );
// }

// /* =========================================================
//    MAIN WRESTLER CARD
//    ========================================================= */

// export function WrestlerCard({
//   wrestler,
//   variant = "default",
//   showDetails = true,
// }: WrestlerCardProps) {
//   const roleLabel = getRoleLabel(wrestler);
//   const divisionLabel = getDivisionLabel(wrestler);
//   const recordLabel = getRecordLabel(wrestler);
//   const winRateLabel = getWinRateLabel(wrestler);

//   /* =========================================================
//      COMPACT
//      ========================================================= */

//   if (variant === "compact") {
//     return (
//       <ProfileLink
//         href={`/roster/${wrestler.id}`}
//         ariaLabel={`View ${wrestler.ringName} profile`}
//         className="aspect-[3/4] bg-background-secondary"
//       >
//         {/* IMAGE */}
//         <div className="absolute inset-0">
//           <WrestlerImage
//             wrestler={wrestler}
//             sizes="(max-width: 768px) 50vw, 25vw"
//             className={cn(
//               "h-full w-full object-cover object-top",
//               "grayscale",
//               "transition-all duration-700 ease-out",
//               "group-hover:scale-105",
//               "group-hover:grayscale-0"
//             )}
//           />

//           {/* CINEMATIC GRADIENT */}
//           <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />

//           {/* RED LIGHT */}
//           <div className="absolute inset-0 bg-accent-red/0 transition-all duration-500 group-hover:bg-accent-red/[0.06]" />
//         </div>

//         {/* TOP META */}
//         <CardTopMeta wrestler={wrestler} />

//         {/* CONTENT */}
//         <div className="absolute inset-x-0 bottom-0 z-10 p-4">
//           <p className="mb-1 font-mono text-[8px] uppercase tracking-[0.25em] text-accent-red">
//             INDUS MATWORKS
//           </p>

//           <h3 className="font-display text-xl font-bold uppercase leading-none tracking-tight text-white">
//             {wrestler.ringName}
//           </h3>

//           {wrestler.nickname && (
//             <p className="mt-1 line-clamp-1 font-body text-xs text-white/55">
//               {wrestler.nickname}
//             </p>
//           )}

//           <TeamMembers wrestler={wrestler} />

//           {showDetails && (
//             <div className="mt-3 border-t border-white/10 pt-3">
//               <div className="flex items-center justify-between gap-3 font-mono text-[9px]">
//                 <span className="truncate text-white/45">
//                   {divisionLabel}
//                 </span>

//                 <span className="shrink-0 text-white/80">
//                   {recordLabel}
//                 </span>
//               </div>

//               <div className="mt-1 flex items-center justify-between">
//                 <span className="font-mono text-[8px] uppercase tracking-[0.15em] text-white/35">
//                   {wrestler.status}
//                 </span>

//                 <span className="font-mono text-[9px] font-bold text-accent-gold">
//                   {winRateLabel}
//                 </span>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* BOTTOM LINE */}
//         <div className="absolute bottom-0 left-0 z-20 h-[2px] w-0 bg-accent-red transition-all duration-500 group-hover:w-full" />

//         {/* BORDER */}
//         <div className="pointer-events-none absolute inset-0 z-30 border border-transparent transition-colors duration-300 group-hover:border-accent-red/60" />

//         {/* VIEW */}
//         <span className="pointer-events-none absolute bottom-4 right-4 z-30 translate-y-2 font-mono text-[8px] font-bold tracking-[0.18em] text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
//           VIEW →
//         </span>
//       </ProfileLink>
//     );
//   }

//   /* =========================================================
//      PROFILE
//      ========================================================= */

//   if (variant === "profile") {
//     return (
//       <ProfileLink
//         href={`/roster/${wrestler.id}`}
//         ariaLabel={`View ${wrestler.ringName} profile`}
//         className="bg-background-secondary"
//       >
//         <div className="relative aspect-[3/4] overflow-hidden">
//           <WrestlerImage
//             wrestler={wrestler}
//             sizes="(max-width: 768px) 100vw, 33vw"
//             className={cn(
//               "h-full w-full object-cover object-top",
//               "opacity-85 grayscale",
//               "transition-all duration-700 ease-out",
//               "group-hover:scale-[1.04]",
//               "group-hover:opacity-100",
//               "group-hover:grayscale-0"
//             )}
//           />

//           {/* MAIN GRADIENT */}
//           <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

//           {/* HOVER RED GLOW */}
//           <div className="absolute inset-0 bg-accent-red/0 transition-all duration-500 group-hover:bg-accent-red/[0.05]" />

//           {/* TOP META */}
//           <CardTopMeta wrestler={wrestler} />

//           {/* CONTENT */}
//           <div className="absolute inset-x-0 bottom-0 z-10 p-5">
//             <p className="mb-1 font-mono text-[8px] uppercase tracking-[0.25em] text-accent-red">
//               {wrestler.role === "manager"
//                 ? "MANAGEMENT"
//                 : wrestler.role === "tag-team"
//                   ? "TAG TEAM ROSTER"
//                   : wrestler.role === "referee"
//                     ? "OFFICIALS"
//                     : wrestler.role === "announcer"
//                       ? "BROADCAST TEAM"
//                       : wrestler.gender === "women"
//                         ? "WOMEN'S ROSTER"
//                         : "INDUS MATWORKS"}
//             </p>

//             <h3 className="font-display text-2xl font-bold uppercase leading-none tracking-tight text-white">
//               {wrestler.ringName}
//             </h3>

//             {wrestler.nickname && (
//               <p className="mt-1 font-body text-sm text-white/55">
//                 {wrestler.nickname}
//               </p>
//             )}

//             <TeamMembers wrestler={wrestler} />
//           </div>

//           {/* PROFILE ARROW */}
//           <div className="absolute bottom-5 right-5 z-20 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
//             <span className="flex h-10 w-10 items-center justify-center rounded-full border border-accent-red bg-black/70 font-mono text-xs text-white backdrop-blur-md">
//               →
//             </span>
//           </div>

//           {/* BORDER */}
//           <div className="pointer-events-none absolute inset-0 border border-transparent transition-colors duration-300 group-hover:border-accent-red/60" />
//         </div>

//         {/* STATS */}
//         <div className="border-x border-b border-border bg-background-secondary p-4">
//           <RecordStats wrestler={wrestler} />
//         </div>
//       </ProfileLink>
//     );
//   }

//   /* =========================================================
//      DEFAULT
//      ========================================================= */

//   return (
//     <ProfileLink
//       href={`/roster/${wrestler.id}`}
//       ariaLabel={`View ${wrestler.ringName} profile`}
//       className="bg-background-secondary"
//     >
//       <div className="relative aspect-[3/4] overflow-hidden">
//         {/* IMAGE */}
//         <WrestlerImage
//           wrestler={wrestler}
//           sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
//           className={cn(
//             "h-full w-full object-cover object-top",
//             "grayscale",
//             "transition-all duration-700 ease-out",
//             "group-hover:scale-[1.05]",
//             "group-hover:grayscale-0"
//           )}
//         />

//         {/* CINEMATIC OVERLAY */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

//         {/* HOVER LIGHT */}
//         <div className="absolute inset-0 bg-accent-red/0 transition-all duration-500 group-hover:bg-accent-red/[0.06]" />

//         {/* TOP META */}
//         <CardTopMeta wrestler={wrestler} />

//         {/* =====================================================
//             HOVER STAT PANEL
//             ===================================================== */}

//         {showDetails && (
//           <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-5 bg-black/65 px-5 opacity-0 backdrop-blur-[3px] transition-all duration-300 group-hover:opacity-100">
//             <div className="text-center">
//               <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-accent-red">
//                 CAREER STATISTICS
//               </p>

//               <div className="mt-4 flex items-center justify-center gap-6">
//                 {/* WINS */}
//                 <div className="text-center">
//                   <p className="font-display text-3xl font-bold text-white">
//                     {wrestler.record?.wins ?? 0}
//                   </p>

//                   <p className="mt-1 font-mono text-[8px] uppercase tracking-widest text-green-400">
//                     Wins
//                   </p>
//                 </div>

//                 <div className="h-10 w-px bg-white/15" />

//                 {/* LOSSES */}
//                 <div className="text-center">
//                   <p className="font-display text-3xl font-bold text-white">
//                     {wrestler.record?.losses ?? 0}
//                   </p>

//                   <p className="mt-1 font-mono text-[8px] uppercase tracking-widest text-red-400">
//                     Losses
//                   </p>
//                 </div>

//                 <div className="h-10 w-px bg-white/15" />

//                 {/* DRAWS */}
//                 <div className="text-center">
//                   <p className="font-display text-3xl font-bold text-white">
//                     {wrestler.record?.draws ?? 0}
//                   </p>

//                   <p className="mt-1 font-mono text-[8px] uppercase tracking-widest text-yellow-400">
//                     Draws
//                   </p>
//                 </div>
//               </div>

//               <div className="mx-auto mt-5 h-px w-20 bg-accent-red" />

//               <p className="mt-4 font-display text-xl font-bold text-accent-gold">
//                 {winRateLabel} WIN RATE
//               </p>
//             </div>

//             <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-white">
//               View Profile →
//             </span>
//           </div>
//         )}

//         {/* =====================================================
//             BOTTOM INFORMATION
//             ===================================================== */}

//         <div className="absolute inset-x-0 bottom-0 z-20 p-4 transition-transform duration-500 group-hover:translate-y-1">
//           <p className="mb-1 font-mono text-[8px] uppercase tracking-[0.25em] text-accent-red">
//             {roleLabel}
//           </p>

//           <h3 className="font-display text-xl font-bold uppercase leading-none tracking-tight text-white">
//             {wrestler.ringName}
//           </h3>

//           {wrestler.nickname && (
//             <p className="mt-1 line-clamp-1 font-body text-xs text-white/55">
//               {wrestler.nickname}
//             </p>
//           )}

//           <TeamMembers wrestler={wrestler} />

//           <div className="mt-3 flex items-center justify-between gap-3 border-t border-white/10 pt-3">
//             <div className="min-w-0">
//               <p className="truncate font-mono text-[8px] uppercase tracking-[0.15em] text-white/35">
//                 {divisionLabel}
//               </p>

//               <p className="mt-0.5 font-mono text-[9px] text-white/55">
//                 {recordLabel}
//               </p>
//             </div>

//             <div className="text-right">
//               <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-white/35">
//                 Win Rate
//               </p>

//               <p className="mt-0.5 font-mono text-[9px] font-bold text-accent-gold">
//                 {winRateLabel}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* RED ACCENT LINE */}
//         <div className="absolute bottom-0 left-0 z-30 h-[2px] w-0 bg-accent-red transition-all duration-500 group-hover:w-full" />

//         {/* HOVER BORDER */}
//         <div className="pointer-events-none absolute inset-0 z-30 border border-transparent transition-colors duration-300 group-hover:border-accent-red/60" />
//       </div>
//     </ProfileLink>
//   );
// }

"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Button";
import type { Wrestler } from "@/types";

interface WrestlerCardProps {
  wrestler: Wrestler;
  variant?: "default" | "compact" | "profile";
  showDetails?: boolean;
}

/* =========================================================
   PROFILE LINK
   ========================================================= */

function ProfileLink({
  href,
  children,
  className,
  ariaLabel,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={cn(
        "group relative block min-w-0 overflow-hidden outline-none",
        "focus-visible:ring-2 focus-visible:ring-accent-red",
        "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
    >
      {children}
    </Link>
  );
}

/* =========================================================
   STATUS DOT
   ========================================================= */

function StatusDot({
  status,
}: {
  status: Wrestler["status"];
}) {
  const statusStyles: Record<string, string> = {
    active:
      "bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.75)]",
    inactive:
      "bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.65)]",
    retired: "bg-gray-500",
  };

  return (
    <span className="inline-flex min-w-0 items-center gap-1.5">
      <span
        className={cn(
          "h-1.5 w-1.5 shrink-0 rounded-full",
          statusStyles[status] ?? "bg-gray-500"
        )}
        aria-hidden="true"
      />

      <span className="truncate font-mono text-[8px] font-semibold uppercase tracking-[0.14em] text-white/65">
        {status}
      </span>
    </span>
  );
}

/* =========================================================
   ROLE HELPERS
   ========================================================= */

function getRoleLabel(wrestler: Wrestler) {
  const role = String(wrestler.role || "").toLowerCase();
  const type = String(wrestler.type || "").toLowerCase();
  const division = String(wrestler.division || "").toLowerCase();
  const weightClass = String(wrestler.weightClass || "").toLowerCase();

  if (
    role === "tag-team" ||
    type === "tag-team" ||
    division.includes("tag team") ||
    weightClass.includes("tag team")
  ) {
    return "TAG TEAM";
  }

  if (
    role === "manager" ||
    type === "manager" ||
    division.includes("management") ||
    weightClass.includes("manager")
  ) {
    return "MANAGER";
  }

  if (
    role === "referee" ||
    type === "referee" ||
    division.includes("referee") ||
    weightClass.includes("referee") ||
    weightClass.includes("refree")
  ) {
    return "REFEREE";
  }

  if (
    role === "commentator" ||
    division.includes("commentator") ||
    division.includes("broadcast") ||
    weightClass.includes("commentator")
  ) {
    return "COMMENTATOR";
  }

  if (
    role === "announcer" ||
    type === "announcer" ||
    weightClass.includes("ring announcer") ||
    division.includes("ring announcer")
  ) {
    return "RING ANNOUNCER";
  }

  return "ATHLETE";
}

/* =========================================================
   DIVISION LABEL
   ========================================================= */

function getDivisionLabel(wrestler: Wrestler) {
  const role = String(wrestler.role || "").toLowerCase();
  const type = String(wrestler.type || "").toLowerCase();
  const division = String(wrestler.division || "").toLowerCase();
  const weightClass = String(wrestler.weightClass || "").toLowerCase();

  if (
    role === "tag-team" ||
    type === "tag-team" ||
    division.includes("tag team") ||
    weightClass.includes("tag team")
  ) {
    return "TAG TEAM";
  }

  if (
    role === "manager" ||
    type === "manager" ||
    division.includes("management") ||
    weightClass.includes("manager")
  ) {
    return "MANAGEMENT";
  }

  if (
    role === "referee" ||
    type === "referee" ||
    division.includes("referee") ||
    weightClass.includes("referee") ||
    weightClass.includes("refree")
  ) {
    return "OFFICIAL";
  }

  if (
    role === "commentator" ||
    division.includes("commentator") ||
    division.includes("broadcast") ||
    weightClass.includes("commentator")
  ) {
    return "BROADCAST TEAM";
  }

  if (
    role === "announcer" ||
    type === "announcer" ||
    weightClass.includes("ring announcer") ||
    division.includes("ring announcer")
  ) {
    return "BROADCAST TEAM";
  }

  if (wrestler.gender === "women") {
    return wrestler.division || "WOMEN'S DIVISION";
  }

  return wrestler.weightClass || wrestler.division || "SINGLES";
}

/* =========================================================
   BADGE VARIANT
   ========================================================= */

function getBadgeVariant(
  wrestler: Wrestler
): "red" | "gold" {
  const role = String(wrestler.role || "").toLowerCase();
  const type = String(wrestler.type || "").toLowerCase();

  if (
    role === "manager" ||
    role === "tag-team" ||
    role === "referee" ||
    role === "announcer" ||
    role === "commentator" ||
    type === "manager" ||
    type === "tag-team" ||
    type === "referee" ||
    type === "announcer" ||
    type === "commentator"
  ) {
    return "gold";
  }

  return "red";
}

/* =========================================================
   RECORD HELPERS
   ========================================================= */

function getRecord(wrestler: Wrestler) {
  const {
    wins = 0,
    losses = 0,
    draws = 0,
  } = wrestler.record || {};

  return {
    wins,
    losses,
    draws,
    total: wins + losses + draws,
  };
}

function getRecordLabel(wrestler: Wrestler) {
  const { wins, losses, draws } = getRecord(wrestler);

  return `${wins}W-${losses}L-${draws}D`;
}

function getWinRate(wrestler: Wrestler) {
  const { wins, total } = getRecord(wrestler);

  if (!total) return 0;

  return Math.round((wins / total) * 100);
}

function getWinRateLabel(wrestler: Wrestler) {
  const { total } = getRecord(wrestler);

  if (!total) return "N/A";

  return `${getWinRate(wrestler)}%`;
}

/* =========================================================
   LOCATION
   ========================================================= */

function getCountry(wrestler: Wrestler) {
  if (!wrestler.from) return null;

  const parts = wrestler.from
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

  return parts.at(-1) || null;
}

function getLocation(wrestler: Wrestler) {
  if (!wrestler.from) return null;

  return wrestler.from.trim();
}

/* =========================================================
   IMAGE NORMALIZER
   ========================================================= */

function normalizeImageSource(
  source?: string | null
): string | null {
  if (!source) return null;

  let value = source.trim();

  if (!value) return null;

  const markdownMatch = value.match(
    /^\[.*?\]\((.*?)\)$/
  );

  if (markdownMatch?.[1]) {
    value = markdownMatch[1].trim();
  }

  value = value.replace(/^["']|["']$/g, "");

  return value || null;
}

/* =========================================================
   WRESTLER IMAGE
   ========================================================= */

function WrestlerImage({
  wrestler,
  className,
}: {
  wrestler: Wrestler;
  sizes?: string;
  className: string;
}) {
  const imageSource =
    normalizeImageSource(wrestler.image) ||
    normalizeImageSource(wrestler.imageFull);

  if (!imageSource) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-background-secondary">
        <div className="min-w-0 px-5 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-black/20">
            <span className="font-display text-2xl font-black text-accent-red">
              {wrestler.ringName?.charAt(0) || "W"}
            </span>
          </div>

          <p className="truncate font-display text-lg font-black uppercase text-white">
            {wrestler.ringName}
          </p>

          <p className="mt-2 font-mono text-[8px] uppercase tracking-[0.2em] text-white/30">
            Image unavailable
          </p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={imageSource}
      alt={wrestler.ringName || wrestler.name}
      className={className}
      loading="lazy"
      decoding="async"
    />
  );
}

/* =========================================================
   TEAM MEMBERS
   ========================================================= */

function TeamMembers({
  wrestler,
}: {
  wrestler: Wrestler;
}) {
  if (!wrestler.members?.length) return null;

  return (
    <div className="mt-2 flex min-w-0 flex-wrap items-center gap-1">
      {wrestler.members.map((member) => (
        <span
          key={member}
          className="max-w-full truncate rounded-sm border border-accent-gold/20 bg-accent-gold/5 px-1.5 py-0.5 font-mono text-[7px] font-semibold uppercase tracking-[0.1em] text-accent-gold"
        >
          {member}
        </span>
      ))}
    </div>
  );
}

/* =========================================================
   CARD TOP META
   ========================================================= */

function CardTopMeta({
  wrestler,
}: {
  wrestler: Wrestler;
}) {
  const badgeVariant = getBadgeVariant(wrestler);
  const roleLabel = getRoleLabel(wrestler);

  return (
    <div className="absolute left-3 right-3 top-3 z-30 flex min-w-0 items-start justify-between gap-2 sm:left-4 sm:right-4 sm:top-4">
      <div className="min-w-0 max-w-[65%]">
        <Badge
          variant={badgeVariant}
          size="sm"
        >
          {roleLabel}
        </Badge>
      </div>

      <div className="min-w-0 max-w-[38%] rounded-full border border-white/10 bg-black/50 px-2 py-1.5 backdrop-blur-md">
        <StatusDot status={wrestler.status} />
      </div>
    </div>
  );
}

/* =========================================================
   LOCATION META
   ========================================================= */

function LocationMeta({
  wrestler,
  dark = false,
}: {
  wrestler: Wrestler;
  dark?: boolean;
}) {
  const location = getLocation(wrestler);
  const country = getCountry(wrestler);

  if (!location) return null;

  return (
    <div
      className={cn(
        "flex min-w-0 items-center gap-1.5",
        dark ? "text-white/45" : "text-foreground-muted"
      )}
      title={location}
    >
      <span
        className={cn(
          "shrink-0 text-[10px]",
          dark ? "text-accent-red" : "text-accent-red"
        )}
        aria-hidden="true"
      >
        ◆
      </span>

      <span className="min-w-0 truncate font-mono text-[8px] uppercase tracking-[0.12em]">
        {country || location}
      </span>
    </div>
  );
}

/* =========================================================
   RECORD STATS
   ========================================================= */

function RecordStats({
  wrestler,
}: {
  wrestler: Wrestler;
}) {
  const {
    wins,
    losses,
    draws,
    total,
  } = getRecord(wrestler);

  const winRate = getWinRate(wrestler);

  return (
    <div className="min-w-0">
      <div className="flex min-w-0 items-end justify-between gap-4">
        <div className="min-w-0">
          <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-foreground-muted">
            Career Record
          </p>

          <div className="mt-1.5 flex items-center gap-1.5 font-mono">
            <span className="text-sm font-bold text-foreground">
              {wins}W
            </span>

            <span className="text-xs text-foreground-muted">
              -
            </span>

            <span className="text-sm font-bold text-foreground">
              {losses}L
            </span>

            <span className="text-xs text-foreground-muted">
              -
            </span>

            <span className="text-sm font-bold text-foreground">
              {draws}D
            </span>
          </div>
        </div>

        <div className="shrink-0 text-right">
          <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-foreground-muted">
            Win Rate
          </p>

          <p className="mt-1 font-display text-lg font-bold text-accent-gold">
            {total ? `${winRate}%` : "N/A"}
          </p>
        </div>
      </div>

      {total > 0 ? (
        <>
          <div className="mt-3 h-1 overflow-hidden rounded-full bg-background-tertiary">
            <div
              className="h-full rounded-full bg-accent-red transition-all duration-700 ease-out group-hover:bg-accent-gold"
              style={{
                width: `${Math.min(winRate, 100)}%`,
              }}
            />
          </div>

          <p className="mt-2 font-mono text-[8px] uppercase tracking-[0.16em] text-foreground-muted-dark">
            {total} {total === 1 ? "Match" : "Matches"}
          </p>
        </>
      ) : (
        <p className="mt-3 font-mono text-[8px] uppercase tracking-[0.16em] text-foreground-muted-dark">
          No recorded matches
        </p>
      )}
    </div>
  );
}

/* =========================================================
   HOVER STAT PANEL
   ========================================================= */

function HoverStats({
  wrestler,
}: {
  wrestler: Wrestler;
}) {
  const {
    wins,
    losses,
    draws,
    total,
  } = getRecord(wrestler);

  const winRate = getWinRate(wrestler);

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-x-2 bottom-2 z-25",
        "translate-y-3 opacity-0",
        "transition-all duration-300 ease-out",
        "group-hover:translate-y-0 group-hover:opacity-100",
        "group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
      )}
    >
      <div className="overflow-hidden rounded-md border border-white/10 bg-black/85 shadow-2xl backdrop-blur-xl">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-3 py-2.5">
          <span className="font-mono text-[7px] font-bold uppercase tracking-[0.2em] text-accent-red">
            Career Statistics
          </span>

          <span className="shrink-0 font-mono text-[7px] uppercase tracking-[0.15em] text-white/35">
            {total} {total === 1 ? "MATCH" : "MATCHES"}
          </span>
        </div>

        {/* Numbers */}
        <div className="grid grid-cols-3 divide-x divide-white/10">
          <div className="min-w-0 px-2 py-3 text-center">
            <p className="font-display text-xl font-bold leading-none text-white sm:text-2xl">
              {wins}
            </p>

            <p className="mt-1 font-mono text-[7px] uppercase tracking-[0.14em] text-green-400">
              Wins
            </p>
          </div>

          <div className="min-w-0 px-2 py-3 text-center">
            <p className="font-display text-xl font-bold leading-none text-white sm:text-2xl">
              {losses}
            </p>

            <p className="mt-1 font-mono text-[7px] uppercase tracking-[0.14em] text-red-400">
              Losses
            </p>
          </div>

          <div className="min-w-0 px-2 py-3 text-center">
            <p className="font-display text-xl font-bold leading-none text-white sm:text-2xl">
              {draws}
            </p>

            <p className="mt-1 font-mono text-[7px] uppercase tracking-[0.14em] text-yellow-400">
              Draws
            </p>
          </div>
        </div>

        {/* Win Rate */}
        <div className="border-t border-white/10 px-3 py-2.5">
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-[7px] uppercase tracking-[0.15em] text-white/40">
              Win Rate
            </span>

            <span className="font-display text-sm font-bold text-accent-gold">
              {total ? `${winRate}%` : "N/A"}
            </span>
          </div>

          {total > 0 && (
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-accent-gold transition-all duration-700"
                style={{
                  width: `${Math.min(winRate, 100)}%`,
                }}
              />
            </div>
          )}
        </div>

        {/* Profile CTA */}
        <div className="border-t border-white/10 px-3 py-2">
          <div className="flex items-center justify-between gap-3">
            <span className="truncate font-mono text-[7px] uppercase tracking-[0.12em] text-white/35">
              View full profile
            </span>

            <span className="shrink-0 font-mono text-[8px] font-bold text-white">
              →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MAIN WRESTLER CARD
   ========================================================= */

export function WrestlerCard({
  wrestler,
  variant = "default",
  showDetails = true,
}: WrestlerCardProps) {
  const roleLabel = getRoleLabel(wrestler);
  const divisionLabel = getDivisionLabel(wrestler);
  const recordLabel = getRecordLabel(wrestler);
  const winRateLabel = getWinRateLabel(wrestler);

  /* =======================================================
     COMPACT
     ======================================================= */

  if (variant === "compact") {
    return (
      <ProfileLink
        href={`/roster/${wrestler.id}`}
        ariaLabel={`View ${wrestler.ringName} profile`}
        className="aspect-[3/4] bg-background-secondary"
      >
        <div className="absolute inset-0">
          <WrestlerImage
            wrestler={wrestler}
            sizes="(max-width: 768px) 50vw, 25vw"
            className={cn(
              "h-full w-full object-cover object-top",
              "grayscale",
              "transition-all duration-700 ease-out",
              "group-hover:scale-105",
              "group-hover:grayscale-0"
            )}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />

          <div className="absolute inset-0 bg-accent-red/0 transition-all duration-500 group-hover:bg-accent-red/[0.06]" />
        </div>

        <CardTopMeta wrestler={wrestler} />

        <div className="absolute inset-x-0 bottom-0 z-10 min-w-0 p-4">
          <p className="mb-1 truncate font-mono text-[8px] uppercase tracking-[0.25em] text-accent-red">
            {roleLabel}
          </p>

          <h3 className="truncate font-display text-xl font-bold uppercase leading-none tracking-tight text-white">
            {wrestler.ringName}
          </h3>

          {wrestler.nickname && (
            <p className="mt-1 truncate font-body text-xs text-white/55">
              {wrestler.nickname}
            </p>
          )}

          <div className="mt-2">
            <LocationMeta wrestler={wrestler} dark />
          </div>

          <TeamMembers wrestler={wrestler} />

          {showDetails && (
            <div className="mt-3 border-t border-white/10 pt-3">
              <div className="flex min-w-0 items-center justify-between gap-3 font-mono text-[8px]">
                <span className="min-w-0 truncate text-white/45">
                  {divisionLabel}
                </span>

                <span className="shrink-0 text-white/80">
                  {recordLabel}
                </span>
              </div>

              <div className="mt-1 flex items-center justify-between gap-3">
                <span className="truncate font-mono text-[7px] uppercase tracking-[0.12em] text-white/35">
                  {wrestler.status}
                </span>

                <span className="shrink-0 font-mono text-[9px] font-bold text-accent-gold">
                  {winRateLabel}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="absolute bottom-0 left-0 z-20 h-[2px] w-0 bg-accent-red transition-all duration-500 group-hover:w-full" />

        <div className="pointer-events-none absolute inset-0 z-30 border border-transparent transition-colors duration-300 group-hover:border-accent-red/60" />

        <span className="pointer-events-none absolute bottom-4 right-4 z-30 translate-y-2 font-mono text-[8px] font-bold tracking-[0.18em] text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          VIEW →
        </span>
      </ProfileLink>
    );
  }

  /* =======================================================
     PROFILE
     ======================================================= */

  if (variant === "profile") {
    return (
      <ProfileLink
        href={`/roster/${wrestler.id}`}
        ariaLabel={`View ${wrestler.ringName} profile`}
        className="bg-background-secondary"
      >
        <div className="relative aspect-[3/4] overflow-hidden">
          <WrestlerImage
            wrestler={wrestler}
            sizes="(max-width: 768px) 100vw, 33vw"
            className={cn(
              "h-full w-full object-cover object-top",
              "opacity-85 grayscale",
              "transition-all duration-700 ease-out",
              "group-hover:scale-[1.04]",
              "group-hover:opacity-100",
              "group-hover:grayscale-0"
            )}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

          <div className="absolute inset-0 bg-accent-red/0 transition-all duration-500 group-hover:bg-accent-red/[0.05]" />

          <CardTopMeta wrestler={wrestler} />

          <div className="absolute inset-x-0 bottom-0 z-10 min-w-0 p-5">
            <p className="mb-1 truncate font-mono text-[8px] uppercase tracking-[0.25em] text-accent-red">
              {roleLabel}
            </p>

            <h3 className="truncate font-display text-2xl font-bold uppercase leading-none tracking-tight text-white">
              {wrestler.ringName}
            </h3>

            {wrestler.nickname && (
              <p className="mt-1 truncate font-body text-sm text-white/55">
                {wrestler.nickname}
              </p>
            )}

            <div className="mt-2">
              <LocationMeta wrestler={wrestler} dark />
            </div>

            <TeamMembers wrestler={wrestler} />
          </div>

          <div className="absolute bottom-5 right-5 z-20 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-accent-red bg-black/70 font-mono text-xs text-white backdrop-blur-md">
              →
            </span>
          </div>

          <div className="pointer-events-none absolute inset-0 border border-transparent transition-colors duration-300 group-hover:border-accent-red/60" />
        </div>

        <div className="border-x border-b border-border bg-background-secondary p-4">
          <RecordStats wrestler={wrestler} />
        </div>
      </ProfileLink>
    );
  }

  /* =======================================================
     DEFAULT
     ======================================================= */

  return (
    <ProfileLink
      href={`/roster/${wrestler.id}`}
      ariaLabel={`View ${wrestler.ringName} profile`}
      className="bg-background-secondary"
    >
      <div className="relative aspect-[3/4] min-w-0 overflow-hidden">
        {/* IMAGE */}
        <WrestlerImage
          wrestler={wrestler}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className={cn(
            "h-full w-full object-cover object-top",
            "grayscale",
            "transition-all duration-700 ease-out",
            "group-hover:scale-[1.045]",
            "group-hover:grayscale-0"
          )}
        />

        {/* CINEMATIC GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

        {/* TOP DARKENING */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/45 to-transparent" />

        {/* HOVER LIGHT */}
        <div className="absolute inset-0 bg-accent-red/0 transition-all duration-500 group-hover:bg-accent-red/[0.05]" />

        {/* TOP META */}
        <CardTopMeta wrestler={wrestler} />

        {/* =================================================
            NORMAL CARD INFORMATION
            ================================================= */}

        <div
          className={cn(
            "absolute inset-x-0 bottom-0 z-20 min-w-0 p-4",
            "transition-all duration-300",
            "group-hover:translate-y-1"
          )}
        >
          {/* ROLE */}
          <p className="mb-1 truncate font-mono text-[8px] uppercase tracking-[0.22em] text-accent-red">
            {roleLabel}
          </p>

          {/* NAME */}
          <h3 className="max-w-full truncate font-display text-xl font-bold uppercase leading-none tracking-tight text-white sm:text-[22px]">
            {wrestler.ringName}
          </h3>

          {/* NICKNAME */}
          {wrestler.nickname && (
            <p className="mt-1 max-w-full truncate font-body text-xs text-white/55">
              {wrestler.nickname}
            </p>
          )}

          {/* COUNTRY */}
          <div className="mt-2">
            <LocationMeta wrestler={wrestler} dark />
          </div>

          {/* TEAM */}
          <TeamMembers wrestler={wrestler} />

          {/* BASIC STATS */}
          <div className="mt-3 border-t border-white/10 pt-3">
            <div className="flex min-w-0 items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate font-mono text-[8px] uppercase tracking-[0.12em] text-white/35">
                  {divisionLabel}
                </p>

                <p className="mt-0.5 truncate font-mono text-[9px] text-white/55">
                  {recordLabel}
                </p>
              </div>

              <div className="shrink-0 text-right">
                <p className="font-mono text-[7px] uppercase tracking-[0.12em] text-white/35">
                  Win Rate
                </p>

                <p className="mt-0.5 font-mono text-[9px] font-bold text-accent-gold">
                  {winRateLabel}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================
            HOVER STATISTICS

            Instead of putting a huge panel in the middle
            of the card, this stays inside the bottom area.
            ================================================= */}

        {showDetails && (
          <HoverStats wrestler={wrestler} />
        )}

        {/* RED ACCENT */}
        <div className="absolute bottom-0 left-0 z-40 h-[2px] w-0 bg-accent-red transition-all duration-500 group-hover:w-full" />

        {/* BORDER */}
        <div className="pointer-events-none absolute inset-0 z-40 border border-transparent transition-colors duration-300 group-hover:border-accent-red/60" />

        {/* VIEW PROFILE */}
        <span className="pointer-events-none absolute right-3 top-14 z-30 translate-x-2 rounded-sm border border-white/10 bg-black/55 px-2 py-1 font-mono text-[7px] font-bold uppercase tracking-[0.15em] text-white/80 opacity-0 backdrop-blur-md transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          View →
        </span>
      </div>
    </ProfileLink>
  );
}
