<script setup lang="ts">
import { ref, computed } from 'vue';
import TheNavbar from '@/components/layout/TheNavbar.vue';
import BaseIcon from '@/components/ui/BaseIcon.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import { NAVIGATION_LINKS, SOCIAL_LINKS } from '@/data/mockData';

interface Activity {
  id: string;
  title: string;
  subtitle: string;
  rating: string;
  reviewsCount: number;
  location: string;
  category: string;
  duration: string;
  difficulty: string;
  groupSize: string;
  price: string;
  imageUrl: string;
  isTrending?: boolean;
  isFeatured?: boolean;
}

const searchQuery = ref('');
const selectedCategory = ref('All');
const wishlist = ref<string[]>([]);

const categories = ['All', 'Hiking', 'Water Sports', 'Extreme Sports', 'Camping', 'Adventure Tours'];

const ACTIVITIES: Activity[] = [
  {
    id: '1',
    title: 'Bungee Jumping Nepal',
    subtitle: 'Thrills & Free Falls',
    rating: '4.9',
    reviewsCount: 412,
    location: 'Bhote Koshi, Nepal',
    category: 'Extreme Sports',
    duration: '3 Hours',
    difficulty: 'Extreme',
    groupSize: 'Up to 6 Guests',
    price: '$120',
    imageUrl: 'https://images.unsplash.com/photo-1569476535555-520e5c94e0e8?q=80&w=800&auto=format&fit=crop',
    isTrending: true,
    isFeatured: false
  },
  {
    id: '2',
    title: 'Mountain Trekking',
    subtitle: 'Alpine Glaciers & Slopes',
    rating: '4.8',
    reviewsCount: 850,
    location: 'Annapurna, Nepal',
    category: 'Hiking',
    duration: '2 Days',
    difficulty: 'Hard',
    groupSize: 'Up to 12 Guests',
    price: '$250',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop',
    isTrending: true,
    isFeatured: false
  },
  {
    id: '3',
    title: 'River Rafting',
    subtitle: 'Whitewater Rapids Challenge',
    rating: '4.7',
    reviewsCount: 298,
    location: 'Trishuli River, Nepal',
    category: 'Water Sports',
    duration: '5 Hours',
    difficulty: 'Moderate',
    groupSize: 'Up to 10 Guests',
    price: '$95',
    imageUrl: 'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?q=80&w=800&auto=format&fit=crop',
    isTrending: false,
    isFeatured: false
  },
  {
    id: '4',
    title: 'Hot Air Ballooning',
    subtitle: 'High Altitude Lagoon Flights',
    rating: '4.9',
    reviewsCount: 154,
    location: 'Pokhara, Nepal',
    category: 'Adventure Tours',
    duration: '2 Hours',
    difficulty: 'Easy',
    groupSize: 'Up to 8 Guests',
    price: '$180',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop',
    isTrending: true,
    isFeatured: false
  },
  {
    id: '5',
    title: 'Everest Helicopter Tour',
    subtitle: 'High-Altitude Luxury Flight',
    rating: '5.0',
    reviewsCount: 1250,
    location: 'Mt. Everest, Nepal',
    category: 'Extreme Sports',
    duration: '4 Hours',
    difficulty: 'Easy',
    groupSize: 'Up to 5 Guests',
    price: '$950',
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop',
    isTrending: false,
    isFeatured: true
  },
  {
    id: '6',
    title: 'Wilderness Camping Expedition',
    subtitle: 'Off-grid forest isolation',
    rating: '4.8',
    reviewsCount: 180,
    location: 'Langtang, Nepal',
    category: 'Camping',
    duration: '3 Days',
    difficulty: 'Moderate',
    groupSize: 'Up to 8 Guests',
    price: '$150',
    imageUrl: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=800&auto=format&fit=crop',
    isTrending: false,
    isFeatured: false
  }
];

