<script setup lang="ts">
import NavHeader from '@/components/NavHeader.vue';
import BookFooter from '@/components/BookFooter.vue';
import { RouterView } from 'vue-router';

</script>

<template>
  <NavHeader/>
  <RouterView/>
  <BookFooter/>


</template>
