import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

import { BookMark } from '@/components/icons/BookMark.tsx'
import { useBookStore } from '@/store/books'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'

import { type Book } from 'types'
import { useBooks } from '@/hooks/useBooks'

export function ReadingBookList() {
  const { addToReadingList } = useBookStore((state) => ({
    addToReadingList: state.addToReadingList
  }))
  const { readingList } = useBookStore((state) => ({
    readingList: state.readingList
  }))
  const { removeToReadingList } = useBookStore((state) => ({
    removeToReadingList: state.removeToReadingList
  }))
  const { checkBookInReadingList } = useBooks()

  return (
    <Sheet>
      <SheetTrigger className="border w-[150px] h-[50px] rounded-xl group relative hover:shadow-xl hover:bg-zinc-500/20 shadow-lg  transition-all duration-300">
        Reading List
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Reading Book List</SheetTitle>
          <SheetDescription>
            Here are the books you are currently reading
          </SheetDescription>
          <ScrollArea className="h-[840px] w-[350px] rounded-md p-4">
            <div className="books">
              {readingList.map((book: Book) => {
                const { ISBN, title, genre, cover, synopsis } = book
                const isBookInReadingList = checkBookInReadingList(ISBN)
                return (
                  <Card
                    key={ISBN}
                    className="group relative hover:shadow-xl hover:bg-zinc-500/15 shadow-lg rounded-md transition-all duration-300"
                  >
                    <CardHeader className="mb-8">
                      <CardTitle className="break-normal whitespace-nowrap overflow-hidden text-ellipsis">
                        {title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="items-center justify-center">
                      <div className="flex items-center justify-between pb-4 gap-6">
                        <Badge variant="outline">{genre}</Badge>
                        <Button
                          name="add and remove from reading list"
                          variant={
                            isBookInReadingList ? 'destructive' : 'outline'
                          }
                          onClick={() => {
                            isBookInReadingList
                              ? removeToReadingList(ISBN)
                              : addToReadingList(ISBN)
                          }}
                        >
                          <BookMark />
                        </Button>
                      </div>

                      <img
                        className=" w-[265px] h-[350px]"
                        src={cover}
                        alt={title}
                      />
                    </CardContent>
                    <CardFooter>
                      <p className="text-pretty">{synopsis}</p>
                    </CardFooter>
                  </Card>
                )
              })}
            </div>
          </ScrollArea>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
