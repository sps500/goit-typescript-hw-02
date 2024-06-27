import  { useState } from 'react';
import { toast } from 'react-hot-toast';
import css from './SearchBar.module.css';

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const [input, setInput] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim() === '') {
      toast.error('Please enter a search term');
      return;
    }
    onSubmit(input);
    setInput('');
  };

  return (
    <header className={css.header_style}>
      <form onSubmit={handleSubmit}>
        <input
          className={css.container}
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Search images and photos"
        />
        <button className={css.container} type="submit">
          Search
        </button>
      </form>
    </header>
  );
};

export default SearchBar;

