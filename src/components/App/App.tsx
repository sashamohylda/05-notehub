import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import { fetchNotes } from '../../services/noteService';
import NoteList from '../NoteList/NoteList';
import Pagination from '../Pagination/Pagination';
import SearchBox from '../SearchBox/SearchBox';
import css from './App.module.css';

const PER_PAGE = 12;

export default function App() {
  const [page, setPage] = useState(1);
  // inputValue — що бачить користувач у полі (оновлюється на кожен символ)
  const [inputValue, setInputValue] = useState('');
  // search — що йде в запит (оновлюється із затримкою)
  const [search, setSearch] = useState('');

  const updateSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 300);

  const handleSearchChange = (value: string) => {
    setInputValue(value);
    updateSearch(value);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', page, search],
    queryFn: () => fetchNotes({ page, perPage: PER_PAGE, search }),
    placeholderData: keepPreviousData,
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={inputValue} onChange={handleSearchChange} />
        {data && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}
        {/* Кнопка створення нотатки */}
      </header>

      {isLoading && <p>Loading notes...</p>}
      {isError && <p>Something went wrong. Try again later.</p>}
      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
    </div>
  );
}