const filteredActivities = computed(() => {
  return ACTIVITIES.filter(act => {
    if (act.isFeatured) return false; // Hide featured from the main list as it is shown at the top!
    const matchesSearch = act.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          act.location.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          act.subtitle.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          act.category.toLowerCase().includes(searchQuery.value.toLowerCase());
    
    const matchesCategory = selectedCategory.value === 'All' || act.category === selectedCategory.value;
    
    return matchesSearch && matchesCategory;
  });
});

const featuredActivity = computed(() => {
  return (ACTIVITIES.find(act => act.isFeatured) || ACTIVITIES[4])!;
});

const trendingActivities = computed(() => {
  return ACTIVITIES.filter(act => act.isTrending);
});

const toggleWishlist = (id: string) => {
  if (wishlist.value.includes(id)) {
    wishlist.value = wishlist.value.filter(item => item !== id);
  } else {
    wishlist.value.push(id);
  }
};

const handleBook = () => {
  window.location.hash = '#bookings';
};

const clearFilters = () => {
  searchQuery.value = '';
  selectedCategory.value = 'All';
};
</script>

<template>
  <div class="activities-view">
    <!-- Ambient Background Atmospheric Glows -->
    <div class="ambient-glow glow-cyan" aria-hidden="true"></div>
    <div class="ambient-glow glow-indigo" aria-hidden="true"></div>

    <TheNavbar :links="NAVIGATION_LINKS" />

    <main class="main-content container">
      <div class="activities-layout-wrapper">
        
        <!-- Premium Activities Hero Banner -->
        <header class="activities-hero">
          <div class="hero-content">
            <span class="hero-pretitle">Adventure Experiences</span>
            <h1 class="hero-title">Discover Unforgettable Adventures</h1>
            <p class="hero-desc">
              Explore handpicked activities, guided tours, and once-in-a-lifetime experiences across the world's most breathtaking destinations.
            </p>
            
            <div class="hero-trust-indicators">
              <span class="indicator">🧭 25+ Experiences</span>
              <span class="indicator-divider" aria-hidden="true">•</span>
              <span class="indicator">🌎 12+ Destinations</span>
              <span class="indicator-divider" aria-hidden="true">•</span>
              <span class="indicator">✓ Verified Guides</span>
            </div>
          </div>
        </header>

        <!-- Dashboard Statistics Strip -->
        <section class="stats-strip" aria-label="Activities statistics summary">
          <div class="stats-card">
            <div class="stat-item">
              <span class="stat-number">500+</span>
              <span class="stat-label">Booked Experiences</span>
            </div>
            <div class="stat-divider" aria-hidden="true"></div>
            <div class="stat-item">
              <span class="stat-number">120+</span>
              <span class="stat-label">Adventure Spots</span>
            </div>
            <div class="stat-divider" aria-hidden="true"></div>
            <div class="stat-item">
              <span class="stat-number">8,500+</span>
              <span class="stat-label">Happy Explorers</span>
            </div>
            <div class="stat-divider" aria-hidden="true"></div>
            <div class="stat-item">
              <span class="stat-number">4.9 ★</span>
              <span class="stat-label">Average Reviews</span>
            </div>
          </div>
        </section>

        <!-- Search & Category Filters -->
        <section class="search-category-section" aria-label="Search and category selection">
          <div class="search-category-layout">
            <!-- Glassmorphic Search Bar -->
            <div class="search-box">
              <BaseIcon name="search" size="18" color="rgba(255, 255, 255, 0.4)" />
              <input 
                type="text" 
                v-model="searchQuery" 
                placeholder="Search activities, locations, guides, or experiences..." 
                class="filter-input"
                aria-label="Search activities"
              />
              <button 
                v-if="searchQuery" 
                class="clear-search-btn" 
                @click="searchQuery = ''"
                aria-label="Clear search"
              >
                ×
              </button>
            </div>

            <!-- Category Filter Pills Scroller -->
            <div class="category-scroller-container">
              <div class="category-scroller" role="tablist" aria-label="Filter experiences by type">
                <button 
                  v-for="cat in categories" 
                  :key="cat"
                  :class="['category-pill', { active: selectedCategory === cat }]"
                  @click="selectedCategory = cat"
                  role="tab"
                  :aria-selected="selectedCategory === cat"
                >
                  {{ cat }}
                </button>
              </div>
            </div>
          </div>
        </section>

        <!-- Trending Experiences Carousel -->
        <section class="trending-section" aria-labelledby="trending-title">
          <h2 id="trending-title" class="section-title">Trending This Month</h2>
          <div class="carousel-rail-container">
            <div class="carousel-rail">
              <div 
                v-for="act in trendingActivities" 
                :key="'trending-' + act.id"
                class="carousel-card"
                role="listitem"
              >
                <div class="carousel-card-img" :style="{ backgroundImage: `url(${act.imageUrl})` }">
                  <span class="trending-badge">Hot</span>
                  <button 
                    class="wishlist-heart-btn"
                    :class="{ active: wishlist.includes(act.id) }"
                    @click.stop="toggleWishlist(act.id)"
                    :aria-label="wishlist.includes(act.id) ? 'Remove from wishlist' : 'Add to wishlist'"
                  >
                    ♥
                  </button>
                </div>
                <div class="carousel-card-info">
                  <span class="carousel-card-cat">{{ act.category }}</span>
                  <h3 class="carousel-card-title">{{ act.title }}</h3>
                  <div class="carousel-card-footer">
                    <span class="carousel-card-price">{{ act.price }}</span>
                    <BaseButton variant="text" class="carousel-card-btn" @click="handleBook">Book Spot →</BaseButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Featured Experience Block -->
        <section class="featured-experience-section" aria-labelledby="featured-exp-label">
          <h2 id="featured-exp-label" class="section-title">Featured Experience</h2>
          
          <div class="featured-card">
            <div 
              class="featured-card-image"
              :style="{ backgroundImage: `url(${featuredActivity.imageUrl})` }"
            >
              <div class="featured-badge-tag">Featured Adventure</div>
            </div>
            
            <div class="featured-card-info">
              <div class="featured-meta-top">
                <span class="featured-loc-pin">
                  <BaseIcon name="pin" size="14" color="var(--color-primary)" />
                  {{ featuredActivity.location }}
                </span>
                <span class="featured-rating-score">
                  ★ {{ featuredActivity.rating }} ({{ featuredActivity.reviewsCount }} reviews)
                </span>
              </div>
              
              <h3 class="featured-card-title">{{ featuredActivity.title }}</h3>
              <p class="featured-card-desc">
                Ascend above the clouds and experience Mt. Everest up close on a luxury private helicopter charter. Witness the majestic Himalayas like never before.
              </p>

              <div class="featured-specs-row">
                <div class="spec-block">
                  <span class="spec-label">Duration</span>
                  <span class="spec-value">{{ featuredActivity.duration }}</span>
                </div>
                <div class="spec-block">
                  <span class="spec-label">Difficulty</span>
                  <span class="spec-value">{{ featuredActivity.difficulty }}</span>
                </div>
                <div class="spec-block">
                  <span class="spec-label">Group Size</span>
                  <span class="spec-value">{{ featuredActivity.groupSize }}</span>
                </div>
              </div>

              <div class="featured-booking-footer">
                <div class="price-stack">
                  <span class="price-lbl">Starting From</span>
                  <span class="price-val">{{ featuredActivity.price }}</span>
                  <span class="price-unit">Per Person</span>
                </div>
                <BaseButton variant="solid" class="featured-book-btn" @click="handleBook">
                  Reserve Experience Now
                </BaseButton>
              </div>
            </div>
          </div>
        </section>

        <!-- Main Grid Section -->
        <section class="grid-section" aria-label="Experiences grid">
          <h2 class="section-title">All Experiences</h2>
          
          <!-- Confidence Strip Badges -->
          <div class="confidence-strip-wrapper">
            <div class="confidence-badge">✓ Instant Confirmation</div>
            <div class="confidence-badge">✓ Free Cancellation</div>
            <div class="confidence-badge">✓ Best Price Guarantee</div>
          </div>

          <div class="activities-content-grid" v-if="filteredActivities.length > 0">
            <div 
              v-for="(act, index) in filteredActivities" 
              :key="act.id" 
              class="activity-card"
              :style="{ animationDelay: `${index * 0.1}s` }"
              role="article"
            >
              <!-- Card Image Wrapper -->
              <div class="activity-image-wrapper">
                <div 
                  class="activity-image"
                  :style="{ backgroundImage: `url(${act.imageUrl})` }"
                >
                  <div class="card-badge-row">
                    <span class="badge-pill rating-badge">⭐ {{ act.rating }}</span>
                    <span class="badge-pill duration-badge">{{ act.duration }}</span>
                  </div>
                  <!-- Wishlist Heart Button -->
                  <button 
                    class="wishlist-heart-btn floating-heart"
                    :class="{ active: wishlist.includes(act.id) }"
                    @click.stop="toggleWishlist(act.id)"
                    :aria-label="wishlist.includes(act.id) ? 'Remove from wishlist' : 'Add to wishlist'"
                  >
                    ♥
                  </button>
                </div>
              </div>

              <!-- Card Body Content -->
              <div class="activity-info">
                <span class="activity-sub">
                  <BaseIcon name="pin" size="11" color="var(--color-primary)" />
                  {{ act.location }} • {{ act.category }}
                </span>
                <h3 class="activity-title">{{ act.title }}</h3>
                
                <div class="activity-specs-bar">
                  <span class="spec-mini">⏱ {{ act.duration }}</span>
                  <span class="spec-mini">⛰ {{ act.difficulty }}</span>
                  <span class="spec-mini">👥 {{ act.groupSize }}</span>
                </div>

                <div class="card-footer">
                  <div class="price-box">
                    <span class="price-label">Starting From</span>
                    <span class="price-value">{{ act.price }}</span>
                    <span class="price-unit">Per Person</span>
                  </div>
                  <BaseButton variant="solid" class="book-btn" @click="handleBook">Reserve</BaseButton>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty Search State -->
          <div v-else class="no-results">
            <div class="no-results-card">
              <BaseIcon name="pin" size="48" color="rgba(255, 255, 255, 0.2)" />
              <h3>No Experiences Found</h3>
              <p>We couldn't find any activities or tours matching your search criteria.</p>
              <BaseButton variant="solid" class="reset-btn" @click="clearFilters">Reset Filters</BaseButton>
            </div>
          </div>
        </section>

        <!-- Vertical floating social dock -->
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
    </main>
  </div>
