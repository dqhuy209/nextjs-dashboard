import { z } from "zod";

export const pokemonSchema = z.object({
  id: z.number(),
  name: z.string(),
  sprites: z.object({
    front_default: z.string().nullable(),
  }),
  types: z.array(
    z.object({
      slot: z.number(),
      type: z.object({
        name: z.string(),
        url: z.string(),
      }),
    })
  ),
});

export type Pokemon = z.infer<typeof pokemonSchema>;

export const listSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(
    z.object({
      name: z.string(),
      url: z.string(),
    })
  ),
});
