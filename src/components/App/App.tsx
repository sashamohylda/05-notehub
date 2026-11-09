import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchNotes } from '../../services/noteService';
import css from './App.module.css';

const PER_PAGE = 12;

export default function App() {
  // Сеттери з'являться на кроках 5 (пагінація) і 6 (пошук)
  const [page] = useState(1);
  const [search] = useState('');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', page, search],
    queryFn: () => fetchNotes({ page, perPage: PER_PAGE, search }),
    placeholderData: keepPreviousData,
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* Компонент SearchBox */}
        {/* Пагінація */}
        {/* Кнопка створення нотатки */}
      </header>

      {isLoading && <p>Loading notes...</p>}
      {isError && <p>Something went wrong. Try again later.</p>}
      {/* Тимчасово, до NoteList на кроці 4 */}
      {data && (
        <p>
          Notes on page: {data.notes.length}, total pages: {data.totalPages}
        </p>
      )}
    </div>
  );
}
