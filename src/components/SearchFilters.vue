<script setup lang="ts">
import { ref } from 'vue';



  const filters = ["All", 'Reading', 'Completed', 'DNF']
  const activeFilterIndex = ref(0)

</script>

<template>
  <div class="search-bar-filters">
    <button class="search-bar-filter"  v-for="(filter, index) in filters"
    :key="index" @click="activeFilterIndex = index" :class="{'active': activeFilterIndex === index}">
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



.active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: white;
}
</style>
