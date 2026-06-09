<script setup lang="ts">
import { ref } from 'vue';
import BaseIcon from '../ui/BaseIcon.vue';

const emit = defineEmits<{
  (e: 'search', payload: { location: string; activity: string; date: string }): void;
}>();

const location = ref('');
const activity = ref('');
const date = ref('');

const handleSearch = () => {
  emit('search', {
    location: location.value,
    activity: activity.value || 'Bungee Jump',
    date: date.value
  });
};
</script>

<template>
  <div class="search-panel" role="search" aria-label="Search trips">
    <div class="search-field">
      <div class="field-info">
        <label for="location" class="field-label">Location</label>
        <input 
          id="location"
          type="text" 
          v-model="location" 
          placeholder="Enter Your Destination..."
          class="field-input"
        />
      </div>
      <BaseIcon name="pin" size="18" class="field-icon" color="rgba(255, 255, 255, 0.4)" />
    </div>

    <div class="field-divider" aria-hidden="true"></div>

    <div class="search-field">
      <div class="field-info">
        <label for="activity" class="field-label">Activity</label>
        <select id="activity" v-model="activity" class="field-select" aria-label="Select activity">
          <option value="">Bungee Jump</option>
          <option value="trekking">Trekking</option>
          <option value="rafting">River Rafting</option>
          <option value="sightseeing">Sightseeing</option>
        </select>
      </div>
      <BaseIcon name="chevron-down" size="18" class="field-icon" color="rgba(255, 255, 255, 0.4)" />
    </div>

    <div class="field-divider" aria-hidden="true"></div>

    <div class="search-field">
      <div class="field-info">
        <label for="date" class="field-label">Date</label>
        <input 
          id="date" 
          type="text" 
          v-model="date" 
          placeholder="Set date"
          onfocus="(this.type='date')"
          onblur="if(!this.value)this.type='text'"
          class="field-input"
        />
      </div>
      <BaseIcon name="calendar" size="18" class="field-icon" color="rgba(255, 255, 255, 0.4)" />
    </div>

    <button class="search-button" aria-label="Search destinations" @click="handleSearch">
      <BaseIcon name="search" size="22" color="var(--color-white)" />
    </button>
  </div>
</template>

<style scoped>
.search-panel {
  display: flex;
  align-items: center;
  background-color: rgba(18, 22, 25, 0.45);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-panel);
  box-shadow: 
    0 30px 60px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  padding: 1.1rem 1.5rem;
  width: 90%;
  max-width: 860px;
  margin: 0 auto;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  animation: float-panel 6s ease-in-out infinite;
}

@keyframes float-panel {
  0% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0); }
}

.search-panel:hover {
  box-shadow: 
    0 40px 80px rgba(26, 176, 166, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
  border-color: rgba(26, 176, 166, 0.4);
  background-color: rgba(18, 22, 25, 0.55);
}

.search-field {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  padding: 0 1.5rem;
  position: relative;
}

.search-field:first-of-type {
  padding-left: 0.5rem;
}

.field-info {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.field-label {
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: rgba(255, 255, 255, 0.45);
  margin-bottom: 0.3rem;
  display: block;
}

.field-input, .field-select {
  border: none;
  background: transparent;
  outline: none;
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--color-white);
  width: 100%;
  padding: 0;
  cursor: pointer;
  transition: color 0.2s;
}

.field-input::placeholder {
  color: rgba(255, 255, 255, 0.35);
}

.field-select {
  appearance: none;
}

.field-select option {
  background-color: #121619;
  color: var(--color-white);
  padding: 0.5rem;
}

.field-icon {
  margin-left: 0.75rem;
  transition: color 0.2s;
}

.search-field:focus-within .field-icon {
  color: var(--color-primary) !important;
}

.field-divider {
  width: 1px;
  height: 36px;
  background-color: rgba(255, 255, 255, 0.08);
  flex-shrink: 0;
}

.search-button {
  width: 54px;
  height: 54px;
  background-color: var(--color-primary);
  border: none;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  margin-left: 0.5rem;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(26, 176, 166, 0.3);
}

.search-button:hover {
  background-color: var(--color-primary-hover);
  transform: scale(1.08);
  box-shadow: 0 8px 24px rgba(26, 176, 166, 0.5);
}

.search-button:active {
  transform: scale(0.95);
}

.search-button:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

@media (max-width: 768px) {
  .search-panel {
    flex-direction: column;
    width: 100%;
    padding: 1.5rem;
    gap: 1rem;
    animation: none; /* Disable floating on mobile for stability */
  }

  .search-field {
    width: 100%;
    padding: 0 0 0.75rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .search-field:first-of-type {
    padding-left: 0;
  }

  .field-divider {
    display: none;
  }

  .field-icon {
    margin-left: 0.5rem;
  }

  .search-button {
    width: 100%;
    margin-left: 0;
    margin-top: 0.5rem;
    border-radius: var(--radius-btn);
  }
}
</style>
