import { supabase } from '@/lib/supabase'
import type { Book } from '@/models/Interface'
import { defineStore } from 'pinia'
import { ref, watch, type Ref } from 'vue'
import NoCover from '@/assets/No_cover.png'

export const useSupaStore = defineStore('supebase', () => {
  const selectedBook: Ref<Book | null> = ref(null)
  const libraryBooks: Ref<Book[] | null> = ref(null)
  const modalTrigger = ref(false)
  const bookStatus = ref('No Status')
  const localrating = ref(0.5)
  const pepperRating = ref(1)
  const filteredBooks: Ref<Book[] | null> = ref(null)

// change status format for database (add underscore)
  function convertStatusToDb(status: string): string {
    return status.toLowerCase().replace(/\s+/g, '_')
  }

  // Change status format for display (without underscore)
  function convertStatusToDisplay(status: string): string {
    return status
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }


  watch(modalTrigger, (isOpen) => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
  })

  async function insertData() {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()
    if (authError || !user) {
      throw new Error('User not authenticated')
    }
    const bookData = {
      user_id: user.id,
      book_id: selectedBook.value?.book_id,
      title: selectedBook.value?.title,
      author: selectedBook.value?.author,
      cover: selectedBook.value?.cover,
      status: convertStatusToDb(bookStatus.value),
      rating: localrating.value,
      pepper: pepperRating.value,
    }
    console.log('Book data being sent:', bookData)
    const { data, error } = await supabase.from('user_books').insert(bookData).select()
    await fetchData()



    if (error) {
      console.error('Full Supabase error:', JSON.stringify(error, null, 2))
      throw error
    }
    return data
  }

  async function fetchData() {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()
    if (authError || !user) {
      throw new Error('User not authenticated')
    }
    const { data, error } = await supabase.from('user_books').select()

    if (data) {
      libraryBooks.value = data.map((e: Book) => {
        const book: Book = {
          book_id: e.book_id,
          title: e.title,
          author: e.author,
          status: convertStatusToDisplay(e.status),
          cover: e.cover && !e.cover.includes('src/assets') ? e.cover : NoCover,
          rating: e.rating,
          pepper: e.pepper,
        }
        return book
      })
    }

    if (error) {
      throw error
    }
  }

  function loadBook(book_id: string) {
    const singleBook = libraryBooks.value?.find((e) => e.book_id === book_id)
    if (singleBook) {
      bookStatus.value = singleBook.status
      localrating.value = singleBook.rating
      pepperRating.value = singleBook.pepper
    }
  }

  async function removeData() {
    const { error } = await supabase
      .from('user_books')
      .delete()
      .eq('book_id', selectedBook.value?.book_id)
    fetchData()

    if (error) {
      throw error
    }
  }

  async function updateData() {

    const { error } = await supabase
      .from('user_books')
      .update({
        status: convertStatusToDb(bookStatus.value),
        rating: localrating.value,
        pepper: pepperRating.value,
      })
      .eq('book_id', selectedBook.value?.book_id)
    await fetchData()

    if (error) {
      throw error
    }
  }

  function filterLibraryBooks(filter: string) {
    if(filter === 'All'){
      filteredBooks.value = null
      return libraryBooks.value
    } else {
      if(libraryBooks.value)
        filteredBooks.value = libraryBooks.value?.filter((e) => e.status.toLowerCase() === filter.toLowerCase())
      return filteredBooks.value
    }
  }

  return {
    selectedBook,
    insertData,
    fetchData,
    libraryBooks,
    removeData,
    modalTrigger,
    bookStatus,
    updateData,
    localrating,
    pepperRating,
    loadBook,
    filterLibraryBooks,
    filteredBooks
  }
})
