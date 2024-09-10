// hooks/useFilteredBooks.js
import { useBookStore } from '@/store/books'
import { type Book } from '../../types'
import { useDebouncedCallback } from 'use-debounce'

const SET_TIME_FILTER = 300

export const useFilteredBooks = () => {
  const filters = useBookStore((state) => state.filters)

  const debouncedSetFilters = useDebouncedCallback((newFilters) => {
    useBookStore.setState({ filters: newFilters })
  }, SET_TIME_FILTER)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChangeFilterPages = (event: any) => {
    const pages = event
    console.log({ filters: pages })

    debouncedSetFilters({ ...filters, pages })
  }

  const onChangeFilterGenre = (value: string) => {
    const genre: string = value
    console.log({ filters: genre })
    debouncedSetFilters({ ...filters, genre })
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