</template>

<style scoped>
.activities-view {
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

.activities-layout-wrapper {
  position: relative;
  width: 100%;
}

/* Ambient glows */
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
  bottom: 10%;
  right: -10%;
  width: 600px;
  height: 600px;
  background-color: rgba(30, 45, 180, 0.12);
}

/* Hero Banner */
.activities-hero {
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
  max-width: 800px;
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
  margin-bottom: 2rem;
}

.hero-trust-indicators {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.5);
}

.indicator-divider {
  color: rgba(255, 255, 255, 0.15);
}

/* Statistics Strip */
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

/* Search and Categories bar */
.search-category-section {
  margin-bottom: 4rem;
  width: 100%;
}

.search-category-layout {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background-color: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-btn);
  padding: 0.75rem 1.25rem;
  width: 100%;
  max-width: 580px;
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
}

.clear-search-btn:hover {
  color: var(--color-white);
}

.category-scroller-container {
  width: 100%;
  overflow-x: auto;
  padding-bottom: 0.5rem;
}

/* Hide scrollbar defaults */
.category-scroller-container::-webkit-scrollbar {
  height: 4px;
}
.category-scroller-container::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.08);
  border-radius: 99px;
}

.category-scroller {
  display: flex;
  gap: 0.75rem;
  white-space: nowrap;
}

