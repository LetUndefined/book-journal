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
const { fetchData, loadBook } = supaStore

function handleBookClicked(book: Book) {
  selectedBook.value = book
  const inLibrary = isBookInLibrary(book)
  if (inLibrary) {
    loadBook(book.book_id)
  } else {
    localrating.value = 0
    pepperRating.value = 0
    bookStatus.value = ''
  }
  modalTrigger.value = true
}

function isBookInLibrary(book: Book): boolean {
  return !!libraryBooks.value?.find((e) => e.book_id === book.book_id)
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
      <BookModal
        v-if="modalTrigger && selectedBook"
        :book="selectedBook"
        :in-library="isBookInLibrary(selectedBook)"
      />
    </div>
    <div class="loading" v-if="isLoading">
      <IsLoading />
    </div>

    <div class="home">
      <div class="search-container">
        <SearchBar class="search-bar"/>
      </div>
      <section class="book-list">
        <div v-if="books.length === 0 && !noBook && !isLoading" class="empty-state">
          <p>
            Use the search bar above to find books and add them to your library by clicking on them!
          </p>
        </div>
        <NoBooksFound v-if="noBook" />
        <BookList
          v-if="books.length > 0"
          :books="displayBooks"
          title="Search Results"
          @book-clicked="handleBookClicked"
        />
      </section>
    </div>
  </div>
</template>

<style scoped>
.book-modal {
  position: fixed;
  z-index: 999;
}
.home {
  display: flex;
  flex-direction: column;
  position: relative;
  margin-top: 4rem;
}

.search-container{
  display: flex;
  justify-content: center;
}


.book-list {
  flex: 1;
  padding: 0 1rem 2rem;
  overflow-y: auto;
  position: relative;
  margin-top: 5rem;
  margin-bottom: 1rem;
}

.loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  color: #666;
  font-size: 1.1rem;
  text-align: center;
}
</style>
