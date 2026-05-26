import { ref } from "vue";

export interface PlacedSymbols {
  id: string;
  sidc: string;
  lng: number;
  lat: number;
  callsign?: string;
}

const placed = ref<PlacedSymbols[]>([]);
const armedSidc = ref<string | null>(null);

export function usePlacedSymbol() {
  function arm(sidc: string) {
    armedSidc.value = armedSidc.value === sidc ? null : sidc;
  }

  function add(symbol: Omit<PlacedSymbols, "id">) {
    placed.value.push({
      id: crypto.randomUUID(),
      ...symbol,
    });
  }

  return { placed, armedSidc, arm, add };
}
