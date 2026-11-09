import css from './ErrorMessage.module.css';

interface ErrorMessageProps {
  message?: string;
}

export default function ErrorMessage({
  message = 'Something went wrong. Please try again later.',
}: ErrorMessageProps) {
  return (
    <p className={css.error} role="alert">
      {message}
    </p>
  );
}
