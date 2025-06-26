import type { PropsWithChildren } from "react"

interface ButtonProps extends PropsWithChildren {
    onClick?: () => void
    buttonType?: ButtonTypes
}

export enum ButtonTypes {
    PRIMARY = 'primary',
    ACTION = 'action',
    SECONDARY = 'secondary',
    ERROR = 'error'
}

export default function DefaultButton({ buttonType: type, onClick, children, ...props }: ButtonProps & Record<string, any>) {
    const buttonType = type || ButtonTypes.PRIMARY;

    return (
        <div className="">
            <button
                {...props}
                className={
                    `${buttonType === ButtonTypes.PRIMARY ? 'bg-[#0A2C35] text-white hover:bg-amber-50 hover:text-slate-800' : ''}
                    ${buttonType === ButtonTypes.SECONDARY ? 'bg-amber-50 text-slate-800 hover:bg-[#0A2C35] hover:text-white' : ''}
                    ${buttonType === ButtonTypes.ACTION ? 'bg-[#00161C] text-[#F5F5F5] hover:bg-gray-300 hover:text-slate-800' : ''}
                    ${buttonType === ButtonTypes.ERROR ? 'px-11 text-white bg-red-600 hover:bg-red-700' : 'w-fit'}
                    text-xl font-bold rounded-lg transition-colors shadow-md
                    px-4 py-4 
                    ${children === 'CRIAR' ? 'px-15 w-35' : 'w-fit'}
                    ${children === 'CANCELAR' ? 'px-9 bg-gray-400 hover:bg-gray-300' : 'w-fit'}
                    shadow-md
                    `}
                onClick={onClick}
            >
                {children}
            </button>
        </div>
    )
}