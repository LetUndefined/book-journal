<script setup lang="ts">
import { useBookStore } from '@/stores/BookLogic';

const bookStore = useBookStore()
const { filters } = bookStore

</script>

<template>
  <div class="search-bar-filters">
      <button class="search-bar-filter search-bar-filter--active">All</button>
      <button class="search-bar-filter" v-for="(filter, index) in filters" :key="index">
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
  -ms-overflow-style: none;
  padding-bottom: 2px;
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
  flex-shrink: 0;
  transition: all var(--transition-fast);
}

.search-bar-filter:active {
  transform: scale(0.96);
}

.search-bar-filter--active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: white;
}

</style>
