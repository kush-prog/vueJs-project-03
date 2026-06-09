<script setup lang="ts">
import BaseIcon from '../ui/BaseIcon.vue';
</script>

<template>
  <div class="payment-badge-container">
    <div class="icon-circle">
      <BaseIcon name="payment" size="26" color="var(--color-primary)" />
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
  gap: 1.25rem;
  max-width: 320px;
}

.icon-circle {
  width: 56px;
  height: 56px;
  background-color: rgba(26, 176, 166, 0.12);
  border: 1px solid rgba(26, 176, 166, 0.25);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(26, 176, 166, 0.2);
}

.text-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.badge-text {
  font-family: var(--font-body);
  font-size: 1.05rem;
  line-height: 1.4;
  color: var(--color-white);
  margin: 0;
  opacity: 0.95;
}

.book-now-link {
  font-family: var(--font-body);
  font-size: 1.1rem;
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
