import { useEffect, useState } from 'react';
import useDebounce from '@/hooks/useDebounce';
import BaseEntity from '@/interfaces/BaseEntity';

interface Props<TEntity extends BaseEntity> {
  fetchData: (value: string) => Promise<TEntity[]>;
  suggestionKey: string;
  handleShowAdd: () => void;
  handleId: (id: string) => void;
}

export default function SearchBar<TEntity extends BaseEntity>({ fetchData, suggestionKey, handleShowAdd, handleId }: Props<TEntity>) {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([] as TEntity[]);

  useEffect(() => {
    async function fetchSuggestions() {
      const suggestions = await fetchData(value);

      setSuggestions(suggestions);
    }

    fetchSuggestions();
  }, []);

  useDebounce(() => {
    async function fetchSuggestions() {
      const suggestions = await fetchData(value);

      setSuggestions(suggestions);
    }

    fetchSuggestions();
  }, 1000, [value]);

  function onClick(id: string) {
    handleId(id);

    handleShowAdd();
  }

  return (
    <>
      <input
        type="text"
        placeholder="Search data..."
        value={value}
        onChange={(e) => setValue(e.target.value)} />

      <table className="table">
        <tbody>
          {suggestions.map(suggestion =>
            <tr key={suggestion.id}>
              <td><a style={{ cursor: 'pointer' }} onClick={() => onClick(suggestion.id as string)}>{suggestion[suggestionKey]?.toString()}</a></td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
