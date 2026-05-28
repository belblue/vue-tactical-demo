import { describe, it, expect } from "vitest";
import ms from "milsymbol";

describe("milsymbol standards diff (diagnostic)", () => {
  it("produces different SVGs for APP6 vs 2525 on a basic ground SIDC", () => {
    const sidc = "SFGPUCI-----";
    const app6 = new ms.Symbol(sidc, { size: 36, standard: "APP6" }).asSVG();
    const c2525 = new ms.Symbol(sidc, { size: 36, standard: "2525" }).asSVG();

    console.log("APP6  preview:", app6.slice(0, 200));
    console.log("2525C preview:", c2525.slice(0, 200));
    console.log("Same string?", app6 === c2525);
    console.log("Lengths:", app6.length, "vs", c2525.length);

    expect(app6).not.toBe(c2525); // ← if this fails, milsymbol IS producing identical output
  });
});
