import { supabase } from '@/lib/supabase'
import type { Book } from '@/models/Interface'
import { defineStore } from 'pinia'
import { ref, watch, type Ref } from 'vue'

export const useSupaStore = defineStore('supebase', () => {
  const selectedBook: Ref<Book | null> = ref(null)
  const libraryBooks: Ref<Book[] | null> = ref(null)
  const modalTrigger = ref(false)

  watch(modalTrigger, (isOpen) => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
  })

  async function insertData(rating: number, pepper: number) {
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
      status: selectedBook.value?.status.toLowerCase(),
      rating: rating,
      pepper: pepper,
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
          cover: e.cover,
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

  async function removedata() {
    const { error } = await supabase
      .from('user_books')
      .delete()
      .eq('book_id', selectedBook.value?.book_id)
    fetchData()

    if (error) {
      throw error
    }
  }

  return { selectedBook, insertData, fetchData, libraryBooks, removedata, modalTrigger }
})
