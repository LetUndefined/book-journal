<script setup lang="ts">
import Header from '@/components/Header.vue'
import SearchBar from '@/components/SearchBar.vue'
import BookList from '@/components/BookList.vue'
import Footer from '@/components/BookFooter.vue'
import { useBookStore } from '@/stores/BookLogic'
import { onMounted } from 'vue'

const bookStore = useBookStore()
const { fetchBooks } = bookStore

onMounted(async () => {
  await fetchBooks()
})
</script>

<template>
  <div class="home">
    <Header />
    <SearchBar />
    <section class="book-list">
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
}

.book-list {
  flex: 1;
  padding: 0 1rem 2rem;
  overflow-y: auto;
}
</style>
