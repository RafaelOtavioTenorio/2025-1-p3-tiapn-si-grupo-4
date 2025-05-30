import { useState } from "react";
import { Link } from "react-router"

const Signup = (props: { toggle: (e: any) => void }) => {

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')

    return (
        <div className="flex top-1/4 items-center w-full h-full bg-[#0A2C35]">
            <form action="" className="w-full h-full flex items-center justify-center">
                <div className="flex flex-col items-left">
                    <h1 className="text-4xl font-bold text-white mb-6 ">Cadastrar</h1>
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mb-4 p-2 rounded-md w-64 bg-[#F5F5F5] text-[#0A2C35] focus:outline-none focus:ring-2 focus:ring-[#00161C] transition-colors duration-300"
                    />
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nome"
                        className="mb-8 p-2 rounded-md w-64 bg-[#F5F5F5] text-[#0A2C35] focus:outline-none focus:ring-2 focus:ring-[#00161C] transition-colors duration-300"
                    />
                    <Link
                        to={{
                            pathname: "/signup",

                        }}
                        state={
                            {
                                email: email,
                                name: name
                            }
                        }
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





export default Signup;