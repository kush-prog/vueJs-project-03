<script setup lang="ts">
import { ref, computed } from 'vue';
import TheNavbar from '@/components/layout/TheNavbar.vue';
import BaseIcon from '@/components/ui/BaseIcon.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import { NAVIGATION_LINKS, SOCIAL_LINKS, DESTINATIONS } from '@/data/mockData';

const searchQuery = ref('');
const activeWeatherFilter = ref('All');

const weatherFilters = [
  { label: 'All', icon: '🌎' },
  { label: 'Very Cold', icon: '❄️' },
  { label: 'Cold', icon: '❄️' },
  { label: 'Sunny', icon: '☀️' }
];

const filteredDestinations = computed(() => {
  return DESTINATIONS.filter(dest => {
    const matchesSearch = dest.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          dest.subtitle.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          dest.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          dest.location.toLowerCase().includes(searchQuery.value.toLowerCase());
    
    const matchesWeather = activeWeatherFilter.value === 'All' || 
                           dest.weatherStatus === activeWeatherFilter.value;
    
    return matchesSearch && matchesWeather;
  });
});

const featuredDestination = computed(() => {
  return DESTINATIONS.find(d => d.isFeatured) || DESTINATIONS[0]!;
});

const handleBook = (id: string) => {
  window.location.hash = `#bookings`;
};

const clearSearch = () => {
  searchQuery.value = '';
  activeWeatherFilter.value = 'All';
};
</script>

