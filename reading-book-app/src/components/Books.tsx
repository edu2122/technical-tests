/* eslint-disable multiline-ternary */
import { Badge } from '@/components/ui/badge'
import { useBookStore } from '@/store/books'
import { type Book } from '../../types'
import './stylesBooks.css'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { BookMark } from '@/components/icons/BookMark.tsx'
import { Button } from '@/components/ui/button'
import { useFilteredBooks } from '@/hooks/useFilteredBooks'
import { useBooks } from '@/hooks/useBooks'

export function Books() {
  const { books, addToReadingList, removeToReadingList } = useBookStore()
  const { checkBookInReadingList } = useBooks()
  const { filterBooks } = useFilteredBooks()
  const filteredBooks = filterBooks(books)

  console.log(filteredBooks)

  return (
    <div className="books">
      {filteredBooks.map((book: Book) => {
        const isBookInReadingList = checkBookInReadingList(book.ISBN)
        return (
          <Card
            key={book.ISBN}
            className="book group relative hover:shadow-xl hover:bg-zinc-500/15 shadow-lg rounded-md transition-all duration-300 animate-fade-up"
          >
            <CardHeader className="mb-8">
              <CardTitle className="book-title break-normal whitespace-nowrap overflow-hidden text-ellipsis text-center">
                {book.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="items-center justify-center">
              <div className="flex items-center justify-between pb-4 gap-6">
                <Badge className="z-10" variant="outline">
                  {book.genre}
                </Badge>
                <Button
                  name="add and remove from reading list"
                  variant={isBookInReadingList ? 'destructive' : 'outline'}
                  onClick={() => {
                    isBookInReadingList
                      ? removeToReadingList(book.ISBN)
                      : addToReadingList(book.ISBN)
                  }}
                >
                  <BookMark />
                </Button>
              </div>

              <img
                className=" w-[265px] h-[350px]"
                src={book.cover}
                alt={book.title}
              />
            </CardContent>
            <CardFooter>
              <p className="book-description text-pretty">{book.synopsis}</p>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}
