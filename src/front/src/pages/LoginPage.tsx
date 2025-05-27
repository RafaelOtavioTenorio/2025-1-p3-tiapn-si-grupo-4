import { useEffect, useState, type FormEvent, type Key } from "react"
import Bg1 from "../asset/bg-01.png";
import Bg2 from "../asset/bg-02.png";
import Bg3 from "../asset/bg-03.png";
import Bg4 from "../asset/bg-04.png";
import { Link, useNavigate } from "react-router";
import { loginUser } from "../services/auth";


export default function LoginPage() {
    const [isLogon, setLogon] = useState(false);


    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const toggleLogon = (e: Event) => {
        e.preventDefault();

        setLogon(prev => !prev);
    }


    return (
        <main className="flex w-full flex-row h-screen overflow-hidden relative bg-[#D9D9D9]">
            <div className="absolute w-full h-full">
                <img src={Bg1} alt="Audit" className="absolute bottom-10 left-0 scale-150 border-[#0A2C35] z-10" />
                <img src={Bg2} alt="Audit" className="absolute bottom-10 right-1/2 -translate-x-14 scale-130 border-[#0A2C35] z-10" />
                <img src={Bg3} alt="Audit" className="absolute bottom-10 left-1/2 translate-x-5 scale-120 border-[#0A2C35] z-20" />
                <img src={Bg4} alt="Audit" className="absolute bottom-10 right-0 scale-120 translate-x-10 border-solid border-[#0A2C35] z-20" />

                <div className="absolute right-32 top-1/4 -translate-y-1/2 z-30 transition-opacity duration-700 ease-in-out">
                    <h1 className="text-4xl font-bold text-[#0A2C35] max-w-md mb-6">
                        GERENCIE ROTINAS E TAREFAS DA SUA EMPRESA
                    </h1>
                    <p className="text-xl text-[#0A2C35] opacity-80 max-w-sm leading-relaxed">
                        Crie e tenha <span className="font-bold">controle</span> de suas rotinas,
                        <span className="font-bold"> gerencie</span> insumos,
                        <span className="font-bold"> otimize</span> processos e muito mais.
                    </p>
                </div>

                <div className="absolute left-32 top-1/4 -translate-y-1/2 z-30 transition-opacity duration-700 ease-in-out">
                    <h1 className="text-4xl font-bold text-[#0A2C35] max-w-md mb-6">
                        SISTEMA INTELIGENTE
                    </h1>
                    <p className="text-xl text-[#0A2C35] opacity-80 max-w-sm leading-relaxed">
                        Elimine processos manuais e aumente a eficiência.
                    </p>
                </div>
            </div>
            <div className="flex w-full h-full relative z-50">
                <div className={`flex w-1/2 h-full bg-gray-200 transition-all duration-700 ease-in-out ${isLogon ? 'translate-x-full' : 'translate-x-0'
                    }`}>
                    {!isLogon ? <Login toggle={toggleLogon} /> : <Signup toggle={toggleLogon} />}
                </div>
            </div>
        </main>
    )
}

const Signup = (props: { toggle: (e: any) => void }) => {
    return (
        <div className="flex top-1/4 items-center w-full h-full bg-[#0A2C35]">
            <form action="" className="w-full h-full flex items-center justify-center">
                <div className="flex flex-col items-left">
                    <h1 className="text-4xl font-bold text-white mb-6 ">Cadastrar</h1>
                    <input
                        type="text"
                        placeholder="Email"
                        className="mb-4 p-2 rounded-md w-64 bg-[#F5F5F5] text-[#0A2C35] focus:outline-none focus:ring-2 focus:ring-[#00161C] transition-colors duration-300"
                    />
                    <input
                        type="text"
                        placeholder="Nome"
                        className="mb-8 p-2 rounded-md w-64 bg-[#F5F5F5] text-[#0A2C35] focus:outline-none focus:ring-2 focus:ring-[#00161C] transition-colors duration-300"
                    />
                    <Link to={"/signup"}
                        type="submit"
                        className="bg-[#00161C] text-center text-[#F5F5F5] text-xl font-bold w-64 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors duration-300"
                    >
                        CADASTRAR
                    </Link>


                    <a href="#" onClick={props.toggle} className="text-[#F5F5F5] text-sm text-center mt-6 hover:underline">
                        ja tenho uma conta.
                    </a>


                </div>
            </form>
        </div>
    )
}

const ErrorMessage = (props: { message: string | null, key: Key }) => {

    const [bounce, setBounce] = useState(true)

    setInterval(() => {
        setBounce(false)
    }, 500)

    return (<>
        {props.message && (
            <div
                key={props.key}
                className={`mt-4 text-red-500 text-sm text-center ${bounce ? 'animate-wiggle' : ''}`}
            >
                {props.message}
            </div>
        )}
    </>
    )
}



const Login = ({ toggle }: { toggle: (e: any) => void }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [errorKey, setErrorKey] = useState(0);
    const navigate = useNavigate();

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        try {
            await loginUser({ Login: email, Senha: password });
            navigate('/app');
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Falha no login. Tente novamente.';
            setError(errorMessage);
            setErrorKey(prevKey => prevKey + 1);
            console.error(err);
        }
    };

    return (
        <div className="flex w-full h-full bg-[#0A2C35]"> {/* Container do formulário de Login */}
            <form onSubmit={handleSubmit} className="w-full flex flex-col items-center justify-center">
                <div className="flex flex-col items-left"> {/* Conteúdo do formulário */}
                    <h1 className="text-4xl font-bold text-white mb-6">Entrar</h1>
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value ?? "")}
                        className="mb-4 p-2 rounded-md w-64 bg-[#F5F5F5] text-[#0A2C35] focus:outline-none focus:ring-2 focus:ring-[#00161C] transition-colors duration-300"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value ?? "")}
                        className="mb-8 p-2 rounded-md w-64 bg-[#F5F5F5] text-[#0A2C35] focus:outline-none focus:ring-2 focus:ring-[#00161C] transition-colors duration-300"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-[#00161C] text-[#F5F5F5] text-xl font-bold w-64 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors duration-300"
                    >
                        ENTRAR
                    </button>
                    <button
                        type="button"
                        onClick={toggle} // Para alternar para o formulário de cadastro
                        className="bg-[#F5F5F5] mt-4 text-[#0A2C35] px-4 py-2 text-xl font-bold w-64 rounded-md hover:bg-gray-300 transition-colors duration-300"
                    >
                        CADASTRAR
                    </button>

                    <a href="#" className="text-[#F5F5F5] text-sm text-center mt-6 hover:underline">
                        esqueceu a senha?
                    </a>

                    <ErrorMessage key={errorKey} message={error} />


                </div>
            </form>
        </div>
    );
};


