"use client";

import { Pokemon } from 'pokemon-app-engine';
import { TYPE_COLORS } from '../constants/constants';
import { useGenericGet } from '../hooks/usePokemonAppEngine';
import { useRouter } from 'next/navigation';


interface RenderPokemonProps {
  url: string;
  offset?: number;
}

export default function RenderPokemon({ url, offset }: RenderPokemonProps) {
  const router = useRouter();

  const { data: pokemon, error, loading } = useGenericGet<Pokemon>(url);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-6">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-3 bg-red-50 border border-red-200 rounded-md">
        <p className="text-red-600 text-sm">Failed to load Pokémon</p>
      </div>
    );
  }

  if (!pokemon) {
    return null;
  }

  const sprite = pokemon.sprites.front_default || pokemon.sprites.other?.['official-artwork']?.front_default;

  return (
    <div 
      onClick={()=> router.push(`/pokemon/?id=${pokemon.id}&offset=${offset}`)} 
      className="bg-white rounded-md shadow-md overflow-hidden max-w-md border border-gray-200 hover:shadow-lg transition-shadow flex flex-col items-center justify-center"
    >
      {/* Pokemon Image */}
      <div className="relative h-24 w-full bg-radial from-gray-300 via-gray-400 to-teal-900 flex items-center justify-center">
        {sprite ? (
          <img 
            src={sprite} 
            alt={pokemon.name}
            className="size-24 object-contain drop-shadow-md"
          />
        ) : (
          <div className="size-24 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-gray-400 text-3xl">?</span>
          </div>
        )}
        <div className='flex items-center justify-end top-2 right-2 gap-px p-px bg-white absolute rounded'>
          { pokemon.types.map(typeSlot => {
            const typeName = typeSlot.type.name;

            const color = TYPE_COLORS[typeName] || "#777";

            return <div
              key={typeSlot.type.name}
              title={typeName}
              className='size-3 rounded'
              style={{ backgroundColor: color }}
            />
          })}
        </div>
      </div>
      <div className='text-xs border-t border-gray-200 py-1 font-medium capitalize px-2 w-full flex items-center justify-between'>
        <span className='font-medium text-black'>
          {pokemon.name}
        </span>
        <span className='text-gray-400 text-[10px]'>
          #{pokemon.id.toString().padStart(4,'0')}
        </span>
      </div>
    </div>
  );
}