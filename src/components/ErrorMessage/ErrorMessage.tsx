import css from './ErrorMessage.module.css'

interface ErrorMessageProps { message: string }

function ErrorMessage({ message }: ErrorMessageProps) {
  return <div className={css.error} role="alert"><strong>Щось пішло не так</strong><span>{message}</span></div>
}

export default ErrorMessage