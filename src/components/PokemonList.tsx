// src/components/PokemonList/PokemonList.tsx

import React, { useEffect, useRef } from 'react';
import { usePokemonData } from '../hooks/usePokemonData';
import PokemonCard from './PokemonCard';
import SearchInput from './SearchInput';

const PokemonList: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const { filteredPokemon, loading, fetchPokemonDetails, hasMore, currentOffset } = usePokemonData(searchQuery);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const observerCallbackRef = useRef<IntersectionObserver | null>(null);

  // Observe and fetch more pokemon when reaching the bottom
  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      const lastEntry = entries[0];
      if (lastEntry.isIntersecting && !searchQuery) {
        fetchPokemonDetails(currentOffset);
      }
    };

    observerCallbackRef.current = new IntersectionObserver(observerCallback, {
      rootMargin: '200px',
      threshold: 1.0,
    });

    if (observerRef.current) {
      observerCallbackRef.current.observe(observerRef.current);
    }

    return () => {
      if (observerCallbackRef.current && observerRef.current) {
        observerCallbackRef.current.unobserve(observerRef.current);
      }
    };
  }, [hasMore, loading, searchQuery, currentOffset]);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-5xl font-semibold mb-10">Pokemon List</h1>

      <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 w-full max-w-screen-xl">
        {filteredPokemon.map((pokemon) => (
          <div className="flex justify-center" key={pokemon.name}>
            <PokemonCard
              name={pokemon.name}
              image={pokemon.image}
              abilities={pokemon.abilities}
              types={pokemon.types}
            />
          </div>
        ))}
      </div>

      {!searchQuery && loading && <div className="mt-8 text-xl">Loading...</div>}

      {!searchQuery && <div ref={observerRef} className="h-10 w-full"></div>}
    </div>
  );
};

export default PokemonList;
