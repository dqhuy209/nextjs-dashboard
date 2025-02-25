"use client";
import React, { useEffect, useRef } from "react";
import {
  useInfiniteQuery,
  useSuspenseInfiniteQuery,
} from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import LoadingOverlay from "@/app/ui/pokemon/Loading";
import { PokemonApi } from "@/app/dashboard/pokemon/lib/dataPokemon";
import { Pokemon } from "@/app/dashboard/pokemon/schema/pokemonSchema";
import { pokemonQueryOptions } from "@/app/dashboard/pokemon/hooks/usePokemonList";

const api = new PokemonApi();

export default function PokemonList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    isFetching,
  } = useSuspenseInfiniteQuery(pokemonQueryOptions());
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allPokemon: Pokemon[] =
    data?.pages.flatMap((page: any) => page.pokemon) || [];

  return (
    <div className="relative">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allPokemon.map((poke) => (
            <TableRow key={poke.id}>
              <TableCell>{poke.id}</TableCell>
              <TableCell>{poke.name}</TableCell>
              <TableCell>
                {poke.sprites.front_default ? (
                  <img
                    src={poke.sprites.front_default}
                    alt={poke.name}
                    width={50}
                    height={50}
                  />
                ) : (
                  "N/A"
                )}
              </TableCell>
              <TableCell>
                {poke.types.length > 0
                  ? poke.types.map((t) => t.type.name).join(", ")
                  : "N/A"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div ref={loadMoreRef} style={{ height: "20px" }} />
      {isFetchingNextPage && (
        <div className="flex flex-col items-center my-4">
          <div
            className="animate-spin rounded-full border-t-4 border-b-4 border-blue-500"
            style={{ width: "2rem", height: "2rem" }}
          />
        </div>
      )}
    </div>
  );
}
