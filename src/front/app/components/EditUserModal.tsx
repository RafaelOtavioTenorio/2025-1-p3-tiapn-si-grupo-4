import React, { useEffect, useState } from "react";
import DefaultModal from "./DefaultModal";
import DefaultButton from "./DefaultButton";

interface User {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  celular: string;
  nivelAcesso: number;
  ativo: boolean;
}

interface EditUserModalProps {
  user: User | null;
  openModal: boolean;
  closeModal: () => void;
  onSave: (user: User) => void;
}

export default function EditUserModal({ user, openModal, closeModal, onSave }: EditUserModalProps) {
  const [formData, setFormData] = useState<User | null>(null);

  useEffect(() => {
    setFormData(user);
  }, [user]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    if (!formData) return;
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === "nivelAcesso" ? Number(value) : value });
  }

  function handleSave() {
    if (formData) {
      onSave(formData);
      closeModal();
    }
  }

  const actions = [
    <DefaultButton key="save" onClick={handleSave}>Salvar</DefaultButton>
  ];

  return (
    <DefaultModal openModal={openModal} closeModal={closeModal} actions={actions}>
      {formData ? (
        <form className="flex flex-col gap-4 w-full max-w-md p-4">
          <label className="flex flex-col">
            Nome:
            <input name="nome" value={formData.nome} onChange={handleChange} className="border p-2" />
          </label>
          <label className="flex flex-col">
            Email:
            <input name="email" value={formData.email} onChange={handleChange} className="border p-2" />
          </label>
          <label className="flex flex-col">
            CPF:
            <input name="cpf" value={formData.cpf} onChange={handleChange} className="border p-2" />
          </label>
          <label className="flex flex-col">
            Celular:
            <input name="celular" value={formData.celular} onChange={handleChange} className="border p-2" />
          </label>
          <label className="flex flex-col">
            Nível de Acesso:
            <select name="nivelAcesso" value={formData.nivelAcesso} onChange={handleChange} className="border p-2">
              <option value={1}>Funcionário</option>
              <option value={2}>Administrador</option>
              <option value={3}>Coordenador</option>
            </select>
          </label>
        </form>
      ) : (
        <p>Carregando...</p>
      )}
    </DefaultModal>
  );
}
