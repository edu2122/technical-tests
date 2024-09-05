import { useFilteredBooks } from './useFilteredBooks'
import { useBookStore } from '@/store/books'
import { type Book } from 'types'
import { useMemo } from 'react'

export const useBooks = () => {
  const books = useBookStore((state) => state.books)
  const readingList = useBookStore((state) => state.readingList)
  const fetchBooks = useBookStore((state) => state.fetchBooks)
  const { filterBooks } = useFilteredBooks()

  const filteredBooks = filterBooks(books)
  const availableBooks = useMemo(
    () =>
      filteredBooks.filter(
        (book: Book) =>
          !readingList.some(
            (bookInReadingList) => bookInReadingList.ISBN === book.ISBN
          )
      ),
    [filteredBooks, readingList]
  )
  const availableBooksLength = availableBooks.length
  const readingListBooksAvailable = readingList.length

  const checkBookInReadingList = (bookId: string) => {
    return readingList.some((book) => book.ISBN === bookId)
  }

  return {
    availableBooksLength,
    readingListBooksAvailable,
    checkBookInReadingList,
    fetchBooks,
    filteredBooks
  }
}
