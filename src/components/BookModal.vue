<script setup lang="ts">
import { modalTrigger } from '@/composables/modal';
import type { Book } from '@/models/Interface';
import { useSupaStore } from '@/stores/SupaBase';



const supaStore = useSupaStore()
const {insertData} = supaStore



defineProps<{
  book: Book
}>()

async function handleAddBook() {
  try{
    await insertData()
    alert('Booked added succesfully!')
  } catch(error){
  console.error(error)
  alert('Book add failed')
  }
}

</script>


<template>
  <div class="modal-container" @click.stop="modalTrigger = false">

    <div id="myModal" class="modal">

    <div class="modal-content">
      <span class="close">&times;</span>
      <p>Title: {{ book.title }}</p>
      <p>Author: {{ book.author }}</p>
      <p>Status: {{ book.status }}</p>
      <button class="submit" @click="handleAddBook()">Add Book</button>
    </div>
  </div>

</div>
</template>

<style scoped>
.modal-container {
  display: flex;
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

.modal-content{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--color-primary);
  width: 300px;
  height: 400px;
  border-radius: 10px;
  color: #ffffff;
  gap: 0.5rem;
  border: 1px solid rgb(255, 255, 255);
}

.submit{
  margin-top: 1rem;
    border-radius: 10px;
    width: 6rem;

}


</style>
