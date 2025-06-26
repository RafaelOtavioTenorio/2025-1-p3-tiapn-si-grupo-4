import {
    AccessTime,
    AddCircleOutlineRounded,
    ArrowBackIosRounded,
    Person,
    ViewKanbanOutlined,
    LogoutRounded,
    Group
} from '@mui/icons-material';
import { useState } from "react";
import { Link } from "react-router";
import { Pannels } from '~/root';

interface props {
    activePannel: string;
    setActivePannel: (pannel: string) => void;
}

export default function SidePannel(props: props) {

    if (props.activePannel == undefined) {
        props.setActivePannel(Pannels.CREATE)
        props.activePannel = 'create';
    }


    const [open, setOpen] = useState(false);
    const handleClickPannelItem = () => {
        setOpen(!open);
    }



    return (<>
        <div className={`${open ? 'w-1/5' : 'w-16'} bg-[#1A4855] min-h-screen max-h-screen h-screen flex flex-col transition-all duration-300  `} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} >
            <div className={`flex flex-row items-center ${open ? `justify-end` : `justify-center`} m-5`}>
                <span className='rounded-full m-5'
                    onClick={handleClickPannelItem}
                >
                    <ArrowBackIosRounded className={`text-[#F5F5F5] transform ${open ? '' : 'rotate-180'} transition-transform duration-300`} />

                </span>
            </div>


            <SidePannelRow icon={AddCircleOutlineRounded} open={open} text="Criar" pannel={Pannels.CREATE} active={props.activePannel == 'create'} setActivePannel={props.setActivePannel} />
            <SidePannelRow icon={ViewKanbanOutlined} open={open} text="Rotinas" pannel={Pannels.ROUTINES} active={props.activePannel == 'routines'} setActivePannel={props.setActivePannel} />
            <SidePannelRow icon={AccessTime} open={open} text="Historico" pannel={Pannels.HISTORIC} active={props.activePannel == 'historic'} setActivePannel={props.setActivePannel} />
            <SidePannelRow icon={Group} open={open} text="Grupos" pannel={Pannels.GROUPS} active={props.activePannel == 'groups'} setActivePannel={props.setActivePannel} />
            <SidePannelRow icon={Person} open={open} text="Usuario" pannel={Pannels.USER} active={props.activePannel == 'user'} setActivePannel={props.setActivePannel} />

            <div className="mt-auto mb-12">
                <SidePannelRow
                    icon={LogoutRounded}
                    open={open}
                    text="Sair"
                    pannel="logout"
                    active={false}
                    setActivePannel={() => {
                        localStorage.clear();
                        window.location.href = '/login';
                    }}
                />
            </div>
        </div>
    </>)
}

interface SidePannelRowProps {
    open: boolean;
    text: string;
    icon: any;
    pannel: string;
    active: boolean;
    setActivePannel: (pannel: string) => void;
}

function SidePannelRow(
    props: SidePannelRowProps
) {

    return (
        <Link to={"/" + props.pannel} onClick={() => { props.setActivePannel(props.pannel) }} className={`flex flex-row items-center cursor-pointer 
                ${props.open ? `justify-start` : `justify-center`}
                mx-4 my-1 p-4 transition-colors duration-200 h-20
                ${props.open && props.active ? 'border border-[#235563]  rounded-lg bg-[#235563]' : ''}`}>
            <div className="flex justify-center">
                <span className={`${!props.open && 'mx-auto'}`}>
                    <span color="#0A2C35" className="bg-[#F5F5F5] p-2 rounded-[100px] "  >
                        <props.icon className="fontSizeLarge" /></span>
                </span>
            </div>
            <span className={`text-white text-xl ml-2 ${props.open ? 'block' : 'hidden'}`}>{props.text[0].toUpperCase() + props.text.substring(1)}</span>
        </Link>
    )
}