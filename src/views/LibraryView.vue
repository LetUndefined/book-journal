<script setup lang="ts">
import BookList from '@/components/BookList.vue'
import SearchFilters from '@/components/SearchFilters.vue'
import type { Book } from '@/models/Interface'
import { useSupaStore } from '@/stores/SupaBase'
import { storeToRefs } from 'pinia'
import BookModal from '@/components/BookModal.vue'
import { onMounted } from 'vue'

const supaStore = useSupaStore()
const { libraryBooks } = storeToRefs(supaStore)
const {modalTrigger} = storeToRefs(supaStore)
const {selectedBook} = storeToRefs(supaStore)
const {fetchData} = supaStore

function handleClick(book: Book) {
  selectedBook.value = book
  modalTrigger.value = true
  console.log(selectedBook.value)
}

onMounted(async () => {
await fetchData()
})

</script>

<template>
  <div class="container">
    <div class="book-modal">
      <BookModal v-if="modalTrigger && selectedBook" :book="selectedBook" />
    </div>
<section class="filters">
  <SearchFilters />
</section>
<div class="book-list">
  <BookList :books="libraryBooks" title="Your Library" @book-clicked="handleClick"/>
</div>
  </div>
</template>

<style scoped>
.container {
  position: relative;
}

.book-modal{
  position: fixed;
  z-index: 999;
}
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
