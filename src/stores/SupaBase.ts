import { supabase } from "@/lib/supabase"
import type { Book } from "@/models/Interface"
import { defineStore } from "pinia"
import { ref, type Ref } from "vue"

export const useSupaStore = defineStore('supebase', () => {

  const selectedBook: Ref<Book | null> = ref(null)
  const libraryBooks: Ref<Book[] | null> = ref(null)

  async function insertData(){

    const {data: {user}, error: authError } = await supabase.auth.getUser()
    if(authError || !user){
      throw new Error ('User not authenticated')
    }
    const bookData = {
      user_id: user.id,
      book_id: selectedBook.value?.book_id,
      title: selectedBook.value?.title,
      author: selectedBook.value?.author,
      cover: selectedBook.value?.cover,
      status: selectedBook.value?.status.toLowerCase()
    }
    const {data, error} = await supabase
    .from('user_books')
    .insert(bookData)
    .select()

    if(error){
      throw error
    }
    return data
  }

  async function fetchData(){

    const {data: {user}, error: authError } = await supabase.auth.getUser()
    if(authError || !user){
      throw new Error ('User not authenticated')
    }
    const {data, error} = await supabase
    .from('user_books')
    .select()

    if(data){
     libraryBooks.value =  data.map((e: Book) => {
      const book: Book = {
        book_id: e.book_id,
        title: e.title,
        author: e.author,
        status: e.status
      }
      return book
     })
    }

    if(error){
      throw error
    }
  }



  return { selectedBook, insertData, fetchData, libraryBooks }
})
