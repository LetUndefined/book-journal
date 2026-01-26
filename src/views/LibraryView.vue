<script setup lang="ts">
import BookList from '@/components/BookList.vue'
import SearchFilters from '@/components/SearchFilters.vue'
import type { Book } from '@/models/Interface'
import { useSupaStore } from '@/stores/SupaBase'
import { storeToRefs } from 'pinia'
import BookModal from '@/components/BookModal.vue'
import { onMounted } from 'vue'

const supaStore = useSupaStore()
const { modalTrigger, selectedBook, libraryBooks} = storeToRefs(supaStore)
const { fetchData, loadBook } = supaStore

function handleClick(book: Book) {
  selectedBook.value = book
  loadBook(book.book_id)
  modalTrigger.value = true
}

onMounted(async () => {
  await fetchData()
})
</script>

<template>
  <div class="container">
    <div class="book-modal">
      <BookModal :in-library="true" v-if="modalTrigger && selectedBook" :book="selectedBook" />
    </div>
    <section class="filters">
      <SearchFilters />
    </section>
    <div class="book-list">
      <BookList :books="libraryBooks" title="Your Library" @book-clicked="handleClick" />
    </div>
  </div>
</template>

<style scoped>
.container {
  position: relative;
}

.book-modal {
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