.category-pill {
  border: 1px solid rgba(255, 255, 255, 0.06);
  background-color: rgba(255, 255, 255, 0.01);
  color: rgba(255, 255, 255, 0.7);
  padding: 0.6rem 1.3rem;
  border-radius: var(--radius-pill);
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  outline: none;
}

.category-pill:hover {
  border-color: rgba(255, 255, 255, 0.15);
  color: var(--color-white);
  background-color: rgba(255, 255, 255, 0.04);
  transform: translateY(-1px);
}

.category-pill.active {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  color: var(--color-white);
  box-shadow: 0 4px 14px rgba(26, 176, 166, 0.3);
}

/* Trending carousel section */
.trending-section {
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

.carousel-rail-container {
  width: 100%;
  overflow-x: auto;
  padding-bottom: 1rem;
}

.carousel-rail-container::-webkit-scrollbar {
  height: 6px;
}

.carousel-rail-container::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.08);
  border-radius: 99px;
}

.carousel-rail {
  display: flex;
  gap: 2rem;
}

.carousel-card {
  width: 300px;
  background-color: rgba(255, 255, 255, 0.01);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
}

.carousel-card:hover {
  border-color: rgba(26, 176, 166, 0.25);
  transform: translateY(-4px);
  background-color: rgba(255, 255, 255, 0.03);
}

