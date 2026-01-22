<script setup lang="ts">
const props = defineProps<{
  status: string
  title: string
  author: string
  cover?: string
}>()

const emit = defineEmits<{
  (e: 'save-book', book: object): void
}>()

</script>

<template>
  <div class="book-card" @click="emit('save-book', props)">
    <div class="book-card__cover">
      <img :src="props.cover" alt="" class="cover-image" />
      <div class="book-card__badge">{{ props.status }}</div>
    </div>

    <div class="book-card__content">
      <h3 class="book-card__title">{{ props.title }}</h3>
      <p class="book-card__author">{{ props.author }}</p>

      <div class="book-card__rating">
        <div class="book-card__stars"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.book-card {
  background: var(--color-card-bg);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
}

.book-card:active {
  transform: scale(0.98);
}

.book-card__cover {
  position: relative;
  aspect-ratio: 3 / 4;
}

.cover-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.book-card__cover-placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.book-card__cover-placeholder svg {
  width: 40px;
  height: 40px;
  color: rgba(255, 255, 255, 0.3);
}

.book-card__badge {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: var(--color-accent);
  color: var(--color-primary);
  font-size: 0.625rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 0.25rem 0.5rem;
  border-radius: 100px;
}

.book-card__content {
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.book-card__title {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text);
  line-height: 1.3;
  display: -webkit-box;
  overflow: hidden;
}

.book-card__author {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  font-weight: 400;
}
</style>
