<script setup lang="ts">

  
</script>

<template>
  <div class="loading-container">
    <div class="loading">
      <h2>Loading...</h2>
    </div>
  </div>
</template>

<style scoped>
.loading-container {
  display: flex;
  flex: 1;
  height: 100vh;
  border-radius: 10px;
  z-index: 9999;
  position: relative;
}

.loading {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-primary-light);
}

.loading h2 {
  animation: pulse infinite 2s;
  color: var(--color-secondary);
}

@keyframes pulse {
  0% {
    opacity: 0.5;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0.5;
  }
}
</style>
