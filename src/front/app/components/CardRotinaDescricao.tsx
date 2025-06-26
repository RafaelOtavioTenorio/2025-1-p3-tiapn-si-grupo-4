import React from "react";

interface CardRotinaDescricaoProps {
  nomeTarefa: string;
  descricaoTarefa: string;
}

export default function CardRotinaDescricao({
  nomeTarefa,
  descricaoTarefa,
}: CardRotinaDescricaoProps) {
  return (
    <div className="flex flex-col w-full p-2 mb-2 bg-white rounded-xl shadow-sm">
      <label className="text-base font-semibold">{nomeTarefa}</label>
      <label className="text-sm text-gray-600">{descricaoTarefa}</label>
    </div>
  );
}
