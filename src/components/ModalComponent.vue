<script setup lang="ts">
const emit = defineEmits<{
  (e: 'close'): void
}>()

function handleClose() {
  emit('close')
}
</script>

<template>
  <div class="modal-container" @click="handleClose()">
    <div class="modal-content" @click.stop>
      <span class="close" @click="handleClose()">X</span>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  justify-content: center;
  align-items: center;
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal-content {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--color-primary);
  width: 400px;
  padding: 2.5rem 2rem;
  border-radius: 16px;
  color: #ffffff;
  gap: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  animation: slideIn 0.3s ease-in-out;
}

@keyframes slideIn {
  from {
    transform: translateY(-40px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.close {
  position: absolute;
  top: 12px;
  right: 12px;
  font-size: 24px;
  font-weight: bold;
  padding: 0.5rem;
  cursor: pointer;
  color: var(--color-text);
  transition: all 0.2s ease;
  border-radius: 6px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: #ffffff;
}


</style>
