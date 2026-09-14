import type { Movie } from '../../types/movie'
import css from './MovieCard.module.css'

interface MovieCardProps { movie: Movie }
const posterBaseUrl = 'https://image.tmdb.org/t/p/w500'
function MovieCard({ movie }: MovieCardProps) {
  const year = movie.release_date ? movie.release_date.slice(0, 4) : '—'
  return <article className={css.card}><div className={css.poster}>{movie.poster_path ? <img src={`${posterBaseUrl}${movie.poster_path}`} alt={`Постер фільму ${movie.title}`} /> : <span>Постер<br />відсутній</span>}<strong>{movie.vote_average.toFixed(1)}</strong></div><p className={css.year}>{year}</p><h2>{movie.title}</h2></article>
}
export default MovieCard