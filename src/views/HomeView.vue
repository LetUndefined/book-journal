<script setup lang="ts">
import SearchBar from '@/components/SearchBar.vue'
import BookList from '@/components/BookList.vue'
import { useBookStore } from '@/stores/BookLogic'

import IsLoading from '@/components/IsLoading.vue'
import { storeToRefs } from 'pinia'
import NoBooksFound from '@/components/NoBooksFound.vue'
import BookModal from '@/components/BookModal.vue'
import { useSupaStore } from '@/stores/SupaBase'
import { computed, onMounted, onUnmounted } from 'vue'
import type { Book } from '@/models/Interface'

const bookStore = useBookStore()
const { noBook, books, isLoading } = storeToRefs(bookStore)

const supaStore = useSupaStore()
const { selectedBook, modalTrigger, libraryBooks, localrating, pepperRating, bookStatus } =
  storeToRefs(supaStore)
const { fetchData } = supaStore

function handleBookClicked(book: Book) {
  selectedBook.value = book
  modalTrigger.value = true
}

const displayBooks = computed(() => {
  return books.value.map((e) => {
    const match = libraryBooks.value?.find((j) => j.book_id === e.book_id)
    return match || e
  })
})

onMounted(async () => {
  await fetchData()
  localrating.value = 0
  pepperRating.value = 0
  bookStatus.value = ''
})

onUnmounted(() => {
  modalTrigger.value = false
  selectedBook.value = null
})
</script>

<template>
  <div class="container">
    <div class="book-modal">
      <BookModal v-if="modalTrigger && selectedBook" :book="selectedBook" :in-library="false" />
    </div>
    <div class="loading" v-if="isLoading">
      <IsLoading />
    </div>

    <div class="home">
      <SearchBar />
      <section class="book-list">
        <NoBooksFound v-if="noBook" />
        <BookList :books="displayBooks" title="Search Results" @book-clicked="handleBookClicked" />
      </section>
    </div>
  </div>
</template>

<style scoped>
.book-modal {
  position: fixed;
  z-index: 9999;
  height: 100vh;
}
.home {
  display: flex;
  flex-direction: column;
  position: relative;
}

.book-list {
  flex: 1;
  padding: 0 1rem 2rem;
  overflow-y: auto;
  position: relative;
}

.loading {
  position: absolute;
}
</style>
