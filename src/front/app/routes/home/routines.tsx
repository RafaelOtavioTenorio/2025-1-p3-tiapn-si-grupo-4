import { useEffect, useState } from "react";
import DefaultButton from "../../components/DefaultButton";
import SearchInput from "../../components/SearchInput";
import Title from "../../components/Title";
import CardCargoRotinas from "../../components/CardCargoRotinas";
import ModalIniciarRotina from "../../components/ModalIniciarRotina";

interface Tarefa {
  id: number;
  nome: string;
  prioridade: number;
  pai: number | null;
}

interface Rotina {
  id: number;
  nome: string;
  descricao: string;
  empresa?: {
    id: number;
    nome: string;
  };
  tarefas?: Tarefa[];
}

// Função para filtrar rotinas por nome único
function filterUniqueByName(rotinas: Rotina[]) {
  const seen = new Set<string>();
  return rotinas.filter((rotina) => {
    if (seen.has(rotina.nome)) {
      return false;
    } else {
      seen.add(rotina.nome);
      return true;
    }
  });
}

export default function RoutinesPage() {
  const [searchText, setSearchText] = useState("");
  const [categoria1, setCategoria1] = useState("");
  const [categoria2, setCategoria2] = useState("");
  const [rotinasIniciadas, setRotinasIniciadas] = useState<Rotina[]>([]);
  const [modalAberto, setModalAberto] = useState(false);

  useEffect(() => {
    const fetchRotinas = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/Rotina`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          console.error("Erro ao buscar rotinas:", await res.text());
          return;
        }

        const data: Rotina[] = await res.json();
        const rotinasFiltradas = filterUniqueByName(data);
        setRotinasIniciadas(rotinasFiltradas);
      } catch (error) {
        console.error("Erro ao buscar rotinas:", error);
      }
    };

    fetchRotinas();
  }, []);

  const handleRotinaIniciada = () => {
    setModalAberto(false);

    const token = localStorage.getItem("authToken");
    if (!token) return;

    fetch(`${import.meta.env.VITE_BASE_URL}/Rotina`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          console.error("Erro ao buscar rotinas:", await res.text());
          return;
        }
        const data: Rotina[] = await res.json();
        const rotinasFiltradas = filterUniqueByName(data);
        setRotinasIniciadas(rotinasFiltradas);
      })
      .catch((err) => console.error("Erro ao buscar rotinas:", err));
  };

  return (
    <div className="flex flex-row m-5 p-4 mb-16">
      <div className="flex-1 bg-gray-100">
        <div className="flex flex-row justify-between items-center">
          <Title>Rotinas em Andamento</Title>
        </div>

        <div className="flex flex-row justify-between items-center">
          <div className="justify-start flex flex-row items-center">
            <div className="w-130">
              <SearchInput
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>

            <select
              value={categoria1}
              onChange={(e) => setCategoria1(e.target.value)}
              className="w-2/5 border ml-8 p-2 rounded"
            >
              <option value="">Selecione Categoria 1</option>
            </select>

            <select
              value={categoria2}
              onChange={(e) => setCategoria2(e.target.value)}
              className="w-2/5 border ml-8 p-2 rounded"
            >
              <option value="">Selecione Categoria 2</option>
            </select>
          </div>

          <div className="flex justify-end h-16">
            <DefaultButton onClick={() => setModalAberto(true)}>
              INICIAR ROTINA
            </DefaultButton>
          </div>
        </div>

        {/* Fundo branco com rotinas lado a lado */}
        <div className="bg-white w-full min-h-[90vh] mt-4 rounded-xl shadow-lg p-6">
          <div className="flex flex-wrap gap-6">
            {rotinasIniciadas.length === 0 ? (
              <p className="text-gray-600">Nenhuma rotina iniciada.</p>
            ) : (
              rotinasIniciadas
                .filter((r) =>
                  r.nome.toLowerCase().includes(searchText.toLowerCase())
                )
                .map((rotina) => (
                  <CardCargoRotinas key={rotina.id} rotina={rotina} />
                ))
            )}
          </div>
        </div>
      </div>

      <ModalIniciarRotina
        openModal={modalAberto}
        closeModal={() => setModalAberto(false)}
        onRotinaIniciada={handleRotinaIniciada}
      />
    </div>
  );
}
