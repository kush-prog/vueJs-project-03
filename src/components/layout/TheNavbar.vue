<script setup lang="ts">
import BaseButton from '../ui/BaseButton.vue';
import BaseIcon from '../ui/BaseIcon.vue';

interface NavigationLink {
  label: string;
  path: string;
}

interface Props {
  links: NavigationLink[];
  transparent?: boolean;
}

withDefaults(defineProps<Props>(), {
  transparent: false
});

const navigateTo = (hash: string) => {
  window.location.hash = hash;
};
</script>

<template>
  <header :class="['navbar-container', { 'navbar-transparent': transparent }]">
    <div class="navbar-wrapper container">
      <div class="navbar-left">
        <a href="#" class="brand-logo" aria-label="Entrada home">Entrada</a>
        <nav class="nav-menu" aria-label="Main navigation">
          <ul class="nav-list">
            <li v-for="(link, index) in links" :key="link.path" class="nav-item">
              <a :href="`#${link.path}`" class="nav-link">{{ link.label }}</a>
              <span v-if="index < links.length - 1" class="separator-dot" aria-hidden="true">•</span>
            </li>
          </ul>
          <button class="search-trigger" aria-label="Open search">
            <BaseIcon name="search" size="18" />
          </button>
        </nav>
      </div>

      <div class="auth-group">
        <BaseButton variant="text" class="login-btn" @click="navigateTo('#login')">Log in</BaseButton>
        <BaseButton variant="solid" class="signup-btn" @click="navigateTo('#signup')">Sign up</BaseButton>
      </div>
    </div>
  </header>
</template>

<style scoped>
.navbar-container {
  width: 100%;
  background-color: rgba(4, 6, 8, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  padding: 1.25rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  position: sticky;
  top: 0;
  z-index: 100;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.navbar-transparent {
  background-color: rgba(4, 6, 8, 0.15);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}

.navbar-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar-left {
  display: flex;
  align-items: center;
  gap: 3rem;
  margin-left: 0.5rem;
}

.brand-logo {
  font-family: var(--font-display);
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--color-white);
  text-decoration: none;
  letter-spacing: 0.5px;
  background: linear-gradient(135deg, #ffffff 50%, var(--color-primary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: opacity 0.2s;
}

.brand-logo:hover {
  opacity: 0.9;
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
  font-size: 1.05rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.75);
  text-decoration: none;
  transition: color 0.25s ease;
  padding: 0.5rem 0.25rem;
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--color-primary);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.nav-link:hover {
  color: var(--color-white);
}

.nav-link:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

.separator-dot {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.2);
  margin: 0 1rem;
  user-select: none;
}

.search-trigger {
  border: none;
  background: none;
  color: rgba(255, 255, 255, 0.75);
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.25s ease;
}

.search-trigger:hover {
  background-color: rgba(255, 255, 255, 0.08);
  color: var(--color-primary);
  transform: scale(1.05);
}

.search-trigger:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.auth-group {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.login-btn {
  font-weight: 500;
  color: rgba(255, 255, 255, 0.85) !important;
  font-size: 1rem;
  transition: all 0.25s ease;
}

.login-btn:hover {
  color: var(--color-primary) !important;
}

.signup-btn {
  padding: 0.6rem 1.4rem !important;
  font-weight: 600;
  font-size: 1rem;
  background-color: var(--color-primary);
  color: var(--color-white);
  border-radius: var(--radius-pill);
  box-shadow: 0 4px 14px rgba(26, 176, 166, 0.2);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

.signup-btn:hover {
  background-color: var(--color-primary-hover) !important;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(26, 176, 166, 0.4);
}

.signup-btn:active {
  transform: translateY(0);
}

@media (max-width: 768px) {
  .nav-menu {
    display: none; 
  }
  
  .navbar-container {
    padding: 1rem 0;
  }
}
</style>
