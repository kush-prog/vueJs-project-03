<script setup lang="ts">
import { ref, computed } from 'vue';
import TheNavbar from '@/components/layout/TheNavbar.vue';
import TheSidebar from '@/components/layout/TheSidebar.vue';
import BaseIcon from '@/components/ui/BaseIcon.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import { NAVIGATION_LINKS, SOCIAL_LINKS } from '@/data/mockData';

interface Activity {
    id: string;
    title: string;
    subtitle: string;
    rating: string;
    duration: string;
    price: string;
    imageUrl: string;
}

const searchQuery = ref('');

const ACTIVITIES: Activity[] = [
    {
        id: '1',
        title: 'Bungee Jumping',
        subtitle: 'Thrills & Free Falls',
        rating: '4.9',
        duration: '3 Hours',
        price: '$120',
        imageUrl: 'https://images.unsplash.com/photo-1569476535555-520e5c94e0e8?q=80&w=800&auto=format&fit=crop'
    },
    {
        id: '2',
        title: 'Mountain Trekking',
        subtitle: 'Alpine Glaciers & Slopes',
        rating: '4.8',
        duration: '2 Days',
        price: '$250',
        imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop'
    },
    {
        id: '3',
        title: 'River Rafting',
        subtitle: 'Whitewater Rapids Challenge',
        rating: '4.7',
        duration: '5 Hours',
        price: '$95',
        imageUrl: 'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?q=80&w=800&auto=format&fit=crop'
    },
    {
        id: '4',
        title: 'Hot Air Ballooning',
        subtitle: 'High Altitude Lagoon Flights',
        rating: '4.9',
        duration: '2 Hours',
        price: '$180',
        imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop'
    }
];

const filteredActivities = computed(() => {
    return ACTIVITIES.filter(act => {
        return act.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            act.subtitle.toLowerCase().includes(searchQuery.value.toLowerCase());
    });
});
</script>

<template>
    <div class="activities-view">
        <TheNavbar :links="NAVIGATION_LINKS" />

        <main class="main-content container">
            <div class="activities-layout-wrapper">
                <header class="activities-header">
                    <span class="header-subtitle">- Adventures</span>
                    <h1 class="header-title">Explore Activities</h1>
                </header>

                <div class="filters-section">
                    <div class="search-box">
                        <input type="text" v-model="searchQuery" placeholder="Search experiences..."
                            class="filter-input" />
                        <BaseIcon name="search" size="18" color="var(--color-text-muted)" />
                    </div>
                </div>

                <div class="activities-content-grid">
                    <div v-for="(act, index) in filteredActivities" :key="act.id" class="activity-card" :style="{ animationDelay: `${index * 0.15}s` }">
                        <div class="activity-image" :style="{ backgroundImage: `url(${act.imageUrl})` }">
                            <div class="badge-row">
                                <span class="badge-pill rating-badge">⭐ {{ act.rating }}</span>
                                <span class="badge-pill duration-badge">{{ act.duration }}</span>
                            </div>
                        </div>

                        <div class="activity-info">
                            <span class="activity-sub">{{ act.subtitle }}</span>
                            <h3 class="activity-title">{{ act.title }}</h3>
                            <div class="card-footer">
                                <div class="price-box">
                                    <span class="price-label">From</span>
                                    <span class="price-value">{{ act.price }}</span>
                                </div>
                                <BaseButton variant="solid" class="book-btn">Book Now</BaseButton>
                            </div>
                        </div>
                    </div>

                    <div v-if="filteredActivities.length === 0" class="no-results">
                        <p>No experiences found matching your query.</p>
                    </div>

                </div>

                <TheSidebar :socials="SOCIAL_LINKS" />
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
    padding-top: 2.5rem;
}

.main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding-top: 1.5rem;
    padding-bottom: 6rem;
}

.activities-layout-wrapper {
    position: relative;
    width: 100%;
}

.activities-header {
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
    background: linear-gradient(135deg, var(--color-dark) 40%, var(--color-primary) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    line-height: 1.2;
}

.filters-section {
    display: flex;
    margin-bottom: 3rem;
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

.activities-content-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2rem;
    width: 100%;
}

.activity-card {
    display: flex;
    flex-direction: column;
    background-color: rgba(4, 5, 6, 0.9);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-radius: var(--radius-panel);
    border: 1px solid rgba(255, 255, 255, 0.05);
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    animation: fadeInUp 0.6s ease backwards;
}

.activity-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(26, 176, 166, 0.15);
    border-color: rgba(26, 176, 166, 0.3);
}

.activity-card:hover .activity-image {
    transform: scale(1.06);
}

.activity-image {
    height: 200px;
    background-size: cover;
    background-position: center;
    position: relative;
    padding: 1rem;
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.badge-row {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.badge-pill {
    background: rgba(18, 22, 25, 0.75);
    backdrop-filter: blur(4px);
    color: var(--color-white);
    padding: 0.35rem 0.75rem;
    border-radius: var(--radius-pill);
    font-family: var(--font-body);
    font-size: 0.75rem;
    font-weight: 600;
}

.activity-info {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    flex: 1;
}

.activity-sub {
    font-family: var(--font-body);
    font-size: 0.85rem;
    color: var(--color-text-muted);
    font-weight: 500;
    margin-bottom: 0.4rem;
}

.activity-title {
    font-family: var(--font-display);
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--color-dark);
    margin: 0 0 1.5rem 0;
}

.card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: auto;
    gap: 1rem;
}

.price-box {
    display: flex;
    flex-direction: column;
}

.price-label {
    font-family: var(--font-body);
    font-size: 0.75rem;
    color: var(--color-text-muted);
}

.price-value {
    font-family: var(--font-display);
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--color-dark);
}

.book-btn {
    padding: 0.5rem 1.2rem !important;
    font-size: 0.85rem !important;
    border-radius: var(--radius-btn) !important;
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

@media (max-width: 768px) {
    .activities-view {
        padding-top: 1rem;
    }

    .activities-header {
        padding: 2.5rem 1.5rem;
        margin-bottom: 2rem;
    }

    .filters-section {
        margin-bottom: 2rem;
    }

    .search-box {
        width: 100%;
    }

    .activities-content-grid {
        grid-template-columns: 1fr;
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(24px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
