<script setup lang="ts">
import ms from "milsymbol";

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

function renderSymbol(sidc: string): string {
  return new ms.Symbol(sidc, {
    size: 18,
    standard: "APP6",
  }).asSVG();
}
</script>
<template>
  <div class="panel symbol-palette__grid">
    <button
      class="symbol-palette__btn"
      v-for="sidc in sidcs"
      :key="sidc"
      v-html="renderSymbol(sidc)"
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
  &:hover {
    border-color: var(--hover);
  }
}
</style>
