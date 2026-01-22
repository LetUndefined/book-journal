<script setup lang="ts">

const props = defineProps<{
  book: {
    title: string,
    author: string,
    status: string,
    cover?: string
  }
}>()

</script>


<template>
  <div class="modal-container">

    <div id="myModal" class="modal">

    <div class="modal-content">
      <span class="close">&times;</span>
      <p>{{ props.book.title }}</p>
      <p>{{ props.book.author }}</p>
      <p>{{ props.book.status }}</p>
      <button class="submit">Add Book</button>
    </div>
  </div>

</div>
</template>

<style scoped>
.modal-container {
  display: none;
  flex: 1;
  height: 100vh;
  border-radius: 10px;
  z-index: 9999;
  background-color: rgba(128, 128, 128, 0.466);

}

.modal{
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}


</style>
