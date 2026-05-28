import { ref } from "vue";
import { type ParsedCot, parseCot } from "../lib/cot-parse";

export function useCot() {
  const status = ref<string>("");
  const lastResult = ref<ParsedCot | null>(null);
  const error = ref<string | null>(null);

  function parse(xml: string) {
    const result = parseCot(xml);
    if (result.ok) {
      lastResult.value = result.result;
      error.value = null;

      const { uid, callsign, lat, lng } = result.result;
      const latStr = `${Math.abs(lat).toFixed(4)}${lat >= 0 ? "N" : "S"}`;
      const lngStr = `${Math.abs(lng).toFixed(4)}${lng >= 0 ? "E" : "W"}`;
      status.value = `Parsed:${callsign ?? uid} at ${latStr}, ${lngStr}`;
      return;
    }
    lastResult.value = null;
    error.value = result.error;
    status.value = `Error: ${result.error}`;
  }
  return { status, lastResult, error, parse };
}