<template>
  <div class="destinations-view">
    <!-- Ambient Background Atmospheric Glows -->
    <div class="ambient-glow glow-cyan" aria-hidden="true"></div>
    <div class="ambient-glow glow-indigo" aria-hidden="true"></div>
    <div class="ambient-glow glow-orange" aria-hidden="true"></div>

    <TheNavbar :links="NAVIGATION_LINKS" />

    <main class="main-content container">
      <!-- Premium Hero Header -->
      <header class="destinations-hero">
        <div class="hero-content">
          <span class="hero-pretitle">— Discovery</span>
          <h1 class="hero-title">Explore the World's Most Breathtaking Destinations</h1>
          <p class="hero-desc">
            From Himalayan peaks to tropical lagoons, discover unforgettable adventures tailored for every traveler. 
            Begin your journey today.
          </p>
        </div>
      </header>

      <!-- Dashboard Statistics Strip -->
      <section class="stats-strip" aria-label="Statistics Summary">
        <div class="stats-card">
          <div class="stat-item">
            <span class="stat-number">120+</span>
            <span class="stat-label">Destinations</span>
          </div>
          <div class="stat-divider" aria-hidden="true"></div>
          <div class="stat-item">
            <span class="stat-number">8,500+</span>
            <span class="stat-label">Travelers</span>
          </div>
          <div class="stat-divider" aria-hidden="true"></div>
          <div class="stat-item">
            <span class="stat-number">40+</span>
            <span class="stat-label">Experiences</span>
          </div>
          <div class="stat-divider" aria-hidden="true"></div>
          <div class="stat-item">
            <span class="stat-number">4.9 ★</span>
            <span class="stat-label">Average Rating</span>
          </div>
        </div>
      </section>

      <!-- Featured Destination Section -->
      <section class="featured-section" aria-labelledby="featured-label">
        <h2 id="featured-label" class="section-title">Featured Adventure</h2>
        
        <div class="featured-card">
          <div 
            class="featured-image" 
            :style="{ backgroundImage: `url(${featuredDestination.imageUrl})` }"
          >
            <div class="featured-badge">Featured Trek</div>
          </div>
          <div class="featured-info">
            <div class="featured-meta-top">
              <span class="featured-loc">
                <BaseIcon name="pin" size="14" color="var(--color-primary)" />
                {{ featuredDestination.location }}
              </span>
              <span class="featured-rating">
                ★ {{ featuredDestination.rating }} (Premium Rating)
              </span>
            </div>
            
            <h3 class="featured-title">{{ featuredDestination.title }}</h3>
            <p class="featured-description">{{ featuredDestination.description }}</p>
            
            <div class="featured-specs-grid">
              <div class="spec-card">
                <span class="spec-lbl">Duration</span>
                <span class="spec-val">{{ featuredDestination.duration }}</span>
              </div>
              <div class="spec-card">
                <span class="spec-lbl">Difficulty</span>
                <span class="spec-val text-hard">{{ featuredDestination.difficulty }}</span>
              </div>
              <div class="spec-card">
                <span class="spec-lbl">Best Season</span>
                <span class="spec-val">{{ featuredDestination.bestSeason }}</span>
              </div>
              <div class="spec-card">
                <span class="spec-lbl">Activities</span>
                <span class="spec-val">{{ featuredDestination.activitiesCount }} Activities</span>
              </div>
            </div>

            <div class="featured-action-bar">
              <BaseButton variant="solid" class="featured-btn" @click="handleBook(featuredDestination.id)">
                Book This Experience
              </BaseButton>
            </div>
          </div>
        </div>
      </section>

      <!-- Interactive Search & Filtering -->
      <section class="search-filter-section" aria-label="Destinations search and filter">
        <div class="search-filter-layout">
          <!-- Glassmorphic Search Bar -->
          <div class="search-box">
            <BaseIcon name="search" size="18" color="rgba(255, 255, 255, 0.4)" class="search-box-icon" />
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Search by title, location, description..." 
              class="filter-input"
              aria-label="Search destinations"
            />
            <button 
              v-if="searchQuery" 
              class="clear-search-btn" 
              @click="searchQuery = ''"
              aria-label="Clear search text"
            >
              ×
            </button>
          </div>

          <!-- Glassmorphic Filter Chips -->
          <div class="filter-group" role="group" aria-label="Filter by climate">
            <button 
              v-for="weather in weatherFilters" 
              :key="weather.label"
              :class="['filter-btn', { active: activeWeatherFilter === weather.label }]"
              @click="activeWeatherFilter = weather.label"
            >
              <span class="btn-icon">{{ weather.icon }}</span>
              <span class="btn-label">{{ weather.label }}</span>
            </button>
          </div>
        </div>
      </section>

      <!-- Destination Card Grid -->
      <section class="grid-section" aria-label="Destinations grid">
        <div class="destinations-layout-wrapper">
          <div class="destinations-content-grid" v-if="filteredDestinations.length > 0">
            <div 
              v-for="(dest, index) in filteredDestinations" 
              :key="dest.id" 
              class="dest-card"
              :style="{ animationDelay: `${index * 0.1}s` }"
              role="article"
            >
              <!-- Card Image with Zoom -->
              <div class="card-image-wrapper">
                <div 
                  class="dest-image"
                  :style="{ backgroundImage: `url(${dest.cardImageUrl || dest.imageUrl})` }"
                >
                  <div class="dest-badge">
                    <span>{{ dest.temperature }} • {{ dest.weatherStatus }}</span>
                  </div>
                </div>
              </div>
              
              <!-- Card Content Details -->
              <div class="dest-info">
                <div class="dest-meta-header">
                  <span class="dest-loc">
                    <BaseIcon name="pin" size="13" color="var(--color-primary)" />
                    {{ dest.location }}
                  </span>
                  <span class="dest-stars">
                    ★ {{ dest.rating }}
                  </span>
                </div>
                
                <h3 class="dest-title">{{ dest.title }}</h3>
                <p class="dest-desc">{{ dest.description }}</p>

                <div class="dest-specs-mini">
                  <span class="mini-spec">🧭 {{ dest.activitiesCount }} Activities</span>
                  <span class="mini-spec">📅 {{ dest.bestSeason }}</span>
                </div>
                
                <div class="card-action-bar">
                  <BaseButton variant="solid" class="view-btn" @click="handleBook(dest.id)">
                    Book Experience
                  </BaseButton>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="no-results">
            <div class="no-results-card">
              <BaseIcon name="pin" size="48" color="rgba(255, 255, 255, 0.2)" />
              <h3>No Destinations Found</h3>
              <p>We couldn't find any locations matching your filters or search terms.</p>
              <BaseButton variant="solid" class="reset-btn" @click="clearSearch">Reset Filters</BaseButton>
            </div>
          </div>

          <!-- Premium Vertical Floating Social Dock -->
          <aside class="social-dock" aria-label="Social networks">
            <div class="dock-rail">
              <a 
                v-for="social in SOCIAL_LINKS" 
                :key="social.name"
                :href="social.url"
                target="_blank"
                rel="noopener noreferrer"
                class="dock-link"
              >
                {{ social.name }}
              </a>
            </div>
          </aside>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.destinations-view {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  padding-top: 0;
  position: relative;
  overflow: hidden;
  background-color: #030506;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-top: 6.5rem;
  padding-bottom: 6rem;
  position: relative;
  z-index: 2;
}

.destinations-layout-wrapper {
  position: relative;
  width: 100%;
}

/* Ambient Lighting Glows */
.ambient-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(140px);
  z-index: 0;
  pointer-events: none;
  opacity: 0.2;
}

.glow-cyan {
  top: 5%;
  left: -10%;
  width: 650px;
  height: 650px;
  background-color: rgba(26, 176, 166, 0.15);
}