.carousel-card-img {
  height: 170px;
  background-size: cover;
  background-position: center;
  position: relative;
  padding: 1rem;
}

.trending-badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background-color: #ef4444;
  color: var(--color-white);
  font-family: var(--font-body);
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 0.25rem 0.6rem;
  border-radius: var(--radius-pill);
}

.wishlist-heart-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: rgba(3, 5, 6, 0.6);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.15rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  outline: none;
  transition: all 0.25s ease;
  padding: 0;
}

.wishlist-heart-btn:hover {
  background-color: rgba(3, 5, 6, 0.8);
  color: #ef4444;
  transform: scale(1.1);
}

.wishlist-heart-btn.active {
  color: #ef4444 !important;
  background-color: #ffffff;
  border-color: #ffffff;
  animation: pulse-heart 0.35s ease;
}

@keyframes pulse-heart {
  0% { transform: scale(1); }
  50% { transform: scale(1.3); }
  100% { transform: scale(1); }
}

.carousel-card-info {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.carousel-card-cat {
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-primary);
  text-transform: uppercase;
  margin-bottom: 0.35rem;
  letter-spacing: 0.5px;
}

.carousel-card-title {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--color-white);
  margin-bottom: 1rem;
}

.carousel-card-footer {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.carousel-card-price {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--color-white);
}

.carousel-card-btn {
  font-size: 0.85rem;
  padding: 0.25rem 0.5rem;
}

/* Featured Experience Section */
.featured-experience-section {
  margin-bottom: 4rem;
  width: 100%;
}

.featured-card {
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  background-color: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 25px 55px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: border-color 0.3s ease;
}

.featured-card:hover {
  border-color: rgba(26, 176, 166, 0.35);
}

.featured-card-image {
  background-size: cover;
  background-position: center;
  min-height: 360px;
  position: relative;
}

.featured-badge-tag {
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

.featured-card-info {
  padding: 2.75rem;
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

.featured-loc-pin {
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}

.featured-rating-score {
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 600;
  color: #fbbf24;
}

.featured-card-title {
  font-family: var(--font-display);
  font-size: 1.85rem;
  font-weight: 800;
  color: var(--color-white);
  margin-bottom: 1rem;
  line-height: 1.25;
}

.featured-card-desc {
  font-family: var(--font-body);
  font-size: 0.95rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.65);
  margin-bottom: 1.75rem;
}

.featured-specs-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  padding-top: 1.25rem;
}

.spec-block {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.spec-label {
  font-family: var(--font-body);
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.45);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.spec-value {
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-white);
}

.featured-booking-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  margin-top: auto;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  padding-top: 1.25rem;
}

.price-stack {
  display: flex;
  flex-direction: column;
}

.price-lbl {
  font-family: var(--font-body);
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.45);
  text-transform: uppercase;
  margin-bottom: 0.1rem;
}

.price-val {
  font-family: var(--font-display);
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--color-white);
  line-height: 1;
}

.price-unit {
  font-family: var(--font-body);
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.4);
}

