<script setup lang="ts">
defineProps<{
  title: string
  value: number
  total: number
}>()
</script>

<template>
  <div class="container-content">
    <div class="title">
      <p>{{ title }}</p>
    </div>
    <div class="progress-bar">
      <v-progress-linear
        :model-value="value"
        :height="12"
        :max="100"
        rounded
        color="var(--color-primary)"
        bg-color="var(--color-primary)"
      ></v-progress-linear>
    </div>
    <div class="total">
      <p>{{ total }}</p>
    </div>
  </div>
</template>

<style scoped>
.container-content{
  display: flex;
  align-items: center;
  gap: 1rem;
}

.progress-bar {
  flex: 1;
}
</style>
