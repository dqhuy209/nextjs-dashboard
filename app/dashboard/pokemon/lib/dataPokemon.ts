import {
  listSchema,
  Pokemon,
  pokemonSchema,
} from "@/app/dashboard/pokemon/schema/pokemonSchema";
import ky from "ky";

export class PokemonApi {
  baseUrl = "https://pokeapi.co/api/v2";

  async fetchPokemonList(
    limit: number,
    offset: number
  ): Promise<{
    results: { name: string; url: string }[];
    next: string | null;
  }> {
    const listResponse = await ky
      .get(`${this.baseUrl}/pokemon`, {
        searchParams: { limit, offset },
      })
      .json();
    const listData = listSchema.parse(listResponse);
    return { results: listData.results, next: listData.next };
  }

  async fetchPokemonDetail(url: string): Promise<Pokemon> {
    const detailResponse = await ky.get(url).json();
    return pokemonSchema.parse(detailResponse);
  }
}
