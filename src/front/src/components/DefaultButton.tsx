import type { PropsWithChildren } from "react"

interface ButtonProps extends PropsWithChildren {
    onClick?: () => void
}


export default function DefaultButton(props: ButtonProps) {


    return (
        <div className="">
            <button className="bg-[#0A2C35] text-white rounded-lg h-16 w-48 text-xl font-bold transition-colors hover:bg-amber-50 hover:text-slate-800  " onClick={props.onClick}>
                {props.children}
            </button>
        </div>
    )
}