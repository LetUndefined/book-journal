<script setup lang="ts">
defineProps<{
  stat: number
  title: string
}>()
</script>

<template>
  <div class="block-container">
    <h3>{{ stat }}</h3>
    <p>{{ title }}</p>
  </div>
</template>

<style scoped>
.block-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 0px 10px -2px black;
  border-radius: 10px;
  width: 9rem;
  height: 9rem;
  justify-content: center;
  background-color: var(--color-card-bg);
}

.block-container h3{
  font-size: 24px;
}
</style>
