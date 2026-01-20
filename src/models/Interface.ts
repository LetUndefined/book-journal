export interface Book {
  status: string
  title: string
  author: string
  cover?: string
}

export interface BookDetails {
  author_name: string
  title: string
  cover_edition_key: string
}
