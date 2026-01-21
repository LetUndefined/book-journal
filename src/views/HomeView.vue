<script setup lang="ts">
import Header from '@/components/Header.vue'
import SearchBar from '@/components/SearchBar.vue'
import BookList from '@/components/BookList.vue'
import Footer from '@/components/BookFooter.vue'
import { useBookStore } from '@/stores/BookLogic'
import { onMounted } from 'vue'
import IsLoading from '@/components/IsLoading.vue'
import { storeToRefs } from 'pinia'
import NoBooksFound from '@/components/NoBooksFound.vue'

const bookStore = useBookStore()
const { fetchBooks } = bookStore
const { isLoading } = storeToRefs(bookStore)
const { noBook } = storeToRefs(bookStore)

onMounted(async () => {
  await fetchBooks()
  isLoading.value = false
})
</script>

<template>
  <div class="loading" v-if="isLoading">
    <IsLoading />
  </div>
  <div class="home">
    <Header />
    <SearchBar />
    <section class="book-list">
      <NoBooksFound v-if="noBook" />

      <BookList />
    </section>

    <Footer />
  </div>
</template>

<style scoped>
.home {
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
}

.book-list {
  flex: 1;
  padding: 0 1rem 2rem;
  overflow-y: auto;
}

.loading {
  position: absolute;
}
</style>
