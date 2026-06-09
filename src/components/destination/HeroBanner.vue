<script setup lang="ts">
import HeroDetails from './HeroDetails.vue';
import PaymentBadge from './PaymentBadge.vue';

interface Destination {
  id: string;
  title: string;
  subtitle: string;
  temperature: string;
  weatherStatus: string;
  imageUrl: string;
}

interface Props {
  destination: Destination;
}

defineProps<Props>();

defineEmits<{
  (e: 'prev'): void;
  (e: 'next'): void;
}>();
</script>

<template>
  <Transition name="slide-fade" mode="out-in">
    <section class="hero-banner" :style="{ backgroundImage: `url(${destination.imageUrl})` }">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <HeroDetails 
          :title="destination.title" 
          :subtitle="destination.subtitle" 
          :temperature="destination.temperature"
          :weather-status="destination.weatherStatus" 
          @prev="$emit('prev')" 
          @next="$emit('next')" />
        <div class="payment-badge-wrapper">
          <PaymentBadge />
        </div>
      </div>
    </section>
  </Transition>
</template>

<style scoped>
.hero-banner {
  position: relative;
  width: 100%;
  height: 640px;
  border-radius: var(--radius-hero);
  background-size: cover;
  background-position: center;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  padding: 5rem 4rem 10rem 4rem;
  transition: background-image 0.6s ease-in-out;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom,
      rgba(3, 5, 6, 0.75) 0%,
      rgba(3, 5, 6, 0.1) 35%,
      rgba(3, 5, 6, 0.15) 65%,
      rgba(3, 5, 6, 0.9) 100%);
  z-index: 1;
}

.hero-content {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  z-index: 2;
}

@media (max-width: 992px) {
  .hero-banner {
    height: auto;
    min-height: 500px;
    padding: 2.5rem;
    align-items: center;
  }

  .hero-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;
  }
}

@media (max-width: 576px) {
  .hero-banner {
    padding: 1.5rem;
  }
}

.payment-badge-wrapper {
  margin-left: auto;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 0.4s ease, filter 0.4s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  filter: blur(8px);
}
</style>
