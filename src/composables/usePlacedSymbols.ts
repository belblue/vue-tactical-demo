import { ref } from "vue";

export interface PlacedSymbol {
  id: string;
  sidc: string;
  lng: number;
  lat: number;
  callsign?: string;
}

const placed = ref<PlacedSymbol[]>([]);
const armedSidc = ref<string | null>(null);

export function usePlacedSymbols() {
  function arm(sidc: string) {
    armedSidc.value = armedSidc.value === sidc ? null : sidc;
  }

  function add(symbol: Omit<PlacedSymbol, "id">) {
    placed.value.push({
      id: crypto.randomUUID(),
      ...symbol,
    });
  }

  return { placed, armedSidc, arm, add };
}
