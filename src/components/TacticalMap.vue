<script setup lang="ts">
import { useTemplateRef, onMounted, onBeforeUnmount, watch } from "vue";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import ms from "milsymbol";
import { useMap } from "../composables/useMaps";
import { useStandard } from "../composables/useStandard";
import { usePlacedSymbols } from "../composables/usePlacedSymbols";

const { setMap } = useMap();
const { currentStandard } = useStandard();
const { placed, armedSidc, add } = usePlacedSymbols();
const DARK_STYLE =
  "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";

const mapRoot = useTemplateRef<HTMLDivElement>("map-root");
let map: maplibregl.Map | null = null;

function buildMarkerElement(sidc: string, callsign?: string): HTMLDivElement {
  const wrapper = document.createElement("div");
  wrapper.className = "tactical-marker";

  if (callsign) {
    const label = document.createElement("div");
    label.className = "tactical-marker__label";
    label.textContent = callsign;
    wrapper.appendChild(label);
  }

  const svgSlot = document.createElement("div");
  svgSlot.innerHTML = new ms.Symbol(sidc, {
    size: 32,
    standard: currentStandard.value === "APP6" ? "APP6" : "2525",
  }).asSVG();

  wrapper.appendChild(svgSlot);
  return wrapper;
}

const markers = new Map<string, maplibregl.Marker>();

onMounted(() => {
  if (!mapRoot.value) return;
  map = new maplibregl.Map({
    container: mapRoot.value, //DOM element
    style: DARK_STYLE, //map style
    center: [-0.8891, 41.6488], //lng,lat
    zoom: 10, //scale
  });
  setMap(map); //register the new instance
  map.on("click", (e) => {
    if (!armedSidc.value) return;
    add({
      sidc: armedSidc.value,
      lng: e.lngLat.lng,
      lat: e.lngLat.lat,
    });
  });
  watch(
    placed,
    (placedList) => {
      if (!map) return;
      for (const symbol of placedList) {
        if (markers.has(symbol.id)) continue;

        const el = buildMarkerElement(symbol.sidc, symbol.callsign);
        const marker = new maplibregl.Marker({ element: el })
          .setLngLat([symbol.lng, symbol.lat])
          .addTo(map);

        markers.set(symbol.id, marker);
      }
    },
    { deep: true, immediate: true },
  );
});

watch(currentStandard, (newStandard) => {
  for (const symbol of placed.value) {
    const marker = markers.get(symbol.id);
    if (!marker) continue;

    const newEl = buildMarkerElement(symbol.sidc, symbol.callsign);

    marker.getElement().replaceChildren(...newEl.children);
  }
});

onBeforeUnmount(() => {
  for (const marker of markers.values()) {
    marker.remove();
  }
  markers.clear();

  setMap(null); //unregister before tearing down
  map?.remove();
  map = null;
});
</script>
<template>
  <div ref="map-root" class="map-root" />
</template>
<style scoped lang="scss">
.map-root {
  width: 100%;
  height: 100%;
}
</style>
