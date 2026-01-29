<script setup lang="ts">
import { useBookStore } from '@/stores/BookLogic'
import { storeToRefs } from 'pinia'

const bookStore = useBookStore()
const { inputValue } = storeToRefs(bookStore)
const { fetchSelectedBook } = bookStore

const getSelectedBook = (value: string) => {
  inputValue.value = ''
  fetchSelectedBook(value.toString())
}
</script>

<template>
  <div class="search-bar-container">
    <div class="search-bar-input-wrapper">
      <input
        type="text"
        class="search-bar-input"
        placeholder="Search books..."
        v-model="inputValue"
        @keyup.enter="getSelectedBook(inputValue)"
      />
      <input
        type="button"
        class="btn"
        value="Search"
        placeholder="Search"
        @click.enter="getSelectedBook(inputValue)"
      />
    </div>
  </div>
</template>

<style scoped>
.search-bar-container {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.search-bar-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  background: var(--color-card-bg);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 0 1rem;
  transition: all var(--transition-normal);
  box-shadow: 0px 0px 10px -5px;
}

.search-bar__icon {
  width: 20px;
  height: 20px;
  color: var(--color-text-muted);
  flex-shrink: 0;
}

.btn {
  font-family: var(--font-body);
  font-size: 0.8125rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border: 1.5px solid var(--color-border);
  border-radius: 100px;
  background: var(--color-card-bg);
  color: var(--color-text-muted);
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
}

.search-bar-input {
  flex: 1;
  border: none;
  background: transparent;
  padding: 0.875rem 0.75rem;
  font-family: var(--font-body);
  font-size: 1rem;
  color: var(--color-text);
  outline: none;
  width: 100%;
}

.search-bar-filters {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding-bottom: 2px;
}

.search-bar-filter {
  font-family: var(--font-body);
  font-size: 0.8125rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border: 1.5px solid var(--color-border);
  border-radius: 100px;
  background: var(--color-card-bg);
  color: var(--color-text-muted);
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  transition: all var(--transition-fast);
}

.search-bar-filter:active {
  transform: scale(0.96);
}

.search-bar-filter--active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: white;
}
</style>
