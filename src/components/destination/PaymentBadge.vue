<script setup lang="ts">
import BaseIcon from '../ui/BaseIcon.vue';
</script>

<template>
  <div class="payment-badge-container">
    <div class="icon-circle">
      <BaseIcon name="payment" size="20" color="var(--color-dark)" />
    </div>
    <div class="text-content">
      <p class="badge-text">
        We Accept Payment Through<br />
        All Cards & Banking
      </p>
      <a href="#" class="book-now-link">Book Now!</a>
    </div>
  </div>
</template>

<style scoped>
.payment-badge-container {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  max-width: 280px;
}

.icon-circle {
  width: 48px;
  height: 48px;
  background-color: var(--color-white);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.text-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.badge-text {
  font-family: var(--font-body);
  font-size: 0.85rem;
  line-height: 1.4;
  color: var(--color-white);
  margin: 0;
  opacity: 0.95;
}

.book-now-link {
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--color-white);
  text-decoration: underline;
  text-underline-offset: 4px;
  transition: opacity 0.2s;
}

.book-now-link:hover {
  opacity: 0.8;
}

@media (max-width: 992px) {
  .payment-badge-container {
    max-width: 100%;
  }
}
</style>
