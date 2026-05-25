<script setup lang="ts"></script>
<template>
  <div class="panel mgrs-readout">
    <p class="mgrs-readout__line">30TXM 12345 67890</p>
    <p class="mgrs-readout__line mgrs-readout__line--secondary">
      41.70450N, 0.70120W
    </p>
  </div>
</template>
<style scoped lang="scss">
.mgrs-readout {
  display: flex;
  flex-direction: column;
}
.mgrs-readout__line {
  font-family: var(--mono);
  padding: var(--padding-elements);
}
.mgrs-readout__line--secondary {
  color: var(--text-dim);
}
</style>
