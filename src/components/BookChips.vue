<script setup lang="ts">
import { ref } from 'vue'

const status = ref(['Reading', 'Completed', 'DNF'])

const emit = defineEmits<{
  (e: 'save-status', statusChip: string): void
}>()
</script>

<template>
  <v-chip v-for="(chip, index) in status" :key="index" @click="emit('save-status', chip)">
    {{ chip }}
  </v-chip>
</template>
