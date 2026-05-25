<template>
  <footer class="footer">
    <span>Vue-tactical-demo</span>
    <a
      target="_blank"
      rel="noopener"
      href="https://github.com/belblue/vue-tactical-demo"
      >Github</a
    >
    <span class="footer__standards">APP-6D · MIL-STD-2525C · CoT · MGRS</span>
  </footer>
</template>
<style scoped lang="scss">
.footer {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  gap: var(--gap-elements);
  background-color: var(--panel);
  opacity: 0.5;
}
.footer__standards {
  color: var(--text-dim);
  font-size: 10px;
}
</style>
