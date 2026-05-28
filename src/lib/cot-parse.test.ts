// @vitest-environment jsdom

import { describe, it, expect } from "vitest";
import { parseCot } from "./cot-parse";
import { SAMPLE_COT } from "./sample-cot";

describe("parseCot", () => {
  it("parses a complete CoT event sucessfully", () => {
    const r = parseCot(SAMPLE_COT);
    expect(r.ok).toBe(true);
    if (!r.ok) return;

    expect(r.result.uid).toBe("ESPANA-1");
    expect(r.result.sidc).toBe("SFGPUCI-----");
    expect(r.result.lat).toBeCloseTo(41.6488);
    expect(r.result.lng).toBeCloseTo(-0.8891);
    expect(r.result.callsign).toBe("ESPANA-1");
  });

  it("returns ok=false when <event> is missing", () => {
    const r = parseCot("<root><other/></root>");
    expect(r.ok).toBe(false);
    if (r.ok) return;
    expect(r.error).toBe("No <event> element");
  });
  it("returns ok=false when uid/point are missing", () => {
    const r = parseCot(
      '<event version="2.0"><point lat="0" lon="0" hae="0" ce="0" le="0"/></event>',
    );
    expect(r.ok).toBe(false);
    if (r.ok) return;
    expect(r.error).toBe("Missing uid, type, or <point>");
  });
  it("returns ok=false when lat/lng are non-numeric", () => {
    const r = parseCot(
      '<event uid="X" type="a-f-G-U-C-I"><point lat="abc" lon="xyz" hae="0" ce="0" le="0"/></event>',
    );
    expect(r.ok).toBe(false);
    if (r.ok) return;
    expect(r.error).toBe("Invalid lat/lng");
  });
});
