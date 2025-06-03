import React  from 'react'
import type { ChangeEvent } from "react";
import { useState } from "react";
import {Search} from '@mui/icons-material/';


interface SearchInputProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export default function SearchInput(props:SearchInputProps) {
const [search, setSearch] = useState("");
  return (
    <div className="relative w-full">
      <button
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
        aria-label="Pesquisar"
        type="button"
        tabIndex={-1}
      >
        <Search />
      </button>

      {/* Campo de texto */}
      <input
        type="text"
        value={search}
        onChange={e=>setSearch(e.target.value)}
        placeholder= "Pesquisar rotina ..."
        className="w-full pl-12 pr-4 py-2 rounded shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
      />
    </div>
  );
}