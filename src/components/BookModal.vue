<script setup lang="ts">
import type { Book } from '@/models/Interface'
import { useSupaStore } from '@/stores/SupaBase'
import { storeToRefs } from 'pinia'

const supaStore = useSupaStore()
const { insertData } = supaStore
const { removedata } = supaStore
const {modalTrigger } = storeToRefs(supaStore)
const {selectedBook} = storeToRefs(supaStore)
const {libraryBooks} = storeToRefs(supaStore)



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

async function handleRemoveBook(){
  try{
    await removedata()
    alert(' Book deleted from library')
  } catch(error){
    console.error(error)
    alert('Failed removing book')
  }
}

function handleClose() {
  modalTrigger.value = false
  selectedBook.value = null
}

function checkBook(book_id: string){
 return libraryBooks.value?.find((e) => e.book_id == book_id)
}

</script>

<template>
  <div class="modal-container" @click="handleClose" >
    <div class="modal-content" @click.stop>
      <span class="close" @click="handleClose" >X</span>
      <p>Title: {{ book.title }}</p>
      <p>Author: {{ book.author }}</p>
      <p>Status: {{ book.status }}</p>
      <div class="btn">
        <button class="submit" @click="handleAddBook()">Add To Library</button>
        <button v-if="selectedBook?.book_id && checkBook(selectedBook?.book_id)" class="remove" @click="handleRemoveBook()" >Remove From library</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-container {
  display: flex;
  flex: 1;
  border-radius: 10px;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  background-color: rgba(128, 128, 128, 0.466);
  justify-content: center;
  align-items: center;
}

.modal-content {
  position: relative;
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

.close{
  position: absolute;
  top: 0;
  right: 0;
  font-size: 20px;
  padding: 1rem;
}

.btn {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
  width: 16rem;
}

.btn > * {
  padding: 0.25rem;
  border-radius: 10px;


}
</style>
