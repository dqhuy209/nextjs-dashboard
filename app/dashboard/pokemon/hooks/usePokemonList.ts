import { PokemonApi } from "@/app/dashboard/pokemon/lib/dataPokemon";
import { infiniteQueryOptions } from "@tanstack/react-query";

const api = new PokemonApi();

export const pokemonQueryOptions = () =>
  infiniteQueryOptions({
    queryKey: ["pokemon"],
    queryFn: async ({ pageParam }) => {
      const limit = 50;
      const offset = pageParam;
      const listResult = await api.fetchPokemonList(limit, offset);

      const pokemonPromises = listResult.results.map((result) =>
        api.fetchPokemonDetail(result.url)
      );
      const pokemon = await Promise.all(pokemonPromises);

      return { pokemon, nextPage: listResult.next ? offset + limit : null };
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage: any) => lastPage.nextPage,
  });
