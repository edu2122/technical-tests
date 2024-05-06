import { useFilteredBooks } from './useFilteredBooks'
import { useBookStore } from '@/store/books'

export const useBooks = () => {
  const { books, readingList, fetchBooks } = useBookStore()
  const { filterBooks } = useFilteredBooks()

  const filteredBooks = filterBooks(books)
  const availableBooks = filteredBooks.length - readingList.length
  const readingListBooksAvailable = readingList.length

  const checkBookInReadingList = (bookId: string) => {
    return readingList.some((book) => book.ISBN === bookId)
  }


  return {
    availableBooks,
    readingListBooksAvailable,
    checkBookInReadingList,
    fetchBooks
  }
}
