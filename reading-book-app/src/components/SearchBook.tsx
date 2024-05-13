import { Input } from '@/components/ui/input'
import { useBooks } from '@/hooks/useBooks'
import { useSearch } from '@/hooks/useSearch'
import { useEffect } from 'react'

export function SearchBook() {
  const { fetchBooks } = useBooks()
  const { search, updateSearch } = useSearch()

  useEffect(() => {
    fetchBooks(search)
  }, [search, fetchBooks])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateSearch(event.target.value)
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <form className="search-book" onSubmit={handleSubmit}>
      <Input onChange={handleChange} placeholder="Search book" type="text" />
    </form>
  )
}
