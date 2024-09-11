import { useEffect, useState } from 'react';
import useDebounce from '@/hooks/useDebounce';
import BaseEntity from '@/interfaces/BaseEntity';
import Link from 'next/link';

interface Props<TEntity extends BaseEntity> {
  fetchData: (value: string) => Promise<TEntity[]>;
  suggestionKey: string;
  indexEndpoint: string;
  // handleShowAdd: () => void;
  // handleId: (id: string) => void;
}

export default function SearchBar<TEntity extends BaseEntity>({ fetchData, suggestionKey, indexEndpoint }: Props<TEntity>) {
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

  return (
    <>
      <input
        type='text'
        placeholder={`Search ${indexEndpoint}...`}
        value={value}
        onChange={(e) => setValue(e.target.value)} />

      <table className='table'>
        <tbody>
          {suggestions.map(suggestion =>
            <tr key={suggestion.id}>
              <td>
                <a style={{ cursor: 'pointer' }}>{suggestion[suggestionKey]?.toString()}</a>
              </td>
              <td>
                <Link href={`/${indexEndpoint}/details/${suggestion.id}`}>Details</Link>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
