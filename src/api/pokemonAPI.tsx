
import { PokemonDetails, Pokemon, Ability } from '../types/pokemonTypes';

const limit = 18; 

export const fetchPokemonList = async (offset: number): Promise<Pokemon[]> => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  const data = await response.json();
  return data.results;
};

export const fetchPokemonDetails = async (pokemonList: Pokemon[]): Promise<PokemonDetails[]> => {
  const details = await Promise.all(
    pokemonList.map(async (pokemon) => {
      const response = await fetch(pokemon.url);
      const pokemonData = await response.json();
      const abilities = pokemonData.abilities.map((ability: Ability) => ability.ability.name);
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
  return details;
};
