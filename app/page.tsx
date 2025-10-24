"use client";

import { useSearchParams, useRouter } from "next/navigation";
import RenderPokemon from "./components/renderPokemon";
import { usePokemonList } from "./hooks/usePokemonAppEngine";
import DefaultLayout from "./layouts/defaultLayout";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const limit = 12;
  
  const offset = Number(searchParams.get('offset')) || 0;

  const { data, loading, error } = usePokemonList({ offset, limit });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg m-4">
        <p className="text-red-600">Failed to load Pokémon list</p>
      </div>
    );
  }

  const handleNext = () => {
    if (data?.next) {
      const newOffset = offset + limit;
      router.push(`/?offset=${newOffset}`);
    }
  }

  const handlePrev = () => {
    if (offset > 0) {
      const newOffset = Math.max(0, offset - limit);
      router.push(`/?offset=${newOffset}`);
    }
  }

  return (
    <DefaultLayout
      title="Pokedex"
      next={handleNext}
      prev={offset > 0 ? handlePrev : undefined}
      offset={offset ?? 0}
    >
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
        {data?.results.map((pokemon) => (
          <RenderPokemon key={pokemon.name} url={pokemon.url} offset={offset} />
        ))}
      </div>
    </DefaultLayout>
  );
}