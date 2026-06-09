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
  console.log('Search query submitted:', payload);
};
</script>

<template>
  <div class="home-view">
    <!-- Ambient Lighting & Atmospheric Depth -->
    <div class="home-bg-glow glow-teal" aria-hidden="true"></div>
    <div class="home-bg-glow glow-purple" aria-hidden="true"></div>
    <div class="home-bg-glow glow-amber" aria-hidden="true"></div>
    <div class="glass-grid-overlay" aria-hidden="true"></div>

    <TheNavbar :links="NAVIGATION_LINKS" transparent />

    <main class="main-content container">
      <!-- Hero Carousel Wrapper -->
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

      <!-- Statistics Section -->
      <section class="stats-section" aria-label="Key highlights">
        <div class="stats-grid">
          <div class="stat-card">
            <span class="stat-number">120+</span>
            <span class="stat-label">Destinations</span>
          </div>
          <div class="stat-card">
            <span class="stat-number">8,500+</span>
            <span class="stat-label">Travelers</span>
          </div>
          <div class="stat-card">
            <span class="stat-number">4.9/5</span>
            <span class="stat-label">Customer Rating</span>
          </div>
          <div class="stat-card">
            <span class="stat-number">40+</span>
            <span class="stat-label">Activities</span>
          </div>
        </div>
      </section>

      <!-- Popular Destinations Cards Section -->
      <section class="popular-destinations" aria-labelledby="popular-title">
        <header class="section-header">
          <span class="section-subtitle">— Find your next adventure</span>
          <h2 id="popular-title" class="section-title">Popular Destinations</h2>
        </header>

        <div class="destinations-grid">
          <div 
            v-for="(dest, index) in DESTINATIONS" 
            :key="dest.id" 
            :class="['dest-card', { active: currentActiveIndex === index }]"
            @click="currentActiveIndex = index"
            role="button"
            tabindex="0"
            :aria-label="`Select destination ${dest.title}`"
            @keydown.enter="currentActiveIndex = index"
          >
            <div 
              class="card-image" 
              :style="{ backgroundImage: `url(${dest.cardImageUrl || dest.imageUrl})` }"
            >
              <span class="card-badge">{{ dest.temperature }} {{ dest.weatherStatus }}</span>
            </div>
            <div class="card-info">
              <span class="card-sub">{{ dest.subtitle }}</span>
              <h3 class="card-title">{{ dest.title }}</h3>
              <p class="card-desc">{{ dest.description }}</p>
              <div class="card-footer">
                <span class="card-link">Select Destination <span class="arrow">→</span></span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>


<style scoped>
.home-view {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  padding-top: 0; /* Changed from 2.5rem to support absolute overlay navbar */
  position: relative;
  overflow: hidden;
  background-color: #030506;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-top: 6.5rem; /* Pushes content down so navbar doesn't overlay first block awkwardly */
  padding-bottom: 6rem;
  position: relative;
  z-index: 2;
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

/* Statistics Section Styles */
.stats-section {
  margin-top: 7rem; /* Clearance for the floating search panel */
  margin-bottom: 6rem;
  width: 100%;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  background-color: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 24px;
  padding: 2.25rem;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.stat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
}

.stat-card:not(:last-child)::after {
  content: '';
  position: absolute;
  right: -0.75rem;
  top: 15%;
  height: 70%;
  width: 1px;
  background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.08), transparent);
}

