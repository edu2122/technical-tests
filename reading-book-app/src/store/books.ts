import { create } from 'zustand'
import { type Book, type Filters } from '../../types'
import { persist } from 'zustand/middleware'

interface State {
  books: Book[]
  readingList: Book[]
  fetchBooks: () => Promise<void>
  addToReadingList: (bookId: string) => void
  removeToReadingList: (bookId: string) => void
  filters: Filters
}

export const useBookStore = create<State>()(
  persist(
    (set, get) => ({
      books: [],
      filters: {
        genre: 'All',
        pages: 40
      },
      readingList: [],
      fetchBooks: async () => {
        const response = await fetch('http://localhost:5174/books.json')
        const data = await response.json()
        const booksInfo = data.library.map(
          (item: { book: Book[] }) => item.book
        )
        set({ books: booksInfo })
      },
      addToReadingList: (bookId: string) => {
        const { readingList, books } = get()

        const index = readingList.findIndex((book) => book.ISBN === bookId)
        if (index === -1) {
          // El libro no está en la lista de lectura, lo añadimos
          const bookToAdd = books.find((book) => book.ISBN === bookId)

          if (bookToAdd) {
            set({ readingList: [...readingList, bookToAdd] })
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
