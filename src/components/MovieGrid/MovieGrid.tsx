import type { Movie } from '../../types/movie'
import Loader from '../Loader/Loader'
import MovieCard from '../MovieCard/MovieCard'
import css from './MovieGrid.module.css'

interface MovieGridProps { movies: Movie[]; isLoading: boolean; hasQuery: boolean; onSelect: (movie: Movie) => void }
function MovieGrid({ movies, isLoading, hasQuery, onSelect }: MovieGridProps) {
  if (isLoading) return <Loader />
  if (hasQuery && movies.length === 0) return <div className={css.status}>Нічого не знайдено. Спробуйте іншу назву.</div>
  if (!hasQuery) return <div className={css.empty}>Введіть назву фільму, щоб побачити результати.</div>
  return <div className={css.grid}>{movies.map((movie) => <MovieCard key={movie.id} movie={movie} onSelect={onSelect} />)}</div>
}
export default MovieGrid