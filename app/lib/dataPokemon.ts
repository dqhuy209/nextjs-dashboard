import { listSchema, Pokemon, pokemonSchema } from "@/app/lib/pokemonSchema";
import ky from "ky";
export class PokemonApi {
  baseUrl = "https://pokeapi.co/api/v2";

  async fetchPokemonList(
    limit: number,
    offset: number
  ): Promise<{ pokemon: Pokemon[]; next: string | null }> {
    const listResponse = await ky
      .get(`${this.baseUrl}/pokemon`, {
        searchParams: { limit, offset },
      })
      .json();
    const listData = listSchema.parse(listResponse);

    const pokemonPromises = listData.results.map(async (result) => {
      const detailResponse = await ky.get(result.url).json();
      return pokemonSchema.parse(detailResponse);
    });

    const pokemon = await Promise.all(pokemonPromises);
    return { pokemon, next: listData.next };
  }
}
