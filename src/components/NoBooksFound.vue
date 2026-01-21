<script setup lang="ts"></script>

<template>
  <div class="no-books-container">
    <div class="no-books">
      <h2>No Books Found</h2>
    </div>
  </div>
</template>

<style scoped>
.no-books-container {
  display: flex;
  flex: 1;
  height: 100vh;
  border-radius: 10px;
  z-index: 9999;
  position: relative;
}

.no-books {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-primary-light);
}

.loading h2 {
  color: var(--color-secondary);
}
</style>
