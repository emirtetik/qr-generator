<script setup lang="ts">
import {RouterView } from 'vue-router'
import QRCode from './components/QRCode.vue'
</script>

<template>
  <header>

    <div class="wrapper">
      <QRCode msg="QR Kod Dönüştürücü" />

    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
