<script lang="ts" setup></script>
<template>
  <div class="standard-toggle" aria-label="Symbology standard">
    <button class="standard-toggle__btn" aria-pressed="true">APP-6D</button>
    <button class="standard-toggle__btn" aria-pressed="false">2525C</button>
  </div>
</template>
<style scoped lang="scss">
.standard-toggle {
  display: inline-flex;
  border: 1px solid var(--panel-border);
  border-radius: var(--border-radius);
  overflow: hidden;
}
.standard-toggle__btn {
  background: transparent;
  border: none;
  color: var(--text-dim);
  padding: 6px 14px;
  cursor: pointer;
  font: inherit;
  &:not(:last-child) {
    border-right: 1px solid var(--panel-border);
  }

  &:hover {
    color: var(--text);
  }
  &[aria-pressed="true"] {
    color: var(--accent);
  }
}
</style>
