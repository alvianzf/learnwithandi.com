
"use client";

import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce'; // Need to install or implement manually? Implement manually to avoid dep.
import { Search } from 'lucide-react';

function useDebounceValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

interface Alumni {
  id: number;
  name: string;
  graduationYear: number;
  company?: string;
  position?: string;
  whatsapp: string; // Redacted
}

export function SearchHero() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounceValue(query, 500);
  const [results, setResults] = useState<Alumni[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (debouncedQuery.length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    fetch(`/api/alumni/search?q=${encodeURIComponent(debouncedQuery)}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setResults(data);
        } else {
          console.error(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [debouncedQuery]);

  return (
    <div className="w-full max-w-2xl relative z-20">
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative flex items-center bg-white dark:bg-gray-900 rounded-lg shadow-xl">
          <Search className="ml-4 w-6 h-6 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search alumni by name, company, sector..."
            className="w-full p-4 text-lg bg-transparent border-none focus:ring-0 focus:outline-none dark:text-white"
          />
        </div>
      </div>

      {/* Results Dropdown / Cards */}
      {(results.length > 0 || loading) && (
        <div className="absolute top-full left-0 right-0 mt-4 bg-white/80 dark:bg-gray-900/90 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 max-h-96 overflow-y-auto">
          {loading && <div className="p-4 text-center">Searching...</div>}
          {!loading && results.map(alum => (
            <div key={alum.id} className="p-4 border-b last:border-0 border-gray-100 dark:border-gray-800 hover:bg-blue-50 dark:hover:bg-gray-800 transition">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">{alum.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Class of {alum.graduationYear}</p>
                  {alum.company && <p className="text-xs mt-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-2 py-0.5 rounded-full inline-block">{alum.company}</p>}
                </div>
                <div>
                  <span className="text-sm font-mono text-gray-500">{alum.whatsapp}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
