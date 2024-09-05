import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

import { genresList } from '@/consts'
import { useFilteredBooks } from '@/hooks/useFilteredBooks'

export function FilterByGenre() {
  const { onChangeFilterGenre, filters } = useFilteredBooks()
  const { genre } = filters
  return (
    <Select onValueChange={onChangeFilterGenre}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={genre} />
      </SelectTrigger>
      <SelectContent>
        {genresList.map((genre) => (
          <SelectItem key={genre} value={genre}>
            {genre}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
