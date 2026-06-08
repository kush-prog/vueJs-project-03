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
</template>

<style scoped>
.hero-details {
  display: flex;
  flex-direction: column;
  color: var(--color-white);
  max-width: 750px;
  margin-bottom: 1.5rem;
}

.hero-subtitle {
  font-family: var(--font-body);
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  margin-bottom: 1rem;
  opacity: 0.9;
}

.hero-title {
  font-family: var(--font-display);
  font-size: clamp(3.5rem, 7vw, 6rem);
  font-weight: 800;
  line-height: 1.05;
  color: var(--color-white);
  margin-bottom: 1.5rem;
  letter-spacing: 5px;
}

.hero-meta {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
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
</style>
