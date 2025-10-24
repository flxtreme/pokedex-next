"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TYPE_COLORS } from "../constants/constants";
import { usePokemon } from "../hooks/usePokemonAppEngine";
import DefaultLayout from "../layouts/defaultLayout";

interface RenderPokemonViewProps {
  id: number | string;
  offset?: number;
}

/**
 * RenderPokemonView
 * -------------------------
 * Compact Pokémon detail view with dynamic weaknesses from PokeAPI.
 */
export default function RenderPokemonView({ id, offset }: RenderPokemonViewProps) {
  const { data: pokemon, error, loading } = usePokemon(id);
  const [weaknesses, setWeaknesses] = useState<string[]>([]);
  const [loadingWeaknesses, setLoadingWeaknesses] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!pokemon) return;

    const fetchWeaknesses = async () => {
      setLoadingWeaknesses(true);
      try {
        const allWeaknesses = await Promise.all(
          pokemon.types.map(async (t) => {
            const res = await fetch(`https://pokeapi.co/api/v2/type/${t.type.name}`);
            const data = await res.json();
            return data.damage_relations.double_damage_from.map((d: any) => d.name);
          })
        );
        const merged = Array.from(new Set(allWeaknesses.flat()));
        setWeaknesses(merged);
      } catch (err) {
        console.error("Failed to fetch weaknesses:", err);
      } finally {
        setLoadingWeaknesses(false);
      }
    };

    fetchWeaknesses();
  }, [pokemon]);

  if (!pokemon) return null;

  const sprite =
    pokemon.sprites.other?.["official-artwork"]?.front_default ||
    pokemon.sprites.front_default;

  const hasGenderDifferences = pokemon.sprites.front_female !== null;

  const handleNext = () => {
    const nextId = Number(id) + 1;
    router.push(`/pokemon/?id=${nextId}&offset=${offset}`);
  };

  const handlePrev = () => {
    const prevId = Number(id) - 1;
    if (prevId > 0) {
      router.push(`/pokemon/?id=${prevId}&offset=${offset}`);
    }
  };

  return (
    <DefaultLayout
      title={pokemon.name}
      next={handleNext}
      prev={Number(id)-1 > 0 ? handlePrev : undefined}
      hasBack={true}
      offset={offset}
    >
      {loading && (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      )}

      {!loading && error && (
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg max-w-sm">
            <p className="text-red-600 text-center text-sm">Failed to load Pokémon</p>
          </div>
        </div>
      )}

      {!loading && !error && (
        <div className="mx-auto space-y-4">
          {/* Image */}
          <div className="relative flex items-center justify-center">
            {sprite ? (
              <img
                src={sprite}
                alt={pokemon.name}
                className="size-32 object-contain drop-shadow-lg"
              />
            ) : (
              <div className="size-32 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-400 text-4xl">?</span>
              </div>
            )}
            <div className="absolute right-4 top-4 flex gap-1 font-bold">
              {hasGenderDifferences ? (
                <>
                  <span className="text-blue-500 text-base" title="Male">♂</span>
                  <span className="text-pink-500 text-base" title="Female">♀</span>
                </>
              ) : (
                <span className="text-blue-500 text-base" title="Male/Female">♂ / ♀</span>
              )}
            </div>
          </div>


          <div className="flex flex-col items-center justify-center gap-2">
            <h2 className="text-xl font-bold capitalize text-gray-800">
              {pokemon.name}
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Types */}
            <div className="flex flex-col items-center bg-white p-3 shadow rounded-md">
              <h3 className="text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                Types
              </h3>
              <div className="flex flex-wrap gap-1 justify-center">
                {pokemon.types.map((typeSlot) => {
                  const typeName = typeSlot.type.name;
                  const color = TYPE_COLORS[typeName] || "#777";
                  return (
                    <div
                      key={typeSlot.slot}
                      className="px-3 py-0.5 rounded-full text-white font-bold text-xs shadow"
                      style={{ backgroundColor: color }}
                    >
                      <span className="capitalize">{typeName}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Weaknesses */}
            <div className="flex flex-col items-center bg-white p-3 shadow rounded-md">
              <h3 className="text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                Weaknesses
              </h3>
              {loadingWeaknesses ? (
                <div className="text-xs text-gray-500 animate-pulse">
                  Loading weaknesses...
                </div>
              ) : weaknesses.length > 0 ? (
                <div className="flex flex-wrap gap-1 justify-center">
                  {weaknesses.map((type) => (
                    <div
                      key={type}
                      className="px-3 py-0.5 rounded-full text-white font-bold text-xs shadow"
                      style={{ backgroundColor: TYPE_COLORS[type] || "#999" }}
                    >
                      <span className="capitalize">{type}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <span className="text-xs text-gray-500">No known weaknesses</span>
              )}
            </div>
          </div>

          {/* Base Stats */}
          <div className="bg-white rounded-md shadow p-4">
            <h3 className="text-xs font-semibold text-gray-600 mb-3 uppercase tracking-wide">
              Base Stats
            </h3>
            <div className="space-y-2">
              {pokemon.stats.map((stat) => (
                <div key={stat.stat.name} className="p-2 border border-gray-200">
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="text-xs font-medium text-gray-700 capitalize">
                      {stat.stat.name.replace("-", " ")}
                    </span>
                    <span className="text-xs font-bold text-gray-900">
                      {stat.base_stat}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 h-3 mt-2 rounded">
                    <div
                      className="bg-linear-to-r from-blue-500 to-purple-500 h-3 rounded"
                      style={{
                        width: `${Math.min((stat.base_stat / 255) * 100, 100)}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Abilities */}
          <div className="bg-white rounded-md shadow p-4">
            <h3 className="text-xs font-semibold text-gray-600 mb-3 uppercase tracking-wide">
              Abilities
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {pokemon.abilities.map((abilitySlot) => (
                <div
                  key={`${abilitySlot.ability.name}-${abilitySlot.slot}`}
                  className="flex items-center justify-between min-h-12 border border-gray-200 p-4"
                >
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-800 text-xs capitalize">
                      {abilitySlot.ability.name.replace("-", " ")}
                    </span>
                    {/* If you want to show ability effect entries you'd need to fetch ability detail endpoint */}
                    {abilitySlot.is_hidden && (
                      <span className="text-[10px] text-gray-500 mt-0.5">Hidden ability</span>
                    )}
                  </div>

                  {abilitySlot.is_hidden && (
                    <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-semibold">
                      Hidden
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </DefaultLayout>
  );
}
