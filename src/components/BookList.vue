<script setup lang="ts">
// import { useBookStore } from '@/stores/BookLogic'
import BookCard from './BookCard.vue'
import { storeToRefs } from 'pinia'
import { modalTrigger } from '@/composables/modal'
import type { Book } from '@/models/Interface'
import { useSupaStore } from '@/stores/SupaBase'



defineProps<{
  books: Book[] | null
  title: string
}>()




const supaStore = useSupaStore()
const {selectedBook} = storeToRefs(supaStore)



function handleSaveBook(book: Book){
    selectedBook.value = book

  modalTrigger.value = true
  console.log('Book clicked: ', book)
}

</script>

<template>
  <div class="book-list-header">
    <h2 class="book-list-title">{{ title }}</h2>
  </div>

  <div class="book-list-container">
    <BookCard
      v-for="(book, index) in books"
      :key="index"
      :author="book.author"
      :title="book.title"
      :status="book.status"
      :cover="book.cover"
      :book_id="book.book_id"
      @save-book="handleSaveBook"
    />
  </div>
</template>

<style scoped>
.book-list-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.book-list-title {
  font-family: var(--font-display);
  font-size: 1.375rem;
  font-weight: 600;
  color: var(--color-text);
}

.book-list-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  max-height: 100%;
}

.book-list-container > * {
  flex: 0 0 calc(50% - 0.375rem);
}

.book-list-load-more {
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
  padding-bottom: var(--safe-area-bottom);
}

.book-list-load-btn {
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-primary);
  background: var(--color-card-bg);
  border: 1.5px solid var(--color-primary);
  border-radius: var(--radius-md);
  padding: 0.75rem 2rem;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.book-list-load-btn:active {
  transform: scale(0.96);
  background: var(--color-primary);
  color: white;
}
</style>
