import { useEffect } from 'react'
import type { KeyboardEvent, MouseEvent } from 'react'
import { createPortal } from 'react-dom'
import type { Movie } from '../../types/movie'
import css from './MovieModal.module.css'

interface MovieModalProps { movie: Movie; onClose: () => void }
const backdropBaseUrl = 'https://image.tmdb.org/t/p/w1280'

function MovieModal({ movie, onClose }: MovieModalProps) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    const handleKeyDown = (event: globalThis.KeyboardEvent) => { if (event.key === 'Escape') onClose() }
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => { if (event.target === event.currentTarget) onClose() }
  const handleBackdropKeyDown = (event: KeyboardEvent<HTMLDivElement>) => { if (event.key === 'Escape') onClose() }
  const releaseDate = movie.release_date || 'Дата невідома'

  return createPortal(<div className={css.backdrop} role="presentation" onClick={handleBackdropClick} onKeyDown={handleBackdropKeyDown}><div className={css.modal} role="dialog" aria-modal="true" aria-labelledby="movie-title"><button className={css.close} type="button" onClick={onClose} aria-label="Закрити">×</button>{movie.backdrop_path && <img className={css.backdropImage} src={`${backdropBaseUrl}${movie.backdrop_path}`} alt={`Фонове зображення фільму ${movie.title}`} />}<div className={css.content}><p className={css.year}>{releaseDate} <span>·</span> Оцінка {movie.vote_average.toFixed(1)}</p><h2 id="movie-title">{movie.title}</h2><p className={css.overview}>{movie.overview || 'Опис цього фільму поки що відсутній.'}</p></div></div></div>, document.body)
}

export default MovieModal