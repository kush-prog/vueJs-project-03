<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import HomeView from './views/HomeView.vue';
import DestinationView from './views/DestinationView.vue';
import ActivitiesView from './views/ActivitiesView.vue';
import BookingsView from './views/BookingView.vue';
import LoginView from './views/LoginView.vue';
import SignupView from './views/SignupView.vue';

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
  if (currentHash.value === '#login') {
    return LoginView;
  }
  if (currentHash.value === '#signup') {
    return SignupView;
  }
  return HomeView;
});
</script>

<template>
  <div class="app-layout">
    <div v-if="activeView !== HomeView" class="bg-glow glow-teal"></div>
    <div v-if="activeView !== HomeView" class="bg-glow glow-amber"></div>
    <component :is="activeView" />
  </div>
</template>

<style>
:root {
  --color-primary: #1ab0a6;
  --color-primary-hover: #15948c;
  --color-primary-light: rgba(26, 176, 166, 0.12);
  --color-dark: #ffffff;
  --color-text-body: #cbd5e1;
  --color-text-muted: #64748b;
  --color-border: rgba(255, 255, 255, 0.05);
  --color-white: #ffffff;
  --color-bg-light: rgba(255, 255, 255, 0.02);
  --font-display: 'Outfit', sans-serif;
  --font-body: 'Plus Jakarta Sans', sans-serif;
  --radius-hero: 40px;
  --radius-panel: 24px;
  --radius-btn: 12px;
  --radius-pill: 9999px;
  --shadow-panel: 0 20px 50px rgba(0, 0, 0, 0.5);
  --shadow-btn: 0 4px 12px rgba(26, 176, 166, 0.2);
  --container-max-width: 1240px;
  --container-padding: 2rem;
}
</style>
