<script setup lang="ts">
import type { Book } from '@/models/Interface'
import { faPepperHot, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const props = defineProps<{
  book_id: string
  status: string
  title: string
  author?: string
  cover?: string
  rating: number
  pepper: number
}>()

const emit = defineEmits<{
  (e: 'save-book', book: Book): void
}>()

const handleClick = () => {
  emit('save-book', props)
}
</script>

<template>
  <div class="book-card" @click="handleClick">
    <div class="book-card-cover">
      <img :src="props.cover" alt="" class="cover-image" />
      <div class="book-card-badge">{{ props.status }}</div>
    </div>

    <div class="book-card-content">
      <h3 class="book-card-title">{{ props.title }}</h3>
      <p class="book-card-author">{{ props.author }}</p>

      <div class="book-card-rating">
        <div class="book-card-stars"><FontAwesomeIcon :icon="faStar" /> {{ props.rating }}</div>
        <div class="book-card-peppers">
          <FontAwesomeIcon :icon="faPepperHot" /> {{ props.pepper }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.book-card {
  background: var(--color-card-bg);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  display: flex;
  flex-direction: column;
  box-shadow: 0px 2px 5px -2px;

}

.book-card:active {
  transform: scale(0.98);
}

.book-card-cover {
  position: relative;
  width: 100%;
  height: 300px;
  overflow: visible;
}

.cover-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.book-card-cover-placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.book-card-cover-placeholder svg {
  width: 40px;
  height: 40px;
  color: rgba(255, 255, 255, 0.3);
}

.book-card-badge {
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
  background: linear-gradient(to bottom right, var(--color-card-bg), var(--color-secondary));
  box-shadow: var(--shadow-lg);
  border: 1px solid rgb(124, 124, 124);
  color: rgb(0, 0, 0);
  font-size: 0.6rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 0.25rem 0.5rem;
  border-radius: 10px;
}

.book-card-content {
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
}

.book-card-title {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text);
  line-height: 1.3;
}

.book-card-author {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  font-weight: 400;
}

.book-card-rating {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: auto;
}
</style>
