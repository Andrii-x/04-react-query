import axios from 'axios'
import type { Movie } from '../types/movie'

interface MovieResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN ?? ''}`,
  },
  params: { language: 'uk-UA' },
})

export const fetchMovies = async (query: string, page: number): Promise<MovieResponse> => {
  const { data } = await api.get<MovieResponse>('/search/movie', {
    params: { query, page, include_adult: false },
  })
  return data
}