.featured-book-btn {
  padding: 0.8rem 2rem !important;
  font-weight: 600;
  box-shadow: 0 4px 14px rgba(26, 176, 166, 0.35);
}

.featured-book-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(26, 176, 166, 0.5);
}

/* Grid & Confidence tags */
.grid-section {
  width: 100%;
}

.confidence-strip-wrapper {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.confidence-badge {
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-primary);
  background-color: rgba(26, 176, 166, 0.05);
  border: 1px solid rgba(26, 176, 166, 0.12);
  padding: 0.4rem 0.9rem;
  border-radius: var(--radius-pill);
}

.activities-content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2.25rem;
  width: 100%;
}

.activity-card {
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  animation: fadeInUp 0.6s ease backwards;
}

.activity-card:hover {
  transform: translateY(-8px);
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.4),
    0 0 30px rgba(26, 176, 166, 0.06);
  border-color: rgba(26, 176, 166, 0.3);
  background-color: rgba(255, 255, 255, 0.03);
}

.activity-image-wrapper {
  height: 220px;
  overflow: hidden;
  position: relative;
}

.activity-image {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  padding: 1rem;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.activity-card:hover .activity-image {
  transform: scale(1.04);
}

.card-badge-row {
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: relative;
  z-index: 2;
}

.badge-pill {
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

.wishlist-heart-btn.floating-heart {
  bottom: auto;
  top: auto;
  right: 1rem;
  position: absolute;
  z-index: 10;
  margin-top: 8rem; /* Place heart floating nicely on the image */
}

.activity-info {
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.activity-sub {
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.45);
  font-weight: 500;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.activity-title {
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--color-white);
  margin: 0 0 1rem 0;
  line-height: 1.3;
}

.activity-specs-bar {
  display: flex;
  align-items: center;
  gap: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding-top: 1rem;
  margin-bottom: 1.5rem;
}

.spec-mini {
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.45);
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  gap: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding-top: 1rem;
}

.price-box {
  display: flex;
  flex-direction: column;
}

.price-label {
  font-family: var(--font-body);
  font-size: 0.725rem;
  color: rgba(255, 255, 255, 0.45);
  text-transform: uppercase;
}

.price-value {
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 800;
  color: var(--color-white);
  line-height: 1.1;
}

.price-unit {
  font-family: var(--font-body);
  font-size: 0.725rem;
  color: rgba(255, 255, 255, 0.4);
}

.book-btn {
  font-weight: 600;
  font-size: 0.9rem !important;
  background-color: transparent !important;
  border: 1px solid rgba(26, 176, 166, 0.4) !important;
  color: var(--color-primary) !important;
  padding: 0.5rem 1.2rem !important;
}

.activity-card:hover .book-btn {
  background-color: var(--color-primary) !important;
  color: var(--color-white) !important;
  border-color: var(--color-primary) !important;
  box-shadow: 0 4px 12px rgba(26, 176, 166, 0.25);
  transform: translateY(-1px);
}

/* Empty State */
.no-results {
  grid-column: 1 / -1;
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
  .activities-hero {
    padding: 4rem 2.5rem;
  }
  
  .featured-card {
    grid-template-columns: 1fr;
  }
  
  .featured-card-image {
    min-height: 260px;
  }
  
  .featured-card-info {
    padding: 2.25rem;
  }
}

@media (max-width: 768px) {
  .main-content {
    padding-top: 4.5rem;
    padding-bottom: 4rem;
  }

  .activities-hero {
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

  .search-box {
    max-width: 100%;
  }

  .carousel-rail {
    gap: 1rem;
  }

  .carousel-card {
    width: 260px;
  }

  .carousel-card-img {
    height: 150px;
  }

  .featured-experience-section {
    margin-bottom: 3rem;
  }

  .featured-card-info {
    padding: 1.5rem;
  }

  .featured-card-title {
    font-size: 1.6rem;
  }

  .featured-specs-row {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  .featured-booking-footer {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }

  .featured-book-btn {
    width: 100%;
  }

  .activities-content-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
