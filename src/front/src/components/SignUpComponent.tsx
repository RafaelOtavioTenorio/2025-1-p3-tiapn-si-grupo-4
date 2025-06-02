import { useState } from "react";
import { useNavigate } from "react-router"
import DefaultButton, { ButtonTypes } from "../../../src/components/DefaultButton";

const Signup = (props: { toggle: (e: any) => void }) => {

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const navigate = useNavigate();


    const onFormSubmit = (e: any) => {
        e.preventDefault();
        if (!email || !name) {
            alert('Por favor, preencha todos os campos');
            return;
        }

        navigate("/signup", {

            state: { email, name }
        });
    }

    return (
        <div className="flex top-1/4 items-center w-full h-full bg-[#0A2C35]">
            <form onSubmit={onFormSubmit}

                className="w-full h-full flex items-center justify-center"
            >
                <div className="flex flex-col items-left">
                    <h1 className="text-4xl font-bold text-white mb-6 ">Cadastrar</h1>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        className="mb-4 p-2 rounded-md w-64 bg-[#F5F5F5] text-[#0A2C35] focus:outline-none focus:ring-2 focus:ring-[#00161C] transition-colors duration-300"
                    />
                    <input
                        type="text"
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nome"
                        className="mb-8 p-2 rounded-md w-64 bg-[#F5F5F5] text-[#0A2C35] focus:outline-none focus:ring-2 focus:ring-[#00161C] transition-colors duration-300"
                    />

                    <DefaultButton
                        buttonType={ButtonTypes.ACTION}

                        type="submit"
                    >
                        CADASTRAR
                    </DefaultButton>

                    <a href="#" onClick={props.toggle} className="text-[#F5F5F5] text-sm text-center mt-6 hover:underline">
                        ja tenho uma conta.
                    </a>
                </div>
            </form>
        </div>
    )
}





export default Signup;