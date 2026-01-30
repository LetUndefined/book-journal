<script setup lang="ts">
import { ref } from 'vue'

const filters = ['All', 'Reading', 'Completed', 'DNF', 'Want to read']
const activeFilterIndex = ref(0)

const emit = defineEmits<{
  (e: 'filter', selectedFilter: string): void
}>()

const handleEmit = (index: number, filter: string) => {
  activeFilterIndex.value = index
  console.log(filter)
  emit('filter', filter)
}
</script>

<template>
  <div class="search-bar-filters">
    <button
      class="search-bar-filter"
      v-for="(filter, index) in filters"
      :key="index"
      @click="handleEmit(index, filter)"
      :class="{ active: activeFilterIndex === index }"
    >
      {{ filter }}
    </button>
  </div>
</template>

<style scoped>
.search-bar-filters {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  scrollbar-width: none;
  padding-bottom: 2px;
  border-radius: 20px;
  background-color: var(--color-card-bg);
  padding: 0.5rem;
  position: fixed;
  z-index: 4;
  box-shadow: 0px 0px 6px -2px #ffffff;
  width: calc(100% - 2rem);
}

.search-bar-filter {
  font-family: var(--font-body);
  font-size: 0.8125rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border: 1.5px solid var(--color-border);
  border-radius: 100px;
  background: var(--color-card-bg);
  color: var(--color-text-muted);
  cursor: pointer;
  white-space: nowrap;
  transition: all var(--transition-fast);
}

.active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: white;
}
</style>
