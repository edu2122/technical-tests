export interface Book {
  title: string
  pages: number
  genre: string
  cover: string
  synopsis: string
  year: number
  ISBN: string
  author: {
    name: string
    otherBooks: string[]
  }
  inReadingList: boolean
}

export interface Filters {
  genre: string // Si tienes un conjunto limitado de géneros, puedes usar un tipo union, por ejemplo, 'fiction' | 'non-fiction' | 'all';
  pages: number
}
