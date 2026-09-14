import type { Movie } from '../../types/movie'
import MovieCard from '../MovieCard/MovieCard'
import css from './MovieGrid.module.css'

interface MovieGridProps { movies: Movie[]; isLoading: boolean; hasQuery: boolean }
function MovieGrid({ movies, isLoading, hasQuery }: MovieGridProps) {
  if (isLoading) return <div className={css.status}>Завантаження кіно...</div>
  if (hasQuery && movies.length === 0) return <div className={css.status}>Нічого не знайдено. Спробуйте іншу назву.</div>
  if (!hasQuery) return <div className={css.empty}>Введіть назву фільму, щоб побачити результати.</div>
  return <div className={css.grid}>{movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}</div>
}
export default MovieGrid