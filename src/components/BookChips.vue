<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  chip: string
}>()

const status = ref(['Want to read', 'Reading', 'Completed', 'DNF'])
const isActive = computed(() =>
  status.value.findIndex((s) => s.toLowerCase() === props.chip.toLowerCase()),
)

const emit = defineEmits<{
  (e: 'save-status', statusChip: string): void
}>()

const handleEmit = (chip: string) => {
  emit('save-status', chip)
}
</script>

<template>
  <v-chip
    v-for="(chip, index) in status"
    :key="index"
    @click="handleEmit(chip)"
    :class="{ active: isActive === index }"
  >
    {{ chip }}
  </v-chip>
</template>

<style scoped>
.active {
  box-shadow: 0px 0px 10px -4px black;
  border: 1px solid white;
}
</style>
