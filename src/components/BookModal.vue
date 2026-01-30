<script setup lang="ts">
import type { Book } from '@/models/Interface'
import { useSupaStore } from '@/stores/SupaBase'
import { storeToRefs } from 'pinia'
import BookChips from './BookChips.vue'
import ModalComponent from './ModalComponent.vue'

const supaStore = useSupaStore()
const { insertData, removeData, updateData } = supaStore
const {
  libraryBooks,
  selectedBook,
  modalTrigger,
  bookStatus,
  localrating,
  pepperRating,
  selectedYear,
} = storeToRefs(supaStore)

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
    localrating.value = 0
    pepperRating.value = 0
    bookStatus.value = ''
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
  <ModalComponent @close="handleClose">
    <div class="book-details">
      <div class="book-header">
        <h2 class="book-title">{{ book.title }}</h2>
        <p class="book-author">by {{ book.author }}</p>
      </div>

      <div class="section">
        <label class="section-label">Status</label>
        <div class="chips">
          <BookChips :chip="bookStatus" @save-status="setStatus" />
        </div>
      </div>

      <div class="section">
        <label class="section-label">Reading Year</label>
        <div class="year-selector">
          <v-select
            label="Year"
            :items="[2024, 2025, 2026]"
            variant="outlined"
            v-model="selectedYear"
          ></v-select>
        </div>
      </div>

      <div class="section">
        <label class="section-label">Your Rating</label>
        <div class="rating">
          <star-rating
            v-model="localrating"
            :rating="localrating"
            :increment="0.5"
            :show-rating="false"
            :star-size="35"
            @update:rating="setRating"
          />
        </div>
      </div>

      <div class="section">
        <label class="section-label">Spice Level</label>
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
          Update Information
        </button>
        <button
          v-if="selectedBook?.book_id && checkBook(selectedBook?.book_id)"
          class="remove"
          @click="handleRemoveBook()"
        >
          Remove From Library
        </button>
      </div>
    </div>
  </ModalComponent>
</template>

<style scoped>
.book-details {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  max-width: 450px;
  padding: 0.5rem;
}

.book-header {
  text-align: center;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.book-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: #ffffff;
  line-height: 1.3;
}

.book-author {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  font-style: italic;
}

.section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
}

.section-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.chips {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.search-type-select {
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 500;
  padding: 0.5rem;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-card-bg);
  color: var(--color-text);
  width: 100%;
}



.rating {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  width: 100%;
}

.pepper-rating {
  display: flex;
  gap: 0.5rem;
  font-size: 35px;
  cursor: pointer;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  transition: all 0.2s ease;
}

.pepper-rating:hover {
  background-color: rgba(255, 255, 255, 0.08);
}

.pepper {
  user-select: none;
  transition: all 0.2s ease;
  transform: scale(1);
}

.pepper:hover:not(.inactive) {
  transform: scale(1.15);
}

.pepper.inactive {
  filter: grayscale(100%);
  opacity: 0.3;
}

.btn {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 1rem;
  flex-wrap: wrap;
}

.btn > * {
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  background-color: var(--color-secondary);
  color: #000000;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.95rem;
  text-transform: capitalize;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.btn > *:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  filter: brightness(1.1);
}

.btn > *:active {
  transform: translateY(0);
}

.btn .submit {
  background-color: var(--color-secondary);
  color: #000000;
}

.btn .remove {
  background-color: #ff6b6b;
  color: #ffffff;
  border: 1px solid #ff4444;
}

.btn .remove:hover {
  background-color: #ff5252;
}

.btn .update {
  background-color: var(--color-secondary);
  color: #000000;
}

.btn .update:hover {
  background-color: var(--color-secondary);
}
</style>
