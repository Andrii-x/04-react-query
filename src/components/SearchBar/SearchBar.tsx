import { type ChangeEvent, type FormEvent, useState } from 'react'
import css from './SearchBar.module.css'

interface SearchBarProps { onSearch: (query: string) => void }

function SearchBar({ onSearch }: SearchBarProps) {
  const [value, setValue] = useState('')
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value)
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); const query = value.trim(); if (query) onSearch(query) }
  return <form className={css.form} onSubmit={handleSubmit}><label className={css.label}><span className={css.visuallyHidden}>Назва фільму</span><input value={value} onChange={handleChange} placeholder="Наприклад, Dune" aria-label="Назва фільму" /></label><button type="submit">Шукати <span aria-hidden="true">↗</span></button></form>
}

export default SearchBar