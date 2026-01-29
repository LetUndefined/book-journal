import { useSupaStore } from "@/stores/SupaBase"
import { storeToRefs } from "pinia"

const supaStore = useSupaStore()
const {libraryBooks} = storeToRefs(supaStore)
import { computed } from "vue"


export const totalBooks = computed(() => {
  return libraryBooks.value?.length
})


const bookStatus = (status: string) =>
  computed(() => libraryBooks.value?.filter((e) => e.status === status).length ?? 0)

export const totalCompleted = bookStatus('Completed')
export const totalReading = bookStatus('Reading')
export const totalDnf = bookStatus('Dnf')




export const totalStar = computed(() => {
  const totalRating = libraryBooks.value?.map((e) => e.rating)
  let numbers = 0
    totalRating?.forEach((e) => numbers += e  )
  if(totalRating)  numbers = numbers / totalRating?.length
return Number(numbers.toFixed(1))
})

export const totalPepper = computed(() => {
  const totalRating = libraryBooks.value?.map((e) => e.rating)
  let numbers = 0
    totalRating?.forEach((e) => numbers += e  )
  if(totalRating)  numbers = numbers / totalRating?.length
return Number(numbers.toFixed(1))
})
