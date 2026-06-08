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
  <div class="search-panel">
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
      <BaseIcon name="pin" size="18" class="field-icon" color="var(--color-text-muted)" />
    </div>

    <div class="field-divider"></div>

    <div class="search-field">
      <div class="field-info">
        <label for="activity" class="field-label">Activity</label>
        <select id="activity" v-model="activity" class="field-select">
          <option value="">Bungee Jump</option>
          <option value="trekking">Trekking</option>
          <option value="rafting">River Rafting</option>
          <option value="sightseeing">Sightseeing</option>
        </select>
      </div>
      <BaseIcon name="chevron-down" size="18" class="field-icon" color="var(--color-text-muted)" />
    </div>

    <div class="field-divider"></div>

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
      <BaseIcon name="calendar" size="18" class="field-icon" color="var(--color-text-muted)" />
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
  background-color: var(--color-white);
  border-radius: var(--radius-panel);
  box-shadow: var(--shadow-panel);
  padding: 1.25rem 1.75rem;
  width: 90%;
  max-width: 860px;
  margin: 0 auto;
}

.search-field {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  padding: 0 1.5rem;
}

.search-field:first-of-type {
  padding-left: 0;
}

.field-info {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.field-label {
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-dark);
  margin-bottom: 0.4rem;
  display: block;
}

.field-input, .field-select {
  border: none;
  background: transparent;
  outline: none;
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--color-text-body);
  width: 100%;
  padding: 0;
  cursor: pointer;
}

.field-input::placeholder {
  color: var(--color-text-muted);
}

.field-select {
  appearance: none;
}

.field-icon {
  margin-left: 1rem;
}

.field-divider {
  width: 1px;
  height: 40px;
  background-color: var(--color-border);
  flex-shrink: 0;
}

.search-button {
  width: 56px;
  height: 56px;
  background-color: var(--color-primary);
  border: none;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
  margin-left: 1rem;
  flex-shrink: 0;
}

.search-button:hover {
  background-color: var(--color-primary-hover);
}

.search-button:active {
  transform: scale(0.95);
}

@media (max-width: 768px) {
  .search-panel {
    flex-direction: column;
    width: 100%;
    padding: 1.5rem;
    gap: 1.25rem;
  }

  .search-field {
    width: 100%;
    padding: 0 0 1rem 0;
    border-bottom: 1px solid var(--color-border);
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
