import { faClock, faUser } from "@fortawesome/free-regular-svg-icons";
import { faArrowAltCircleLeft, faPlusSquare, faTable } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function SidePannel() {

    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(!open);
    }

    return (<>
        <div className='flex flex-row h-screen  '>
            <div className={`${open ? 'w-1/5' : 'w-16'} bg-[#1A4855] h-screen flex flex-col transition-all duration-300`}>
                <div className={`flex flex-row items-center ${open ? `justify-end` : `justify-center`} m-5`}>
                    <span className='rounded-full m-5'
                        onClick={handleClick}
                    >
                        <FontAwesomeIcon
                            icon={faArrowAltCircleLeft}
                            className={`text-[#F5F5F5] transform ${open ? '' : 'rotate-180'} transition-transform duration-300`}
                        />
                    </span>
                </div>

                <div className='flex flex-row items-center m-5'>
                    <span className={`${!open && 'mx-auto'}`}>
                        <FontAwesomeIcon icon={faPlusSquare} color="#0A2C35" size="lg" className="bg-[#F5F5F5] p-2 rounded rounded-full" />
                    </span>
                    <span className={`text-white text-xl p-3 ${open ? 'block' : 'hidden'}`}>Criar</span>
                </div>
                <div className='flex flex-row items-center m-5'>
                    <span className={`${!open && 'mx-auto'}`}>
                        <FontAwesomeIcon icon={faTable} color="#0A2C35" size="lg" className="bg-[#F5F5F5] p-2 rounded rounded-full" />
                    </span>
                    <span className={`text-white text-xl p-3 ${open ? 'block' : 'hidden'}`}>Rotinas</span>
                </div>
                <div className='flex flex-row items-center m-5'>
                    <span className={`${!open && 'mx-auto'}`}>
                        <FontAwesomeIcon icon={faClock} color="#0A2C35" size="lg" className="bg-[#F5F5F5] p-2 rounded rounded-full" />
                    </span>
                    <span className={`text-white text-xl p-3 ${open ? 'block' : 'hidden'}`}>Historico</span>
                </div>
                <div className='flex flex-row items-center m-5'>
                    <span className={`${!open && 'mx-auto'}`}>
                        <FontAwesomeIcon icon={faUser} color="#0A2C35" size="lg" className="bg-[#F5F5F5] p-2 rounded rounded-full" />
                    </span>
                    <span className={`text-white text-xl p-3 ${open ? 'block' : 'hidden'}`}>Grupos</span>
                </div>
            </div>
            <div className='flex-1 bg-[#F5F5F5] h-screen'>
                <p className='text-black text-xl font-bold p-4'>Main Content</p>
            </div>
        </div>
    </>)
}