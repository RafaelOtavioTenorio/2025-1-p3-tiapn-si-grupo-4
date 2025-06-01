import React  from 'react'
import type { ChangeEvent } from "react";
import { useState } from "react";


interface SearchInputProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export default function SearchInput(props:SearchInputProps) {
const [search, setSearch] = useState("");
  return (
    <div className="relative w-full">
      {/* Ícone de lupa (SVG) */}
      <svg
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5 pointer-events-none"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18.5a7.5 7.5 0 006.15-3.85z"
        />
      </svg>

      {/* Campo de texto */}
      <input
        type="text"
        value={search}
        onChange={e=>setSearch(e.target.value)}
        placeholder= "Pesquisar rotina ..."
        className="w-full pl-10 pr-4 py-2 rounded shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
      />
    </div>
  );
}