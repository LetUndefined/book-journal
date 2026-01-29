<script setup lang="ts">
import ButtonComponent from '@/components/ButtonComponent.vue'
import ModalComponent from '@/components/ModalComponent.vue'
import { useAuthStore } from '@/stores/Auth'

import { useSupaStore } from '@/stores/SupaBase'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { storeToRefs } from 'pinia'
import { computed, onMounted } from 'vue'

const authStore = useAuthStore()
const { profileInformation, readingGoal } = storeToRefs(authStore)
const {saveProfile} = authStore


const supaStore = useSupaStore()
const {libraryBooks, modalTriggerComponent} = storeToRefs(supaStore)
const {fetchData} = supaStore





const getProgress = computed(() => {
  const getTotal = libraryBooks.value?.filter((e) => e.status === 'Completed')
  return getTotal?.length
})

const saveChange = async () => {
  modalTriggerComponent.value = false
  await saveProfile()
}

onMounted( async() => {
await fetchData()
if(profileInformation.value?.reading_goal)
  readingGoal.value = profileInformation.value.reading_goal!
})
</script>

<template>
  <ModalComponent v-if="modalTriggerComponent" @save-change="saveChange"/>

  <div class="profile-container">
    <div class="profile-header">
      <div class="avatar">
        {{ profileInformation?.display_name?.charAt(0).toUpperCase() }}
      </div>
      <h1 class="display-name">{{ profileInformation?.display_name }}</h1>
    </div>

    <div class="stats-card">
      <div class="stats-header">
        <h2>Reading Goal</h2>
      </div>

      <div class="progress-section">
        <div class="progress-stats">
          <div class="stat-item">
            <span class="stat-number">{{ getProgress }}</span>
            <span class="stat-label">Read</span>
          </div>
          <div class="stat-divider">/</div>
          <div class="stat-item">
            <span class="stat-number">{{ readingGoal }}</span>
            <span class="stat-label">Goal</span>
          </div>
        </div>

        <v-progress-linear
          :model-value="getProgress"
          :height="12"
          :max="readingGoal"
          rounded
          color="var(--color-primary)"
          bg-color="var(--color-primary)"
        ></v-progress-linear>

        <p class="progress-percentage">
          {{ readingGoal > 0 ? Math.round((getProgress / readingGoal) * 100) : 0 }}% Complete
        </p>
      </div>
       <ButtonComponent
          :prepend-icon="faPenToSquare"
          @open-modal="modalTriggerComponent = true"
        >
          Edit Goal
        </ButtonComponent>
    </div>
  </div>
</template>


<style scoped>
.profile-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 2.5rem;
  background-color: var(--color-card-bg);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-md);
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-weight: bold;
  color: white;
  box-shadow: var(--shadow-lg);
  border: 3px solid var(--color-border);
}

.display-name {
  font-size: 2rem;
  font-weight: 600;
  margin: 0;
  color: var(--color-text);
  font-family: var(--font-display);
}

.stats-card {
  background-color: var(--color-card-bg);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  box-shadow: var(--shadow-md);
}

.stats-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.stats-header h2 {
  margin: 0;
  font-size: 1.5rem;
  color: var(--color-text);
  font-weight: 600;
  font-family: var(--font-display);
}

.progress-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.progress-stats {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  padding: 2rem;
  border-radius: var(--radius-md);
  background-color: rgba(139, 123, 168, 0.08);
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.stat-number {
  font-size: 3.5rem;
  font-weight: bold;
  color: var(--color-primary);
  line-height: 1;
  font-family: var(--font-display);
}

.stat-label {
  font-size: 0.9rem;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 600;
}

.stat-divider {
  font-size: 3rem;
  color: var(--color-border);
  font-weight: 300;
}

.progress-percentage {
  text-align: center;
  font-size: 1.1rem;
  color: var(--color-text);
  margin: 0;
  font-weight: 500;
}


</style>
