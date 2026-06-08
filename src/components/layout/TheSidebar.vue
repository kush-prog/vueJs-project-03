<script setup lang="ts">
interface SocialLink {
  name: string;
  url: string;
}

interface Props {
  socials: SocialLink[];
}

defineProps<Props>();
</script>


<template>
  <aside class="social-sidebar">
    <div class="social-links-wrapper">
      <template v-for="(social, index) in socials" :key="social.name">
        <a 
          :href="social.url" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="social-link"
        >
          {{ social.name }}
        </a>
        <span v-if="index < socials.length - 1" class="separator-slash">/</span>
      </template>
    </div>
  </aside>
</template>


<style scoped>
.social-sidebar {
  position: absolute;
  right: -10rem;
  top: 50%;
  transform: translateY(-50%) rotate(-90deg);
  z-index: 10;
  white-space: nowrap;
}

.social-links-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.social-link {
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-text-body);
  text-decoration: none;
  transition: color 0.25s ease;
}

.social-link:hover {
  color: var(--color-primary);
}

.separator-slash {
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--color-text-muted);
  user-select: none;
  margin: 0 0.25rem;
}

@media (max-width: 1024px) {
  .social-sidebar {
    display: none;
  }
}
</style>

