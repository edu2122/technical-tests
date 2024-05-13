import { useFilteredBooks } from './useFilteredBooks'
import { useBookStore } from '@/store/books'
import { type Book } from 'types'
import { useMemo } from 'react'

export const useBooks = () => {
  const { books, readingList, fetchBooks } = useBookStore()
  const { filterBooks } = useFilteredBooks()

  const filteredBooks = filterBooks(books)
  const availableBooks = useMemo(
    () =>
      filteredBooks.filter(
        (book: Book) =>
          !readingList.some((readingBook) => readingBook.ISBN === book.ISBN)
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
