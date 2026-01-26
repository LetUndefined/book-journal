import { supabase } from '@/lib/supabase'
import type { Book } from '@/models/Interface'
import { defineStore } from 'pinia'
import { ref, watch, type Ref } from 'vue'
import NoCover from '@/assets/No_cover.png'

export const useSupaStore = defineStore('supebase', () => {
  const selectedBook: Ref<Book | null> = ref(null)
  const libraryBooks: Ref<Book[] | null> = ref(null)
  const modalTrigger = ref(false)
  const bookStatus = ref('Want to read')
  const localrating = ref(1)
  const pepperRating = ref(1)

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
      status: bookStatus.value.toLowerCase(),
      rating: localrating.value,
      pepper: pepperRating.value,
    }
    console.log('Book data being sent:', bookData)
    const { data, error } = await supabase.from('user_books').insert(bookData).select()

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
          status: e.status,
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
    console.log(selectedBook.value?.book_id)

    const { error } = await supabase
      .from('user_books')
      .update({
        status: bookStatus.value.toLowerCase(),
        rating: localrating.value,
        pepper: pepperRating.value,
      })
      .eq('book_id', selectedBook.value?.book_id)
    await fetchData()

    if (error) {
      throw error
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
  }
})
