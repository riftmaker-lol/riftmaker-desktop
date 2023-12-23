import { PlayerRole } from "@/types/riftmaker";

export const Lanes = [PlayerRole.TOP, PlayerRole.JUNGLE, PlayerRole.MID, PlayerRole.ADC, PlayerRole.SUPPORT] as const;

export const Ranks = [
  "IRON",
  "BRONZE",
  "SILVER",
  "GOLD",
  "PLATINUM",
  "EMERALD",
  "DIAMOND",
  "MASTER",
  "GRANDMASTER",
  "CHALLENGER",
] as const;

export const sortByRole = <T extends { role: PlayerRole | string }>(a: T, b: T) => {
  const aRole = a.role as PlayerRole;
  const bRole = b.role as PlayerRole;

  if (aRole === bRole) return 0;
  if (aRole === PlayerRole.FILL) return -1;
  if (bRole === PlayerRole.FILL) return -1;

  return Lanes.indexOf(aRole) - Lanes.indexOf(bRole);
};
