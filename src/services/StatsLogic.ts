import { useSupaStore } from '@/stores/SupaBase'
import { storeToRefs } from 'pinia'

const supaStore = useSupaStore()
const { libraryBooks, selectedYear } = storeToRefs(supaStore)
import { computed } from 'vue'

const filteredLibrary = computed(() => {
  return libraryBooks.value?.filter((e) => e.year_read === selectedYear.value)
})


export const totalBooks = computed(() => {
  return libraryBooks.value?.filter((e) => e.year_read === selectedYear.value).length
})

const bookStatus = (status: string) =>
  computed(() => libraryBooks.value?.filter((e) => e.status === status && e.year_read === selectedYear.value).length ?? 0)

export const totalCompleted = bookStatus('Completed')
export const totalReading = bookStatus('Reading')
export const totalDnf = bookStatus('Dnf')

export const totalStar = computed(() => {
   if(filteredLibrary.value){
    const totalRating = filteredLibrary.value?.map((e) => e.rating)
    let numbers = 0
    totalRating?.forEach((e) => (numbers += e))
    if (totalRating && totalRating.length > 0) numbers = numbers / totalRating?.length
    return Number(numbers.toFixed(1))
  }

  return 0
})

export const totalPepper = computed(() => {
   if(filteredLibrary.value){
    const totalRating = filteredLibrary.value?.map((e) => e.pepper)
    let numbers = 0
    totalRating?.forEach((e) => (numbers += e))
    if (totalRating && totalRating.length > 0) numbers = numbers / totalRating?.length
    return Number(numbers.toFixed(1))
  }
  return 0
})
