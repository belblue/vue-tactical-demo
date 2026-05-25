<script lang="ts" setup>
import CotPanel from "./components/CotPanel.vue";
import MgrsReadout from "./components/MgrsReadout.vue";
import StandardToggle from "./components/StandardToggle.vue";
import SymbolPalette from "./components/SymbolPalette.vue";
import TacticalMap from "./components/TacticalMap.vue";
</script>

<template>
  <div class="container">
    <TacticalMap />
    <div class="overlay">
      <CotPanel class="corner corner--tl" />
      <MgrsReadout class="corner corner--tr" />
      <StandardToggle class="corner corner--bl" />
      <SymbolPalette class="corner corner--br" />
    </div>
  </div>
</template>
<style scoped lang="scss">
.container {
  position: relative;
  width: 100%;
  height: 100%;
  .overlay {
    position: absolute;
    inset: 0;
    pointer-events: none;
    .corner {
      position: absolute;
    }
    .corner--tl {
      inset: 10px auto auto 10px;
    }
    .corner--bl {
      inset: auto auto 10px 10px;
    }
    .corner--tr {
      inset: 10px 10px auto auto;
    }
    .corner--br {
      inset: auto 10px 10px auto;
    }
  }
}
</style>
