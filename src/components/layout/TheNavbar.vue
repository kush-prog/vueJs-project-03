<script setup lang="ts">
import BaseButton from '../ui/BaseButton.vue';
import BaseIcon from '../ui/BaseIcon.vue';

interface NavigationLink {
  label: string;
  path: string;
}

interface Props {
  links: NavigationLink[];
}

defineProps<Props>();
</script>


<template>
  <header class="navbar-container">
    <div class="navbar-wrapper container">
      <a href="#" class="brand-logo">Entrada</a>
      <nav class="nav-menu">
        <ul class="nav-list">
          <li v-for="(link, index) in links" :key="link.path" class="nav-item">
            <a :href="`#${link.path}`" class="nav-link">{{ link.label }}</a>
            <span v-if="index < links.length - 1" class="separator-dot">•</span>
          </li>
        </ul>
        <button class="search-trigger" aria-label="Search site">
          <BaseIcon name="search" size="18" />
        </button>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.navbar-container {
  width: 100%;
  background-color: var(--color-white);
  padding: 1.5rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.02);
}

.navbar-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand-logo {
  font-family: var(--font-display);
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--color-dark);
  text-decoration: none;
  letter-spacing: -0.5px;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav-list {
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  display: flex;
  align-items: center;
}

.nav-link {
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--color-text-body);
  text-decoration: none;
  transition: color 0.25s ease;
  padding: 0.5rem 0.25rem;
}

.nav-link:hover {
  color: var(--color-dark);
}

.separator-dot {
  font-size: 0.6rem;
  color: var(--color-text-muted);
  margin: 0 1rem;
  user-select: none;
}

.search-trigger {
  border: none;
  background: none;
  color: var(--color-dark);
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.search-trigger:hover {
  background-color: var(--color-bg-light);
}

.auth-group {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.login-btn {
  font-weight: 500;
  color: var(--color-dark) !important;
}

.login-btn:hover {
  color: var(--color-primary) !important;
}

.signup-btn {
  padding: 0.6rem 1.4rem !important;
}

@media (max-width: 768px) {
  .nav-menu {
    display: none; 
  }
}
</style>

