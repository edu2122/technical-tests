import { useState, useEffect, useRef } from 'react'

export function useSearch() {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState<string | null>(null)
  const isFirstInput = useRef(true)
  console.log(search)

  useEffect(() => {
    console.log('useEffect')
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }
    if (search === '') return setError('you cant search a empty movie')
    if (search.length < 3) {
      return setError('the movie search must be at least 3 characters')
    }
    if (search.match(/^\d+$/)) {
      return setError('yo cant search a movie with a number')
    }
    setError(null)
  }, [search])
  return { search, updateSearch, error }
}
