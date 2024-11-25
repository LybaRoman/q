// src/hooks/usePokemonData.ts

import { useState, useEffect } from 'react';
import { PokemonDetails } from '../types/pokemonTypes';

const limit = 18;

export const usePokemonData = (searchQuery: string) => {
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails[]>([]);
  const [filteredPokemon, setFilteredPokemon] = useState<PokemonDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentOffset, setCurrentOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchPokemonDetails = async (offset: number = 0) => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
      const data = await res.json();

      const details = await Promise.all(
        data.results.map(async (pokemon: any) => {
          const response = await fetch(pokemon.url);
          const pokemonData = await response.json();
          const abilities = pokemonData.abilities.map((ability: any) => ability.ability.name);
          const image = pokemonData.sprites.front_default;
          const types = pokemonData.types.map((type: any) => type.type.name);

          return {
            name: pokemonData.name,
            image: image,
            abilities: abilities,
            types: types,
          };
        })
      );

      setPokemonDetails((prev) => [...prev, ...details]);
      setFilteredPokemon((prev) => [...prev, ...details]);
      setCurrentOffset((prev) => prev + limit);

      if (data.results.length < limit) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error loading pokemon details:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch on component mount and when searchQuery changes
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredPokemon(pokemonDetails);
    } else {
      const matchedPokemon = pokemonDetails.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setFilteredPokemon(matchedPokemon);
    }
  }, [searchQuery, pokemonDetails]);

  return {
    filteredPokemon,
    loading,
    fetchPokemonDetails,
    hasMore,
    currentOffset,
  };
};
