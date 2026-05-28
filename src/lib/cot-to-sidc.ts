const FALLBACK = "SXGPU-------";

export function cotToSidc(cotType: string): string {
  if (!cotType) return FALLBACK;
  const parts = cotType.split("-");
  if (parts.length < 4 || parts[0] != "a") return FALLBACK;
  const affiliationMap: Record<string, string> = {
    f: "F",
    h: "H",
    n: "N",
    u: "U",
  };
  const affiliation = affiliationMap[parts[1]] ?? "X";

  if (parts[2] !== "G") return FALLBACK;
  const functionId = parts.slice(3).join("");

  if (functionId.startsWith("UCI")) return `S${affiliation}GPUCI-----`;
  if (functionId.startsWith("UCA")) return `S${affiliation}GPUCA-----`;

  return FALLBACK;
}
