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
    <h1 class="hero-title">{{ title }}</h1>
    <p class="hero-subtitle">{{ subtitle }}</p>
    
    <div class="hero-meta">
      <span class="hero-temp">{{ temperature }}</span>
      <span class="hero-weather">{{ weatherStatus }}</span>
    </div>
    
    <div class="hero-controls">
      <BaseButton variant="circle" class="control-btn" aria-label="Previous destination" @click="$emit('prev')">
        <BaseIcon name="arrow-left" size="18" />
      </BaseButton>
      <BaseButton variant="circle" class="control-btn" aria-label="Next destination" @click="$emit('next')">
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
  max-width: 650px;
  margin-bottom: 0.5rem;
}

.hero-title {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 5.5vw, 4.25rem);
  font-weight: 800;
  line-height: 1.1;
  color: var(--color-white);
  margin-bottom: 0.75rem;
  letter-spacing: -1px;
  text-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.hero-subtitle {
  font-family: var(--font-body);
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 1.5rem;
  text-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.hero-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.hero-temp {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 600;
  background-color: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  padding: 0.35rem 0.85rem;
  border-radius: var(--radius-pill);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.hero-weather {
  font-family: var(--font-body);
  font-size: 1.05rem;
  font-weight: 500;
  opacity: 0.9;
  color: rgba(255, 255, 255, 0.9);
}

.hero-controls {
  display: flex;
  gap: 0.75rem;
}

.control-btn {
  border: 1px solid rgba(255, 255, 255, 0.25) !important;
  background-color: rgba(255, 255, 255, 0.05) !important;
  backdrop-filter: blur(4px);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

.control-btn:hover {
  background-color: var(--color-primary) !important;
  border-color: var(--color-primary) !important;
  transform: scale(1.1) translateY(-2px);
  box-shadow: 0 8px 24px rgba(26, 176, 166, 0.4);
}

.control-btn:active {
  transform: scale(0.95) translateY(0);
}
</style>
