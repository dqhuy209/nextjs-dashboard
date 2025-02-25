"use client";
import React from "react";

export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-100 bg-opacity-75">
      <div
        className="animate-spin rounded-full border-t-4 border-b-4 border-blue-500"
        style={{ width: "3rem", height: "3rem" }}
      />
      <p className="mt-4 text-lg font-medium">Loading Pokémon...</p>
    </div>
  );
}