.glow-indigo {
  top: 45%;
  right: -10%;
  width: 600px;
  height: 600px;
  background-color: rgba(30, 45, 180, 0.12);
}

.glow-orange {
  bottom: 5%;
  left: 20%;
  width: 550px;
  height: 550px;
  background-color: rgba(245, 158, 11, 0.08);
}

/* Premium Hero Header */
.destinations-hero {
  background-color: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: var(--radius-hero);
  padding: 5rem 4rem;
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;
  box-shadow: 
    0 30px 60px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  display: flex;
  align-items: center;
}

.hero-content {
  max-width: 780px;
  position: relative;
  z-index: 2;
}

.hero-pretitle {
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--color-primary);
  letter-spacing: 2px;
  text-transform: uppercase;
  display: inline-block;
  margin-bottom: 0.75rem;
}

.hero-title {
  font-family: var(--font-display);
  font-size: clamp(2.25rem, 5vw, 3.5rem);
  font-weight: 800;
  line-height: 1.15;
  color: var(--color-white);
  margin-bottom: 1.25rem;
  letter-spacing: -0.5px;
  text-shadow: 0 4px 20px rgba(0,0,0,0.4);
}

.hero-desc {
  font-family: var(--font-body);
  font-size: 1.1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 400;
}

/* Dashboard Statistics Strip */
.stats-strip {
  margin-bottom: 4rem;
  width: 100%;
}

.stats-card {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  background-color: rgba(255, 255, 255, 0.01);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 20px;
  padding: 1.75rem;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.stat-number {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 2.5vw, 2.25rem);
  font-weight: 800;
  background: linear-gradient(135deg, var(--color-primary) 30%, #4ae5db 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 0.2px;
}

.stat-divider {
  width: 1px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.08);
  align-self: center;
  justify-self: center;
}

/* Featured Section */
.featured-section {
  margin-bottom: 4rem;
  width: 100%;
}

.section-title {
  font-family: var(--font-display);
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--color-white);
  margin-bottom: 1.5rem;
  letter-spacing: -0.3px;
}

.featured-card {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  background-color: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 25px 55px rgba(0,0,0,0.4);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: border-color 0.3s ease;
}

.featured-card:hover {
  border-color: rgba(26, 176, 166, 0.35);
}

.featured-image {
  background-size: cover;
  background-position: center;
  min-height: 380px;
  position: relative;
}

.featured-badge {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  background-color: var(--color-primary);
  color: var(--color-white);
  padding: 0.45rem 1rem;
  border-radius: var(--radius-pill);
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 4px 12px rgba(26, 176, 166, 0.4);
}

.featured-info {
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.featured-meta-top {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1rem;
}

.featured-loc {
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}

.featured-rating {
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 600;
  color: #fbbf24;
}

.featured-title {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 800;
  color: var(--color-white);
  margin-bottom: 1rem;
  line-height: 1.2;
}

.featured-description {
  font-family: var(--font-body);
  font-size: 0.95rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.65);
  margin-bottom: 2rem;
}

.featured-specs-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
  margin-bottom: 2.25rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  padding-top: 1.5rem;
}

.spec-card {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.spec-lbl {
  font-family: var(--font-body);
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.4);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.spec-val {
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-white);
}

.text-hard {
  color: #ef4444 !important;
}

.featured-action-bar {
  margin-top: auto;
}

.featured-btn {
  padding: 0.8rem 2rem !important;
  font-weight: 600;
  box-shadow: 0 4px 14px rgba(26, 176, 166, 0.35);
}

.featured-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(26, 176, 166, 0.5);
}

/* Interactive Search & Filtering */
.search-filter-section {
  margin-bottom: 3rem;
  width: 100%;
}

.search-filter-layout {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background-color: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-btn);
  padding: 0.65rem 1.2rem;
  width: 380px;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
  position: relative;
}

.search-box:focus-within {
  border-color: var(--color-primary);
  box-shadow: 
    0 0 0 2px rgba(26, 176, 166, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  background-color: rgba(255, 255, 255, 0.04);
}

.search-box-icon {
  flex-shrink: 0;
}

.filter-input {
  border: none;
  background: transparent;
  outline: none;
  font-family: var(--font-body);
  font-size: 0.95rem;
  color: var(--color-white);
  flex: 1;
}

.filter-input::placeholder {
  color: rgba(255, 255, 255, 0.35);
}

.clear-search-btn {
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.4);
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0 0.25rem;
  display: flex;
  align-items: center;
  transition: color 0.2s;
}

