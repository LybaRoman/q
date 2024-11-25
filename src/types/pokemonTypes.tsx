
export interface Ability {
    ability: {
      name: string;
      url: string;
    };
  }
  
  export interface Pokemon {
    name: string;
    url: string;
  }
  
  export interface PokemonDetails {
    name: string;
    image: string;
    abilities: string[];
    types: string[];
  }
  