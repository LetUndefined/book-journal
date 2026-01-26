<script setup lang="ts">
import BookCard from './BookCard.vue'
import type { Book } from '@/models/Interface'

defineProps<{
  books: Book[] | null
  title: string
}>()

const emit = defineEmits<{
  (e: 'book-clicked', book: Book): void
}>()

function handleEmit(book: Book) {
  emit('book-clicked', book)
  console.log('Emit fired')
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
      :rating="book.rating"
      :pepper="book.pepper"
      @save-book="handleEmit"
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
  padding: 0rem 0 1.5rem;
}

.book-list-container > * {
  flex: 0 0 calc(50% - 0.375rem);
}
</style>
