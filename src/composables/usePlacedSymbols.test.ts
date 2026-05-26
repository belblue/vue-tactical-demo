import { describe, it, expect, beforeEach } from "vitest";
import { usePlacedSymbol } from "./usePlacedSymbols";

describe("usePlacedSymbols", () => {
  beforeEach(() => {
    const { placed, armedSidc } = usePlacedSymbol();
    placed.value = [];
    armedSidc.value = null;
  });
  it("starts with empty placed list and null armedSidc", () => {
    const { placed, armedSidc } = usePlacedSymbol();
    expect(placed.value).toEqual([]);
    expect(armedSidc.value).toBeNull();
  });
  it("arm sets armedSidc to the given value", () => {
    const { armedSidc, arm } = usePlacedSymbol();
    arm("SFGPUCI-----");
    expect(armedSidc.value).toBe("SFGPUCI-----");
  });
  it("arm with the same sidc clear armedSidc(toggle)", () => {
    const { armedSidc, arm } = usePlacedSymbol();
    arm("SFGPUCI-----");
    arm("SFGPUCI-----");
    expect(armedSidc.value).toBeNull();
  });
  it("arm with a different sidc switches armedSidc", () => {
    const { armedSidc, arm } = usePlacedSymbol();
    arm("SFGPUCI-----");
    arm("SHGPUCA-----");
    expect(armedSidc.value).toBe("SHGPUCA-----");
  });
  it("add appends a symbols with a generated id", () => {
    const { placed, add } = usePlacedSymbol();
    add({ sidc: "SFGPUCI-----", lng: -0.8891, lat: 41.6488 });
    expect(placed.value).toHaveLength(1);
    expect(placed.value[0]).toMatchObject({
      sidc: "SFGPUCI-----",
      lng: -0.8891,
      lat: 41.6488,
    });
    expect(placed.value[0].id).toEqual(expect.any(String));
  });
  it("add generates a different id for each call", () => {
    const { placed, add } = usePlacedSymbol();
    add({ sidc: "SFGPUCI-----", lng: 0, lat: 0 });
    add({ sidc: "SHGPUCA-----", lng: 1, lat: 1 });
    expect(placed.value).toHaveLength(2);
    expect(placed.value[0].id).not.toBe(placed.value[1].id);
  });
  it("state is shared across all consumers (module-level singleton)", () => {
    const a = usePlacedSymbol();
    const b = usePlacedSymbol();
    a.add({ sidc: "SFGPUCI-----", lng: 0, lat: 0 });
    expect(b.placed.value).toHaveLength(1);
  });
});
