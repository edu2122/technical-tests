import './globals.css'
import { Header } from '@/components/Header'
import { FilterByGenre } from '@/components/FilterByGenre'
import { FilterByPage } from '@/components/FilterByPage'
import { Books } from '@/components/Books'
import { ReadingBookList } from '@/components/ReadingBookList'
import { useBooks } from '@/hooks/useBooks'
import { SearchBook } from './components/SearchBook'

function App() {
  const { filteredBooks, availableBooksLength, readingListBooksAvailable } =
    useBooks()

  return (
    <>
      <Header />
      <main className="p-8">
        <div className="flex justify-between mb-8 items-center">
          <div className="border rounded-md p-4">
            <h2>Available books: {availableBooksLength}</h2>
            {readingListBooksAvailable === 0 && <h3>Reading List is empty</h3>}
            {readingListBooksAvailable > 0 && (
              <h3>Books in Reading List: {readingListBooksAvailable}</h3>
            )}
            {readingListBooksAvailable === availableBooksLength && (
              <h3>Reading List is full</h3>
            )}
          </div>

          <div className="flex gap-2 justify-center items-center"></div>

          <div className="flex items-center gap-8">
            <SearchBook />
            <FilterByPage />
            <FilterByGenre />
            <ReadingBookList />
          </div>
        </div>
        <Books />
        {filteredBooks.length === 0 && <p>No books found</p>}
      </main>
    </>
  )
}

export default App
