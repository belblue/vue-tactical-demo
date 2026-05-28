import { describe, it, expect } from "vitest";
import { cotToSidc } from "./cot-to-sidc";

describe("cotToSidc", () => {
  it("maps ground-infantry friendly", () => {
    expect(cotToSidc("a-f-G-U-C-I")).toBe("SFGPUCI-----");
  });
  it("maps ground-armor hostile", () => {
    expect(cotToSidc("a-h-G-U-C-A")).toBe("SHGPUCA-----");
  });
  it("maps neutral and unkown affiliations", () => {
    expect(cotToSidc("a-n-G-U-C-I")).toBe("SNGPUCI-----");
    expect(cotToSidc("a-u-G-U-C-A")).toBe("SUGPUCA-----");
  });
  it("falls back for non-ground dimensions", () => {
    expect(cotToSidc("a-f-A-M-F-A")).toBe("SXGPU-------"); //air
    expect(cotToSidc("a-h-S-U-S-X")).toBe("SXGPU-------"); // sea surface
  });
  it("falls back for unspported ground functions", () => {
    expect(cotToSidc("a-f-G-U-C-F")).toBe("SXGPU-------"); // ground field artillery
    expect(cotToSidc("a-f-G-U-C-R")).toBe("SXGPU-------"); // ground reconnaissance
  });
  it("falls back for malformed input", () => {
    expect(cotToSidc("")).toBe("SXGPU-------");
    expect(cotToSidc("not-a-cot")).toBe("SXGPU-------");
    expect(cotToSidc("a-f")).toBe("SXGPU-------");
    expect(cotToSidc("b-f-G-U-C-I")).toBe("SXGPU-------");
  });
  it("handles longer function IDs via startWith", () => {
    expect(cotToSidc("a-f-G-U-C-I-M")).toBe("SFGPUCI-----");
  });
});
