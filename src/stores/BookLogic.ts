import type { Book, BookDetails } from '@/models/Interface'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const useBookStore = defineStore('books', () => {
  const filters = ['Reading', 'Completed', 'Thriller', 'Sci-Fi']
  const url = 'https://openlibrary.org/search.json?q=subject:'
  const books: Ref<Book[]> = ref([])

  const fetchBooks = async () => {
    try {
      const response = await fetch(`${url}dark_romance&limit=20`)
      const data = await response.json()

      const list = data.docs
      console.log(list)
      books.value = list.map((e: BookDetails) => {
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
    } catch (error) {
      console.error('Error fetching data ' + error)
    }
    console.log(books)
  }

  return { fetchBooks, filters, books }
})
