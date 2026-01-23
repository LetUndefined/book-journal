<script setup lang="ts">
import { modalTrigger } from '@/composables/modal'
import type { Book } from '@/models/Interface'
import { useSupaStore } from '@/stores/SupaBase'

const supaStore = useSupaStore()
const { insertData } = supaStore

defineProps<{
  book: Book
}>()

async function handleAddBook() {
  try {
    await insertData()
    alert('Booked added succesfully!')
  } catch (error) {
    console.error(error)
    alert('Book add failed')
  }
}
</script>

<template>
  <div class="modal-container" @click="modalTrigger = false">
    <div class="modal-content" @click.stop>
      <span class="close" @click.prevent="modalTrigger = false">&times;</span>
      <p>Title: {{ book.title }}</p>
      <p>Author: {{ book.author }}</p>
      <p>Status: {{ book.status }}</p>
      <button class="submit" @click="handleAddBook()">Add Book</button>
    </div>
  </div>
</template>

<style scoped>
.modal-container {
  display: flex;
  flex: 1;
  height: 100vh;
  border-radius: 10px;
  width: 100vw;
  z-index: 9999;
  background-color: rgba(128, 128, 128, 0.466);
  justify-content: center;
  align-items: center;
}

.modal-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--color-primary);
  width: 300px;
  height: 400px;
  border-radius: 10px;
  color: #ffffff;
  gap: 0.5rem;
  border: 1px solid rgb(255, 255, 255);
}

.submit {
  margin-top: 1rem;
  border-radius: 10px;
  width: 6rem;
}
</style>
