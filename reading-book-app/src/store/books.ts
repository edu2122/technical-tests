import { create } from 'zustand'
import { type Book, type Filters } from '../../types'
import { persist } from 'zustand/middleware'

interface State {
  books: Book[]
  search: string
  readingList: Book[]
  fetchBooks: (search: string) => Promise<void>
  addToReadingList: (bookId: string) => void
  removeToReadingList: (bookId: string) => void
  filters: Filters
}

export const useBookStore = create<State>()(
  persist(
    (set, get) => ({
      search: '',
      books: [],
      filters: {
        genre: 'All',
        pages: 40
      },
      readingList: [],
      fetchBooks: async (search: string) => {
        try {
          const response = await fetch('http://localhost:5173/books.json')
          const data = await response.json()
          const booksInfo = data.library.map(
            (item: { book: Book[] }) => item.book
          )
          if (search === '') return set({ books: booksInfo })
          const searchBooks = booksInfo.filter((book: Book) =>
            book.title.toLowerCase().includes(search.toLowerCase())
          )

          set({ books: searchBooks })
        } catch (error) {
          throw new Error(`Error fetching books: ${error}`)
        }
      },
      addToReadingList: (bookId: string) => {
        const { readingList, books } = get()

        const index = readingList.findIndex((book) => book.ISBN === bookId)
        if (index === -1) {
          // El libro no está en la lista de lectura, lo añadimos
          const addBookToReadingList = books.find((book) => book.ISBN === bookId)

          if (addBookToReadingList) {
            set({ readingList: [...readingList, addBookToReadingList] })
          }
        }
      },
      removeToReadingList: (bookId: string) => {
        const { readingList } = get()
        const index = readingList.findIndex((book) => book.ISBN === bookId)
        if (index !== -1) {
          // El libro está en la lista de lectura, lo eliminamos
          const newReadingList = readingList.filter(
            (book) => book.ISBN !== bookId
          )
          set({ readingList: newReadingList })
        } // No se realizan cambios si no se encuentra el libro
      } // Agrega un nuevo método para actualizar el filtro y obtener la lista filtrada
    }),
    {
      name: 'book-storage',
      getStorage: () => localStorage
    }
  )
)
