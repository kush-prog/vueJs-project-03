<script setup lang="ts">
import BaseButton from '../ui/BaseButton.vue';
import BaseIcon from '../ui/BaseIcon.vue';

interface Props {
  title: string;
  subtitle: string;
  temperature: string;
  weatherStatus: string;
}

defineProps<Props>();

defineEmits<{
  (e: 'prev'): void;
  (e: 'next'): void;
}>();
</script>

<template>
  <div class="hero-details">
    <span class="hero-subtitle">— {{ subtitle }}</span>
    <h1 class="hero-title">{{ title }}</h1>
    
    <div class="hero-meta-group">
      <div class="hero-meta">
        <span class="hero-temp">{{ temperature }}</span>
        <span class="hero-weather">{{ weatherStatus }}</span>
      </div>
      
      <div class="hero-controls">
        <BaseButton variant="circle" @click="$emit('prev')">
          <BaseIcon name="arrow-left" size="18" />
        </BaseButton>
        <BaseButton variant="circle" @click="$emit('next')">
          <BaseIcon name="arrow-right" size="18" />
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero-details {
  display: flex;
  flex-direction: column;
  color: var(--color-white);
  max-width: 600px;
}

.hero-subtitle {
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  margin-bottom: 1rem;
  opacity: 0.9;
}

.hero-title {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: 800;
  line-height: 1.1;
  color: var(--color-white);
  margin-bottom: 2rem;
  letter-spacing: -1px;
}

.hero-meta-group {
  display: flex;
  align-items: center;
  gap: 3rem;
}

.hero-meta {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}

.hero-temp {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 600;
}

.hero-weather {
  font-family: var(--font-body);
  font-size: 1rem;
  opacity: 0.8;
}

.hero-controls {
  display: flex;
  gap: 0.75rem;
}

@media (max-width: 576px) {
  .hero-meta-group {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
  }
}
</style>
