// hooks/useFilteredBooks.js
import { useBookStore } from '@/store/books'
import { type Book } from '../../types'

export const useFilteredBooks = () => {
  const filters = useBookStore((state) => state.filters)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChangeFilterPages = (event: any) => {
    const pages = event
    useBookStore.setState({ filters: { ...filters, pages } })
  }

  const onChangeFilterGenre = (value: string) => {
    const genre: string = value
    useBookStore.setState({ filters: { ...filters, genre } })
  }

  const filterBooks = (books: Book[]): Book[] => {
    return books.filter((book) => {
      return (
        book.pages >= filters.pages &&
        (filters.genre === 'All' || book.genre === filters.genre)
      )
    })
  }

  return { filterBooks, onChangeFilterPages, onChangeFilterGenre, filters }
}
