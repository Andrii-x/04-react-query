import { useEffect } from 'react'
import type { KeyboardEvent } from 'react'
import type { Movie } from '../../types/movie'
import css from './MovieModal.module.css'

interface MovieModalProps { movie: Movie; onClose: () => void }
const posterBaseUrl = 'https://image.tmdb.org/t/p/w500'

function MovieModal({ movie, onClose }: MovieModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: globalThis.KeyboardEvent) => { if (event.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const handleBackdropKeyDown = (event: KeyboardEvent<HTMLDivElement>) => { if (event.key === 'Escape') onClose() }
  const year = movie.release_date ? movie.release_date.slice(0, 4) : '—'

  return <div className={css.backdrop} role="presentation" onClick={onClose} onKeyDown={handleBackdropKeyDown}><div className={css.modal} role="dialog" aria-modal="true" aria-labelledby="movie-title" onClick={(event) => event.stopPropagation()}><button className={css.close} type="button" onClick={onClose} aria-label="Закрити">×</button>{movie.poster_path && <img className={css.poster} src={`${posterBaseUrl}${movie.poster_path}`} alt={`Постер фільму ${movie.title}`} />}<div className={css.content}><p className={css.year}>{year} <span>·</span> Оцінка {movie.vote_average.toFixed(1)}</p><h2 id="movie-title">{movie.title}</h2><p className={css.overview}>{movie.overview || 'Опис цього фільму поки що відсутній.'}</p></div></div></div>
}

export default MovieModal