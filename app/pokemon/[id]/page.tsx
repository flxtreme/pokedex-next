"use client";

import RenderPokemonView from "@/app/components/renderPokemonView";
import { useSearchParams } from "next/navigation";
import { use } from "react";

interface PokemonViewProps {
  params: Promise<{
    id: string;
  }>;
}

export default function PokemonView({ params }: PokemonViewProps) {
  const searchParams = useSearchParams();
  const { id } = use(params);

  const offset = Number(searchParams.get('offset')) || 0;
  
  return <RenderPokemonView id={id} offset={offset} />;
}