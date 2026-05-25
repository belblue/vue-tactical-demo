<script setup lang="ts">
import { useTemplateRef, onMounted, onBeforeUnmount } from "vue";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const DARK_STYLE =
  "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";

const mapRoot = useTemplateRef<HTMLDivElement>("map-root");
let map: maplibregl.Map | null = null;

onMounted(() => {
  if (!mapRoot.value) return;
  map = new maplibregl.Map({
    container: mapRoot.value, //DOM element
    style: DARK_STYLE, //map style
    center: [-0.8891, 41.6488], //lng,lat
    zoom: 10, //scale
  });
});

onBeforeUnmount(() => {
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
