import css from './Loader.module.css'

function Loader() {
  return <div className={css.loader} role="status" aria-label="Завантаження"><span /><span /><span /></div>
}

export default Loader