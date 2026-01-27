<script setup lang="ts">
import type { Book } from '@/models/Interface'
import { useSupaStore } from '@/stores/SupaBase'
import { storeToRefs } from 'pinia'
import BookChips from './BookChips.vue'

const supaStore = useSupaStore()
const { insertData, removeData, updateData } = supaStore
const { libraryBooks, selectedBook, modalTrigger, bookStatus, localrating, pepperRating } =
  storeToRefs(supaStore)



defineProps<{
  book: Book
  inLibrary: boolean
}>()

async function handleAddBook() {
  try {
    await insertData()
    modalTrigger.value = false
    selectedBook.value = null
  } catch {
    alert('Failed adding book, make sure to select every option')
    selectedBook.value = null
  }
}

async function handleRemoveBook() {
  try {
    await removeData()
    modalTrigger.value = false
    selectedBook.value = null
  } catch (error) {
    console.error(error)
    alert('Failed removing book')
    selectedBook.value = null
  }
}

function handleClose() {
  modalTrigger.value = false
  selectedBook.value = null
}

function checkBook(book_id: string) {
  return libraryBooks.value?.find((e) => e.book_id == book_id)
}

function setRating(newRating: number) {
  if (selectedBook.value) localrating.value = newRating
}

function setPepperRating(newPepper: number) {
  if (selectedBook.value) pepperRating.value = newPepper

}

function setStatus(chip: string) {
  bookStatus.value = chip

}

async function handleBookUpdate() {
  try {
    modalTrigger.value = false
    await updateData()
  } catch (error) {
    throw error
  }
}
</script>

<template>
  <div class="modal-container" @click="handleClose">
    <div class="modal-content" @click.stop>
      <span class="close" @click="handleClose">X</span>
      <p>Title: {{ book.title }}</p>
      <p>Author: {{ book.author }}</p>
      <div class="chips">
        <BookChips @save-status="setStatus" />
      </div>
      <div class="rating">
        <star-rating
          v-model="localrating"
          :rating="localrating"
          :increment="0.5"
          :show-rating="false"
          :star-size="35"
          @update:rating="setRating"
        />
        <div class="pepper-rating">
          <span
            v-for="n in 5"
            :key="n"
            @click="setPepperRating(n)"
            class="pepper"
            :class="{ inactive: n > pepperRating }"
            >🌶️</span
          >
        </div>
      </div>
      <div class="btn">
        <button class="submit" v-if="!inLibrary" @click="handleAddBook()">Add To Library</button>
        <button class="update" v-if="inLibrary" @click="handleBookUpdate()">
          Update information
        </button>
        <button
          v-if="selectedBook?.book_id && checkBook(selectedBook?.book_id)"
          class="remove"
          @click="handleRemoveBook()"
        >
          Remove From library
        </button>
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
  width: 400px;
  height: 500px;
  border-radius: 10px;
  color: #ffffff;
  gap: 1.5rem;
  border: 1px solid rgb(255, 255, 255);
}

.close {
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
}

.btn > * {
  padding: 0.25rem;
  border-radius: 10px;
  background-color: var(--color-secondary);
  color: black;
}

.chips {
  display: flex;
  gap: 1rem;
}

.rating {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.pepper-rating {
  display: flex;
  gap: 0.5rem;
  font-size: 35px;
  cursor: pointer;
}

.pepper {
  user-select: none;
}

.pepper.inactive {
  filter: grayscale(100%);
  opacity: 0.4;
}
</style>