.stat-number {
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 800;
  background: linear-gradient(135deg, var(--color-primary) 30%, #4ae5db 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 0.2px;
}

/* Popular Destinations Section Styles */
.popular-destinations {
  margin-bottom: 4rem;
  width: 100%;
}

.section-header {
  margin-bottom: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.section-subtitle {
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.section-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 800;
  color: var(--color-white);
  letter-spacing: -0.5px;
}

.destinations-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  width: 100%;
}

.dest-card {
  background-color: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
  height: 100%;
  outline: none;
}

.dest-card:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.dest-card:hover {
  transform: translateY(-8px);
  border-color: rgba(26, 176, 166, 0.35);
  box-shadow: 0 20px 45px rgba(26, 176, 166, 0.08);
  background-color: rgba(255, 255, 255, 0.04);
}

.dest-card.active {
  border-color: var(--color-primary);
  background-color: rgba(26, 176, 166, 0.04);
  box-shadow: 0 20px 45px rgba(26, 176, 166, 0.12);
}

.card-image {
  height: 220px;
  background-size: cover;
  background-position: center;
  position: relative;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
}

.dest-card:hover .card-image {
  transform: scale(1.02);
}

.card-badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: rgba(3, 5, 6, 0.7);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  padding: 0.35rem 0.75rem;
  border-radius: var(--radius-pill);
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-white);
  letter-spacing: 0.2px;
}

.card-info {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.card-sub {
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.4);
  text-transform: uppercase;
  margin-bottom: 0.35rem;
  letter-spacing: 0.5px;
}

.card-title {
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--color-white);
  margin-bottom: 0.6rem;
}

.card-desc {
  font-family: var(--font-body);
  font-size: 0.9rem;
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 1.5rem;
  flex-grow: 1;
}

.card-footer {
  margin-top: auto;
}

.card-link {
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-primary);
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  transition: all 0.2s ease;
}

.card-link .arrow {
  transition: transform 0.25s ease;
}

.dest-card:hover .card-link {
  color: #4ae5db;
}

.dest-card:hover .card-link .arrow {
  transform: translateX(4px);
}

/* Background Glowing Ambient Styles */
.home-bg-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(140px);
  z-index: 0;
  pointer-events: none;
  opacity: 0.35; /* Softened from 0.6 for elegant ambient lighting */
}

.glow-teal {
  top: -5%;
  left: -10%;
  width: 700px;
  height: 700px;
  background-color: rgba(15, 60, 200, 0.16);
  animation: float-teal 24s ease-in-out infinite alternate;
}

.glow-purple {
  top: 35%;
  right: -15%;
  width: 600px;
  height: 600px;
  background-color: rgba(120, 20, 160, 0.12);
  animation: float-purple 28s ease-in-out infinite alternate;
}

.glow-amber {
  bottom: -5%;
  left: 10%;
  width: 650px;
  height: 650px;
  background-color: rgba(10, 120, 90, 0.1);
  animation: float-amber 26s ease-in-out infinite alternate;
}

.glass-grid-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px);
  background-size: 32px 32px;
  pointer-events: none;
  z-index: 1;
}

@keyframes float-teal {
  0% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(40px, 30px) scale(1.05); }
  100% { transform: translate(0, 0) scale(1); }
}

@keyframes float-purple {
  0% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(-30px, 40px) scale(1.08); }
  100% { transform: translate(0, 0) scale(1); }
}

@keyframes float-amber {
  0% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(30px, -30px) scale(0.95); }
  100% { transform: translate(0, 0) scale(1); }
}

/* Responsive Breakpoints */
@media (max-width: 1024px) {
  .main-content {
    padding-top: 5.5rem;
    padding-bottom: 4rem;
  }
  
  .stats-section {
    margin-top: 6rem;
    margin-bottom: 4.5rem;
  }
}

@media (max-width: 992px) {
  .destinations-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .main-content {
    padding-top: 4.5rem;
    padding-bottom: 3rem;
  }

  .search-panel-wrapper {
    position: relative;
    transform: none;
    margin-top: 2rem;
    width: 100%;
  }

  .stats-section {
    margin-top: 3rem;
    margin-bottom: 4rem;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    padding: 1.5rem;
  }

  .stat-card:not(:last-child)::after {
    display: none;
  }

  .destinations-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .popular-destinations {
    margin-bottom: 2rem;
  }
}
</style>
