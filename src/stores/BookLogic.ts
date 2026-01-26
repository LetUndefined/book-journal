import type { Book, Doc } from '@/models/Interface'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import NoCover from '@/assets/No_cover.png'

export const useBookStore = defineStore('books', () => {
  const inputValue = ref('')
  const filters = ['Reading', 'Completed', 'Thriller', 'Sci-Fi']
  // const url = 'https://openlibrary.org/search.json?q=subject:'
  const books: Ref<Book[]> = ref([])
  const isLoading = ref(false)
  const noBook = ref(false)

  const fetchSelectedBook = async (inputValue: string) => {
    noBook.value = false
    isLoading.value = true
    try {
      const response = await fetch(`https://openlibrary.org/search.json?q=${inputValue}&limit=20`)
      const data = await response.json()

      if (data.docs && data.docs.length > 0) {
        transformData(data.docs)
        isLoading.value = false
        console.log('Done Fetching ' + inputValue)
      } else {
        console.log('No books found')
        books.value = []
        noBook.value = true
        isLoading.value = false
      }
    } catch (error) {
      console.error('Error fetching selected book: ' + error)
    }
  }

  function transformData(data: Doc[]) {
    books.value = data
      .filter((e: Doc) => e.author_name && e.author_name.length > 0)
      .map((e: Doc) => {
        const book: Book = {
          book_id: e.key,
          status: 'Reading',
          author: e.author_name && e.author_name.length > 0 ? e.author_name[0] : 'unknown author',
          title: e.title,
          cover: e.cover_edition_key
            ? `https://covers.openlibrary.org/b/olid/${e.cover_edition_key}-M.jpg`
            : NoCover,
          rating: 0,
          pepper: 0,
        }
        return book
      })
  }

  return { filters, books, inputValue, fetchSelectedBook, isLoading, noBook }
})
