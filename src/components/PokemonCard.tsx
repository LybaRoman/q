import React from 'react';

interface PokemonCardProps {
  name: string;
  image: string;
  abilities: string[];
  types: string[];
}

const PokemonCard: React.FC<PokemonCardProps> = ({ name, image, abilities, types }) => {

    const typeColors: { [key: string]: string } = {
    fire: 'bg-red-700',
    water: 'bg-blue-700',
    grass: 'bg-green-700',
    electric: 'bg-yellow-700',
    psychic: 'bg-purple-700',
    normal: 'bg-gray-700',
    bug: 'bg-lime-700',
    ice: 'bg-teal-700',
    fairy: 'bg-pink-700',
    ghost: 'bg-indigo-700',
    dragon: 'bg-amber-700',
    dark: 'bg-black',
    fighting: 'bg-orange-700',
    poison: 'bg-violet-700',
    ground:'bg-brown-700',
  };

  const cardColor = types.length > 0 ? typeColors[types[0]] : 'bg-gray-900';

  return (
    <div className={`${cardColor} py-10 px-10 rounded-lg shadow-md w-80`}>
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-contain rounded-t-lg"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 text-center mb-7">
          {name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}
        </h2>
        <h3 className="text-lg font-semibold mb-2">Abilities:</h3>
        <ul className="list-disc pl-6 space-y-1">
          {abilities.map((ability, index) => (
            <li key={index} className="text-md">{ability}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PokemonCard;
