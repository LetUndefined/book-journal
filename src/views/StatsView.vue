<script setup lang="ts">
import StatsInformation from '@/components/StatsInformation.vue'
import { useSupaStore } from '@/stores/SupaBase';
import {  onMounted } from 'vue';
import { totalBooks, totalDnf, totalPepper, totalStar, totalReading } from '@/services/StatsLogic';
import { totalCompleted } from '@/services/StatsLogic';

const supaStore = useSupaStore()
const {fetchData} = supaStore



onMounted( async () => {
  await fetchData()
})
</script>

<template>
  <div class="container">
    <h2>Your stats</h2>
    <div class="stats-information">
      <div class="information-block">
        <StatsInformation :stat="totalBooks || 0" title="Total books" />
      </div>
      <div class="information-block">
        <StatsInformation :stat="totalCompleted" title="Completed" />
      </div>
      <div class="information-block">
        <StatsInformation :stat="totalReading" title="Reading" />
      </div>
      <div class="information-block">
        <StatsInformation :stat="totalDnf" title="DNF" />
      </div>
    </div>
    <div class="rating-container">
      <h3>Average Ratings</h3>
      <div class="ratings">
        <div class="star-rating">
          <span>{{ totalStar }}</span>
          <div class="icon">
            <font-awesome-icon v-for="n in Math.floor(totalStar)" :key="n" icon="star" style="color: gold" />
          </div>
          <span>Star Rating</span>
        </div>
        <div class="pepper-rating">
          <span>{{ totalPepper }}</span>
          <div class="icon">
            <span v-for="n in Math.floor(totalPepper)" :key="n">🌶️</span>
          </div>
          <span>Pepper Rating</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
padding: 1rem 3rem 1rem;
  display: flex;
  align-items: center;
  height: 100%;
  flex-direction: column;
  gap: 2rem;
  overflow-y: auto;

}

.stats-information {
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;
  flex-wrap: wrap;

}

.rating-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: var(--shadow-lg);
  border-radius: 10px;
  width: 100%;
  padding: 2rem;
  justify-content: center;
  gap: 1rem;
  background-color: var(--color-card-bg);

}

.ratings {
  display: flex;
  align-items: center;
  gap: 3rem;
}

.star-rating,
.pepper-rating {
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>
