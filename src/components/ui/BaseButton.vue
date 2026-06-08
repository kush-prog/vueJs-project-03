<script setup lang="ts">
interface Props {
  variant?: 'solid' | 'circle' | 'text';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  variant: 'solid',
  type: 'button',
  disabled: false
});

defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();
</script>


<template>
  <button
    :type="type"
    :class="['base-button', `btn-${variant}`]"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>


<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.25s ease;
  cursor: pointer;
  border: none;
  background: none;
  outline: none;
  white-space: nowrap;
}

.base-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  pointer-events: none;
}

.btn-solid {
  background-color: var(--color-primary);
  color: var(--color-white);
  padding: 0.8rem 1.6rem;
  border-radius: var(--radius-pill);
}

.btn-solid:hover:not(:disabled) {
  background-color: var(--color-primary-hover);
  box-shadow: var(--shadow-btn);
}

.btn-circle {
  width: 44px;
  height: 44px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  color: var(--color-white);
  padding: 0;
  background-color: transparent;
}

.btn-circle:hover:not(:disabled) {
  border-color: var(--color-white);
  background-color: rgba(255, 255, 255, 0.1);
}

.btn-text {
  color: var(--color-text-body);
  padding: 0.5rem 1rem;
  font-size: 0.95rem;
}

.btn-text:hover:not(:disabled) {
  color: var(--color-primary);
}

.base-button:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
</style>

