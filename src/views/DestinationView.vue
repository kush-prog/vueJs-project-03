<script setup lang="ts">
import { ref, computed } from 'vue';
import TheNavbar from '@/components/layout/TheNavbar.vue';
import TheSidebar from '@/components/layout/TheSidebar.vue';
import BaseIcon from '@/components/ui/BaseIcon.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import { NAVIGATION_LINKS, SOCIAL_LINKS, DESTINATIONS } from '@/data/mockData';

const searchQuery = ref('');
const activeWeatherFilter = ref('All');

const weatherFilters = ['All', 'Very Cold', 'Cold', 'Sunny'];

const filteredDestinations = computed(() => {
  return DESTINATIONS.filter(dest => {
    const matchesSearch = dest.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          dest.subtitle.toLowerCase().includes(searchQuery.value.toLowerCase());
    
    const matchesWeather = activeWeatherFilter.value === 'All' || 
                           dest.weatherStatus === activeWeatherFilter.value;
    
    return matchesSearch && matchesWeather;
  });
});
</script>

<template>
  <div class="destinations-view">
    <TheNavbar :links="NAVIGATION_LINKS" />

    <main class="main-content container">
      <div class="destinations-layout-wrapper">
        <header class="destinations-header">
          <span class="header-subtitle">- Explorations</span>
          <h1 class="header-title">Our Destinations</h1>
        </header>

        <div class="filters-section">
          <div class="search-box">
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Search destination..." 
              class="filter-input"
            />
            <BaseIcon name="search" size="18" color="var(--color-text-muted)" />
          </div>

          <div class="filter-group">
            <button 
              v-for="weather in weatherFilters" 
              :key="weather"
              :class="['filter-btn', { active: activeWeatherFilter === weather }]"
              @click="activeWeatherFilter = weather"
            >
              {{ weather }}
            </button>
          </div>
        </div>

        <div class="destinations-content-grid">
          <div 
            v-for="dest in filteredDestinations" 
            :key="dest.id" 
            class="dest-card"
          >
            <div 
              :class="['dest-image', { 'no-image': !dest.cardImageUrl }]"
              :style="dest.cardImageUrl ? { backgroundImage: `url(${dest.cardImageUrl})` } : {}"
            >
              <div v-if="!dest.cardImageUrl" class="no-image-placeholder">
                <BaseIcon name="pin" size="32" color="var(--color-text-muted)" />
                <span>No Image Loaded</span>
              </div>
              <div class="dest-badge">
                <span>{{ dest.temperature }} {{ dest.weatherStatus }}</span>
              </div>
            </div>
            
            <div class="dest-info">
              <span class="dest-sub">{{ dest.subtitle }}</span>
              <h3 class="dest-title">{{ dest.title }}</h3>
              <BaseButton variant="solid" class="view-btn">View Details</BaseButton>
            </div>
          </div>

          <div v-if="filteredDestinations.length === 0" class="no-results">
            <p>No destinations found matching your criteria.</p>
          </div>
        </div>

        <TheSidebar :socials="SOCIAL_LINKS" />
      </div>
    </main>
  </div>
</template>

<style scoped>
.destinations-view {
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

.destinations-layout-wrapper {
  position: relative;
  width: 100%;
}

.destinations-header {
  background-color: var(--color-bg-light);
  border-radius: var(--radius-panel);
  padding: 4rem;
  margin-bottom: 3rem;
  border: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.header-subtitle {
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-primary);
  letter-spacing: 1.5px;
  text-transform: uppercase;
}

.header-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  color: var(--color-dark);
  line-height: 1.2;
}

.filters-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 3rem;
  gap: 2rem;
  flex-wrap: wrap;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--color-bg-light);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-btn);
  padding: 0.6rem 1.2rem;
  width: 320px;
}

.filter-input {
  border: none;
  background: transparent;
  outline: none;
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--color-text-body);
  flex: 1;
}

.filter-input::placeholder {
  color: var(--color-text-muted);
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.filter-btn {
  border: 1px solid var(--color-border);
  background-color: var(--color-white);
  color: var(--color-text-body);
  padding: 0.6rem 1.2rem;
  border-radius: var(--radius-pill);
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-btn:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.filter-btn.active {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  color: var(--color-white);
}

.destinations-content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  width: 100%;
}

.dest-card {
  display: flex;
  flex-direction: column;
  background-color: var(--color-white);
  border-radius: var(--radius-panel);
  border: 1px solid var(--color-border);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.dest-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-panel);
}

.dest-image {
  height: 220px;
  background-size: cover;
  background-position: center;
  position: relative;
  padding: 1rem;
}

.dest-badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: rgba(18, 22, 25, 0.75);
  backdrop-filter: blur(4px);
  color: var(--color-white);
  padding: 0.4rem 0.8rem;
  border-radius: var(--radius-pill);
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 600;
}

.dest-info {
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.dest-sub {
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--color-text-muted);
  font-weight: 500;
  margin-bottom: 0.4rem;
}

.dest-title {
  font-family: var(--font-display);
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--color-dark);
  margin: 0 0 1.5rem 0;
}

.view-btn {
  width: 100%;
  margin-top: auto;
}

.no-results {
  grid-column: 1 / -1;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-muted);
  font-family: var(--font-body);
}

.dest-image.no-image {
  background-color: var(--color-bg-light);
}

.no-image-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: var(--color-text-muted);
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 600;
}

@media (max-width: 768px) {
  .destinations-view {
    padding-top: 1rem;
  }

  .destinations-header {
    padding: 2.5rem 1.5rem;
    margin-bottom: 2rem;
  }

  .filters-section {
    flex-direction: column;
    align-items: stretch;
    margin-bottom: 2rem;
    gap: 1rem;
  }

  .search-box {
    width: 100%;
  }

  .filter-group {
    width: 100%;
  }

  .destinations-content-grid {
    grid-template-columns: 1fr;
  }
}
</style>
