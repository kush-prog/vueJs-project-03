<script setup lang="ts">
import { ref, computed } from 'vue';
import TheNavbar from '../components/layout/TheNavbar.vue';
import TheSidebar from '../components/layout/TheSidebar.vue';
import HeroBanner from '../components/destination/HeroBanner.vue';
import SearchPanel from '../components/destination/SearchPanel.vue';
import { NAVIGATION_LINKS, SOCIAL_LINKS, DESTINATIONS } from '../data/mockData';

const currentActiveIndex = ref(0);

const activeDestination = computed(() => {
  return DESTINATIONS[currentActiveIndex.value] ?? DESTINATIONS[0]!;
});

const nextSlide = () => {
  if (DESTINATIONS.length === 0) return;
  currentActiveIndex.value = (currentActiveIndex.value + 1) % DESTINATIONS.length;
};

const prevSlide = () => {
  if (DESTINATIONS.length === 0) return;
  currentActiveIndex.value = (currentActiveIndex.value - 1 + DESTINATIONS.length) % DESTINATIONS.length;
};

const handleSearch = (payload: { location: string; activity: string; date: string }) => {
  console.log(payload);
};
</script>

<template>
  <div class="home-view">
    <div class="bg-glow glow-teal"></div>
    <div class="bg-glow glow-amber"></div>

    <TheNavbar :links="NAVIGATION_LINKS" />

    <main class="main-content container">
      <div class="hero-section-wrapper">
        <HeroBanner 
          :destination="activeDestination" 
          @prev="prevSlide" 
          @next="nextSlide" 
        />
        
        <div class="search-panel-wrapper">
          <SearchPanel @search="handleSearch" />
        </div>

        <TheSidebar :socials="SOCIAL_LINKS" />
      </div>
    </main>
  </div>
</template>


<style scoped>
.home-view {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  padding-top: 2.5rem;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-top: 1.5rem;
  padding-bottom: 6rem;
}

.hero-section-wrapper {
  position: relative;
  width: 100%;
}

.search-panel-wrapper {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  transform: translateY(50%);
  z-index: 10;
}

@media (max-width: 1024px) {
  .main-content {
    padding-bottom: 4rem;
  }
}

@media (max-width: 768px) {
  .main-content {
    padding-top: 1rem;
    padding-bottom: 3rem;
  }

  .search-panel-wrapper {
    position: relative;
    transform: none;
    margin-top: 2rem;
    width: 100%;
  }
}

.bg-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(130px);
  z-index: 0;
  pointer-events: none;
  opacity: 0.55;
}

.glow-teal {
  top: 10%;
  left: -100px;
  width: 450px;
  height: 450px;
  background-color: var(--color-primary);
}

.glow-amber {
  bottom: 15%;
  right: -100px;
  width: 400px;
  height: 400px;
  background-color: #f5a623;
}
</style>
