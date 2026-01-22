<script setup lang="ts">
import NavHeader from '@/components/NavHeader.vue'
import SearchBar from '@/components/SearchBar.vue'
import BookList from '@/components/BookList.vue'
import Footer from '@/components/BookFooter.vue'
import { useBookStore } from '@/stores/BookLogic'

import IsLoading from '@/components/IsLoading.vue'
import { storeToRefs } from 'pinia'
import NoBooksFound from '@/components/NoBooksFound.vue'
import BookModal from '@/components/BookModal.vue'
import { modalTrigger } from '@/composables/modal'
import { useSupaStore } from '@/stores/SupaBase'

const bookStore = useBookStore()
const { isLoading } = storeToRefs(bookStore)
const { noBook } = storeToRefs(bookStore)

const supaStore = useSupaStore()
const {selectedBook} = storeToRefs(supaStore)


</script>

<template>
  <div class="container">
    <div class="book-modal">
      <BookModal v-if="modalTrigger && selectedBook" :book="selectedBook"/>
    </div>

    <div class="loading" v-if="isLoading">
      <IsLoading />
    </div>

    <div class="home">

      <NavHeader />
      <SearchBar />
      <section class="book-list">
        <NoBooksFound v-if="noBook" />

        <BookList />
      </section>

      <Footer />
    </div>
  </div>
</template>

<style scoped>

.container{
  position: relative;
}

.book-modal{
  position: absolute;
  z-index: 9999;
}
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
  position: relative;
}

.loading {
  position: absolute;
}
</style>
