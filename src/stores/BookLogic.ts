import type { Book, BookDetails } from '@/models/Interface'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const useBookStore = defineStore('books', () => {
  const inputValue = ref('')
  const filters = ['Reading', 'Completed', 'Thriller', 'Sci-Fi']
  const url = 'https://openlibrary.org/search.json?q=subject:'
  const books: Ref<Book[]> = ref([])
  const isLoading = ref(true)
  const noBook = ref(false)

  const fetchBooks = async () => {
    isLoading.value = true

    try {
      const response = await fetch(`${url}dark_romance&limit=20`)
      const data = await response.json()

      const list = data.docs
      transformData(list)
    } catch (error) {
      console.error('Error fetching data ' + error)
    }
    isLoading.value = false
  }

  const fetchSelectedBook = async (inputValue: string) => {
    noBook.value = false
    isLoading.value = true
    try {
      const response = await fetch(`https://openlibrary.org/search.json?q=${inputValue}`)
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

  function transformData(data: any) {
    books.value = data
      .filter((e: BookDetails) => e.author_name && e.author_name.length > 0)
      .map((e: BookDetails) => {
        const book = {
          status: 'Reading',
          author: e.author_name[0],
          title: e.title,
          cover: e.cover_edition_key
            ? `https://covers.openlibrary.org/b/olid/${e.cover_edition_key}-M.jpg`
            : '/src/assets/No_cover.jpg',
        }
        return book
      })
  }

  return { fetchBooks, filters, books, inputValue, fetchSelectedBook, isLoading, noBook }
})
