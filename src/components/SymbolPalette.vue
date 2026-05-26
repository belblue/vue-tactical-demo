<script setup lang="ts">
import ms from "milsymbol";
import { useStandard } from "../composables/useStandard";
import { ref, computed } from "vue";

const { currentStandard } = useStandard();

const sidcs = [
  "SFGPUCI-----", // friendly infantry
  "SHGPUCI-----", // hostile  infantry
  "SFGPUCA-----", // friendly armor
  "SHGPUCA-----", // hostile  armor
  "SFGPUCF-----", // friendly field artillery
  "SHGPUCF-----", // hostile  field artillery
  "SFGPUCR-----", // friendly reconnaissance
  "SHGPUCR-----", // hostile  reconnaissance
];

const renderedSymbols = computed(() =>
  sidcs.map((sidc) => ({
    sidc: sidc,
    svg: new ms.Symbol(sidc, {
      size: 18,
      standard: currentStandard.value === "APP6" ? "APP6" : "2525",
    }).asSVG(),
  })),
);
const armed = ref<string | null>(null);

function arm(sidc: string): void {
  armed.value = armed.value === sidc ? null : sidc;
}
</script>
<template>
  <div class="panel interactive symbol-palette__grid">
    <button
      class="symbol-palette__btn"
      v-for="{ sidc, svg } in renderedSymbols"
      :key="sidc"
      v-html="svg"
      @click="arm(sidc)"
      :aria-pressed="armed === sidc"
    />
  </div>
</template>
<style scoped lang="scss">
.symbol-palette__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--gap-elements);
}
.symbol-palette__btn {
  background-color: transparent;
  border: 1px solid var(--panel-border);
  border-radius: var(--border-radius);
  padding: var(--padding-elements);
  cursor: pointer;
  &[aria-pressed="true"] {
    border-color: var(--accent);
    background: var(--accent-bg);
  }
}
</style>
