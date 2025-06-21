import React from 'react'
import type { ChangeEvent } from "react";
import Search from '@mui/icons-material/Search';

interface Rotina {
  nome: string;
  tarefas: number;
  insumos: number;
}

interface SearchFuncionarioProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  rotinas?: Rotina[];
}

export default function SearchFuncionario(props: SearchFuncionarioProps) {
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
      <input
        type="text"
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder ?? "Pesquisar funcionário..."}
        className="w-full pl-12 pr-4 py-2 rounded shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
      />
    </div>
  );
}