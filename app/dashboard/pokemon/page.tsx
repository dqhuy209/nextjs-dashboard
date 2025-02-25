import PokemonList from "@/app/ui/pokemon/PokemonList";
import React, { Suspense } from "react";

export default function page() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <PokemonList />
      </Suspense>
    </div>
  );
}
