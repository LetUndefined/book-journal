<script setup lang="ts">
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'

defineProps<{
  prependIcon: IconDefinition
}>()

const emit = defineEmits<{
  (e: 'openModal'): void
}>()
</script>

<template>
  <div class="text-center">
    <v-btn @click="emit('openModal')" rounded="xl">
      <font-awesome-icon :icon="prependIcon" />

      <slot></slot>
    </v-btn>
  </div>
</template>
