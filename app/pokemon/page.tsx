
"use client";

import RenderPokemonView from "@/app/components/renderPokemonView";
import { useSearchParams } from "next/navigation";


export default function PokemonView() {
  const searchParams = useSearchParams();

  const offset = Number(searchParams.get('offset')) || 0;
  const id = Number(searchParams.get('id'));
  
  return <RenderPokemonView id={id} offset={offset} />;
}