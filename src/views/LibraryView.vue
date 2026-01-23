<script setup lang="ts">
import BookList from '@/components/BookList.vue'
import SearchFilters from '@/components/SearchFilters.vue'
import { useSupaStore } from '@/stores/SupaBase'
import { storeToRefs } from 'pinia'

const supaStore = useSupaStore()
const { libraryBooks } = storeToRefs(supaStore)
</script>

<template>
  <section class="filters">
    <SearchFilters />
  </section>
  <div class="book-list">
    <BookList :books="libraryBooks" title="Your Library" />
  </div>
</template>

<style scoped>
.filters {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.book-list {
  flex: 1;
  padding: 0 1rem 2rem;
  overflow-y: auto;
  position: relative;
}
</style>
