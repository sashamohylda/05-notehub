import css from './Loader.module.css';

export default function Loader() {
  return (
    <div className={css.wrapper} role="status" aria-live="polite">
      <span className={css.spinner} aria-hidden="true" />
      <span className={css.text}>Loading notes...</span>
    </div>
  );
}
