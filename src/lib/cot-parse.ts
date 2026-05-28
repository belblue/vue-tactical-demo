import { cotToSidc } from "./cot-to-sidc";

export interface ParsedCot {
  uid: string;
  sidc: string;
  lat: number;
  lng: number;
  callsign?: string;
}

export type CotParseResult =
  | { ok: true; result: ParsedCot }
  | { ok: false; error: string };

export function parseCot(xml: string): CotParseResult {
  const doc = new DOMParser().parseFromString(xml, "text/xml");

  if (doc.querySelector("parsererror")) {
    return { ok: false, error: "Malformed XML" };
  }
  const event = doc.querySelector("event");
  if (!event) return { ok: false, error: "No <event> element" };
  const uid = event.getAttribute("uid");
  const type = event.getAttribute("type");
  const point = event.querySelector("point");

  if (!uid || !type || !point) {
    return { ok: false, error: "Missing uid, type, or <point>" };
  }

  const lat = parseFloat(point.getAttribute("lat") ?? "");
  const lng = parseFloat(point.getAttribute("lon") ?? "");

  if (Number.isNaN(lat) || Number.isNaN(lng)) {
    return { ok: false, error: "Invalid lat/lng" };
  }
  const callsign =
    event.querySelector("contact")?.getAttribute("callsign") ?? undefined;

  return {
    ok: true,
    result: {
      uid,
      sidc: cotToSidc(type),
      lat,
      lng,
      callsign,
    },
  };
}
