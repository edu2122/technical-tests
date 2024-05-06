import { Slider } from '@/components/ui/slider'
import { useFilteredBooks } from '@/hooks/useFilteredBooks'

export function FilterByPage() {
  const { filters, onChangeFilterPages } = useFilteredBooks()

  return (
    <div className="flex flex-col justify-left items-left">
      <label htmlFor="pages">Filter for pages</label>
      <div className="flex gap-x-4">
        <Slider
          onValueChange={onChangeFilterPages}
          id="pages"
          min={40}
          max={1000}
          className="w-[200px] flex focus:outline-none"
          defaultValue={[filters.pages]} // Fix: Wrap the value in an array
        />

        <span>{filters.pages}</span>
      </div>
    </div>
  )
}
