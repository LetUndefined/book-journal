export interface Book {
  book_id: string
  status: string
  title: string
  author?: string | undefined
  cover?: string
}

export interface BookDetails {
  author_name: string
  title: string
  cover_edition_key: string
}

export interface User {
  email: string
  password: string
}


export interface OpenlibraryResults {
  numFound: number;
  start: number;
  numFoundExact: boolean;
  num_found: number;
  documentation_url: string;
  q: string;
  offset: null;
  docs: Doc[];
}

export interface Doc {
  author_key?: string[];
  author_name: string[];
  cover_edition_key?: string;
  cover_i?: number;
  ebook_access: string;
  edition_count: number;
  first_publish_year?: number;
  has_fulltext: boolean;
  ia?: string[];
  ia_collection?: string[];
  key: string;
  language?: string[];
  lending_edition_s?: string;
  lending_identifier_s?: string;
  public_scan_b: boolean;
  title: string;
  subtitle?: string;
  id_standard_ebooks?: string[];
  id_librivox?: string[];
  id_project_gutenberg?: string[];
}