.clear-search-btn:hover {
  color: var(--color-white);
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.filter-btn {
  border: 1px solid rgba(255, 255, 255, 0.06);
  background-color: rgba(255, 255, 255, 0.01);
  color: rgba(255, 255, 255, 0.7);
  padding: 0.6rem 1.2rem;
  border-radius: var(--radius-pill);
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.filter-btn:hover {
  border-color: rgba(255, 255, 255, 0.15);
  color: var(--color-white);
  background-color: rgba(255, 255, 255, 0.04);
  transform: translateY(-1px);
}

.filter-btn.active {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  color: var(--color-white);
  box-shadow: 0 4px 14px rgba(26, 176, 166, 0.3);
}

/* Card Grid Layout */
.destinations-content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 2.25rem;
  width: 100%;
}

.dest-card {
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  animation: fadeInUp 0.6s ease backwards;
}

.dest-card:hover {
  transform: translateY(-8px);
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.4),
    0 0 30px rgba(26, 176, 166, 0.06);
  border-color: rgba(26, 176, 166, 0.3);
  background-color: rgba(255, 255, 255, 0.03);
}

.card-image-wrapper {
  overflow: hidden;
  width: 100%;
  height: 230px;
  position: relative;
}

.dest-image {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.dest-card:hover .dest-image {
  transform: scale(1.05);
}

.dest-badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: rgba(3, 5, 6, 0.7);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  color: var(--color-white);
  padding: 0.35rem 0.75rem;
  border-radius: var(--radius-pill);
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 600;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.dest-info {
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.dest-meta-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.dest-loc {
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.dest-stars {
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 600;
  color: #fbbf24;
}

.dest-title {
  font-family: var(--font-display);
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--color-white);
  margin: 0 0 0.75rem 0;
  line-height: 1.25;
}

.dest-desc {
  font-family: var(--font-body);
  font-size: 0.9rem;
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 1.25rem;
  flex: 1;
}

.dest-specs-mini {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding-top: 1rem;
  margin-bottom: 1.5rem;
}

.mini-spec {
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.45);
}

.card-action-bar {
  margin-top: auto;
  width: 100%;
}

.view-btn {
  width: 100%;
  font-weight: 600;
  font-size: 0.95rem;
  background-color: transparent !important;
  border: 1px solid rgba(26, 176, 166, 0.4) !important;
  color: var(--color-primary) !important;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

.dest-card:hover .view-btn {
  background-color: var(--color-primary) !important;
  color: var(--color-white) !important;
  border-color: var(--color-primary) !important;
  box-shadow: 0 6px 16px rgba(26, 176, 166, 0.25);
  transform: translateY(-1px);
}

/* Empty State Styles */
.no-results {
  width: 100%;
  padding: 4rem 1rem;
  display: flex;
  justify-content: center;
}

.no-results-card {
  max-width: 480px;
  width: 100%;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.01);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 20px;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.no-results-card h3 {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-white);
}

.no-results-card p {
  font-family: var(--font-body);
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.5;
  margin-bottom: 0.5rem;
}

.reset-btn {
  padding: 0.65rem 1.5rem !important;
}

/* Premium Vertical Social Dock */
.social-dock {
  position: absolute;
  right: -8rem;
  top: 15rem;
  z-index: 10;
}

.dock-rail {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: sticky;
  top: 15rem;
}

.dock-link {
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.35);
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 2px;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  transition: all 0.3s ease;
  padding: 0.5rem;
}

.dock-link:hover {
  color: var(--color-primary);
  text-shadow: 0 0 8px rgba(26, 176, 166, 0.4);
  transform: rotate(180deg) translateY(4px);
}

/* Scroll Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Rules */
@media (max-width: 1240px) {
  .social-dock {
    display: none;
  }
}

@media (max-width: 1024px) {
  .destinations-hero {
    padding: 4rem 2.5rem;
  }
  
  .featured-card {
    grid-template-columns: 1fr;
  }
  
  .featured-image {
    min-height: 280px;
  }
  
  .featured-info {
    padding: 2.25rem;
  }
}

@media (max-width: 768px) {
  .main-content {
    padding-top: 4.5rem;
    padding-bottom: 4rem;
  }
  
  .destinations-hero {
    padding: 3rem 1.5rem;
    margin-bottom: 1.5rem;
  }
  
  .stats-card {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
    padding: 1.25rem;
  }
  
  .stat-divider {
    display: none;
  }
  
  .featured-section {
    margin-bottom: 3rem;
  }
  
  .featured-info {
    padding: 1.5rem;
  }
  
  .featured-title {
    font-size: 1.6rem;
  }
  
  .search-filter-layout {
    flex-direction: column;
    align-items: stretch;
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
    gap: 1.5rem;
  }
}
</style>
