import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import ReactPaginateModule from 'react-paginate'
import type { ReactPaginateProps } from 'react-paginate'
import type { ComponentType } from 'react'
import { fetchMovies } from '../../services/movieService'
import type { Movie } from '../../types/movie'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import MovieModal from '../MovieModal/MovieModal'
import SearchBar from '../SearchBar/SearchBar'
import MovieGrid from '../MovieGrid/MovieGrid'
import css from './App.module.css'

type ModuleWithDefault<T> = { default: T }
const ReactPaginate = (ReactPaginateModule as unknown as ModuleWithDefault<ComponentType<ReactPaginateProps>>).default

function App() {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
  const token = import.meta.env.VITE_TMDB_TOKEN
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['movies', query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: Boolean(query && token),
    placeholderData: (previousData) => previousData,
  })
  const handleSearch = (nextQuery: string) => { setQuery(nextQuery); setPage(1) }
  const errorMessage = isError && error instanceof Error ? error.message : 'Не вдалося завантажити фільми.'

  return (
    <div className={css.app}>
      <header className={css.header}>
        <div className={css.brand}><span className={css.brandMark}>CF</span><span>Cinefind</span></div>
        <span className={css.headerNote}>Ваша наступна історія починається тут</span>
      </header>
      <main>
        <section className={css.hero}>
          <p className={css.eyebrow}>Кінокаталог / 01</p>
          <h1>Знайдіть фільм,<br /><em>який залишиться.</em></h1>
          <p className={css.intro}>Пошук серед тисяч історій, акторів і світів. Введіть назву, щоб почати.</p>
          <SearchBar onSearch={handleSearch} />
        </section>
        <section className={css.results} aria-live="polite">
          {!token && <div className={css.notice}>Додайте токен TMDB у змінну <code>VITE_TMDB_TOKEN</code>, щоб активувати пошук.</div>}
          {query && token && <p className={css.resultLabel}>Результати для «{query}»</p>}
          {isError && <ErrorMessage message={errorMessage} />}
          <MovieGrid movies={data?.results ?? []} isLoading={isLoading} hasQuery={Boolean(query && token)} onSelect={setSelectedMovie} />
          {data && data.total_pages > 1 && <ReactPaginate pageCount={Math.min(data.total_pages, 500)} pageRangeDisplayed={5} marginPagesDisplayed={1} onPageChange={({ selected }) => setPage(selected + 1)} forcePage={page - 1} containerClassName={css.pagination} activeClassName={css.active} nextLabel="→" previousLabel="←" />}
        </section>
      </main>
      {selectedMovie && <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
      <footer className={css.footer}>Cinefind <span>·</span> Добре кіно поруч</footer>
    </div>
  )
}

export default App