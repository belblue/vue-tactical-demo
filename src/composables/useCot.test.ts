// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { useCot } from "./useCot";
import { SAMPLE_COT } from "../lib/sample-cot";

describe("useCot", () => {
  it("populates lastresult and clears error on successful parse", () => {
    const { lastResult, error, status, parse } = useCot();
    parse(SAMPLE_COT);
    expect(lastResult.value).not.toBeNull();
    expect(lastResult.value?.uid).toBe("ESPANA-1");
    expect(error.value).toBeNull();
    expect(status.value).toContain("Parsed:");
  });

  it("populates error and clears lastResult on failed parse", () => {
    const { status, lastResult, error, parse } = useCot();
    parse("this is not <event xml");
    expect(error.value).not.toBeNull();
    expect(lastResult.value).toBeNull();
    expect(status.value).toContain("Error:");
  });
});
