import { useState, useEffect, useRef } from 'react'

export function useSearch() {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState<string | null>(null)
  const isFirstInput = useRef(true)
useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }
    if (search === '') return setError('you cant search a empty book')
    if (search.length < 3) {
      return setError('the book search must be at least 3 characters')
    }
    if (search.match(/^\d+$/)) {
      return setError('yo cant search a book with a number')
    }
    setError(null)
  }, [search])
  return { search, updateSearch, error }
}
