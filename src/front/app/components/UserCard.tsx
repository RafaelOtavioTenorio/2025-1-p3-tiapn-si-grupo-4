import React from "react";
import type { User } from "~/types";
import DefaultButton from "./DefaultButton";

interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete?: (userId: number) => void;
  isOwnProfile?: boolean;
  isCoordinator?: boolean;
}

export default function UserCard({ user, onEdit, onDelete, isOwnProfile, isCoordinator }: UserCardProps) {
  return (
    <div className="border rounded-xl shadow-md p-4 flex flex-col gap-2 w-full max-w-md bg-white">
      <h2 className="text-xl font-bold">{user.nome}</h2>
      <p>Email: {user.email}</p>
      <p>CPF: {user.cpf}</p>
      <p>Celular: {user.celular}</p>
      <p>Nível de Acesso: {user.nivelAcesso}</p>

      <div className="flex gap-2">
        <DefaultButton onClick={() => onEdit(user)}>Editar</DefaultButton>
        {!isOwnProfile && isCoordinator && onDelete && (
          <DefaultButton onClick={() => onDelete(user.id)} className="bg-red-600 hover:bg-red-700">
            Excluir
          </DefaultButton>
        )}
      </div>
    </div>
  );
}