import React, { FC } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import css from "./SearchBar.module.css"
import { FormEvent } from 'react';

interface SearchBarType{
  onSubmit: (value: string) => void
}

const SearchBar: FC<SearchBarType> = ({ onSubmit }) => {
    const notifyError = (): string => toast.error("Write something please");
     const notify = (): string => toast.success('Nice')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => { 
    e.preventDefault();
    const form = e.currentTarget;
     const value: string = (form.elements.namedItem('query') as HTMLInputElement).value;
      if (value.trim() === "") {
     notifyError()
      return;
      }  
      onSubmit(value);
      notify()
  };

  return (
    <header className={css.header}>
      <form onSubmit={handleSubmit} className={css.form}>
              <input
            name="query"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
              <button type="submit">Search</button>
              <Toaster />
      </form>
    </header>
  );
}

export default SearchBar