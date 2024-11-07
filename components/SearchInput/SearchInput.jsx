'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Input } from '../ui/input';

const SearchInput = () => {
  const [search, setSearch] = useState('');
  const [placeholder, setPlaceholder] = useState('Search notes...');

  useEffect(() => {
    const searchTerms = [
      'Search notes...',
      'Search keyword...',
      'Search user...',
      'Search username...',
    ];
    const intervalId = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * searchTerms.length);
      setPlaceholder(searchTerms[randomIndex]);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  const router = useRouter();
  const handelSubmit = (e) => {
    e.preventDefault();
    if (search.length > 0) {
      router.push(`/result?q=${search}`);
    }
  };
  return (
    <>
      <div className="mt-6 mb-8">
        <form onSubmit={handelSubmit}>
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            name="search"
            type="text"
            placeholder={placeholder}
            className="w-full md:w-1/2 font-bold px-4 py-5 text-base"
          />
        </form>
      </div>
    </>
  );
};

export default SearchInput;
