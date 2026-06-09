<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import HomeView from './views/HomeView.vue';
import DestinationView from './views/DestinationView.vue';
import ActivitiesView from './views/ActivitiesView.vue';
import BookingsView from './views/BookingView.vue';

const currentHash = ref(window.location.hash);

const handleHashChange = () => {
  currentHash.value = window.location.hash;
};

onMounted(() => {
  window.addEventListener('hashchange', handleHashChange);
});

onUnmounted(() => {
  window.removeEventListener('hashchange', handleHashChange);
});

const activeView = computed(() => {
  if (currentHash.value === '#destination') {
    return DestinationView;
  }
  if (currentHash.value === '#activities') {
    return ActivitiesView;
  }
  if (currentHash.value === '#bookings') {
    return BookingsView;
  }
  return HomeView;
});
</script>

<template>
  <component :is="activeView" />
</template>

<style>
:root {
  --color-primary: #1ab0a6;
  --color-primary-hover: #15948c;
  --color-primary-light: #e8f7f6;
  --color-dark: #121619;
  --color-text-body: #4a4e51;
  --color-text-muted: #8e9497;
  --color-border: #e8ebec;
  --color-white: #ffffff;
  --color-bg-light: #f8f9fa;
  --font-display: 'Outfit', sans-serif;
  --font-body: 'Plus Jakarta Sans', sans-serif;
  --radius-hero: 40px;
  --radius-panel: 24px;
  --radius-btn: 12px;
  --radius-pill: 9999px;
  --shadow-panel: 0 20px 50px rgba(18, 22, 25, 0.08);
  --shadow-btn: 0 4px 12px rgba(26, 176, 166, 0.2);
  --container-max-width: 1240px;
  --container-padding: 2rem;
}
</style>
