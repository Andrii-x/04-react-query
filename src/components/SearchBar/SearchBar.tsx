import { type ChangeEvent, useState } from 'react'
import toast from 'react-hot-toast'
import css from './SearchBar.module.css'

interface SearchBarProps { onSubmit: (query: string) => void }

function SearchBar({ onSubmit }: SearchBarProps) {
  const [value, setValue] = useState('')
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value)
  const handleAction = (formData: FormData) => {
    const formValue = formData.get('query')
    const query = typeof formValue === 'string' ? formValue.trim() : ''
    if (!query) { toast.error('Введіть назву фільму для пошуку.'); return }
    onSubmit(query)
  }
  return <form className={css.form} action={handleAction}><label className={css.label}><span className={css.visuallyHidden}>Назва фільму</span><input name="query" value={value} onChange={handleChange} placeholder="Наприклад, Dune" aria-label="Назва фільму" /></label><button type="submit">Шукати <span aria-hidden="true">↗</span></button></form>
}

export default SearchBar