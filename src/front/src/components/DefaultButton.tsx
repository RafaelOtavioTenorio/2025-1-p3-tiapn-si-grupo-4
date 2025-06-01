import type { PropsWithChildren } from "react"

interface ButtonProps extends PropsWithChildren {
    onClick?: () => void
    type?: ButtonTypes
}

export enum ButtonTypes {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    ERROR = 'error'
}

export default function DefaultButton(props: ButtonProps) {
    const buttonType = props.type || ButtonTypes.PRIMARY;

    return (
        <div className="">
            <button className={
                // Classes de background e texto baseadas no tipo do botão
                `${buttonType == ButtonTypes.PRIMARY ? `bg-[#0A2C35]` :
                    buttonType == ButtonTypes.SECONDARY ? `bg-amber-50` :
                        `bg-red-500`}
                ${buttonType == ButtonTypes.SECONDARY ? 'text-slate-800' : 'text-white'} rounded-lg
                
                // Tamanho da fonte fixo, permitindo que o botão se ajuste ao texto
                text-xl font-bold
                
                // Classes de transição e hover
                transition-colors
                ${buttonType == ButtonTypes.PRIMARY ? `hover:bg-amber-50` :
                    buttonType == ButtonTypes.SECONDARY ? `hover:bg-[#0A2C35] hover:text-white` :
                        `hover:bg-red-700`}
                hover:text-slate-800
                
                // Padding para distanciar o texto das bordas (agora o botão se ajusta a isso)
                px-4 py-4 
                ${props.children === 'Criar' ? 'w-35' : 'w-fit'}
                `}
                
                onClick={props.onClick}>
                {props.children}
            </button>
        </div >
    )
}