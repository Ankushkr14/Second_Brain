import { ReactElement, ReactNode } from "react";

interface ButtonProps {
    variant: 'primary' | 'secondary' | 'danger',
    text?: string,
    startIcon?: ReactElement,
    endIcon?: ReactElement,
    size: "lg" | "md" | "sm",
    onClick?: () => void | null,
    fullwidth?: boolean,
    loading?: boolean,
    className?: string,
    children?:ReactNode
}

const variantStyle = {
    "primary": "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200",
    "secondary": "bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 hover:border-gray-400 shadow-md hover:shadow-lg transition-all duration-200",
    "danger" :"bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
}

const sizeStyle = {
    "sm": "px-2 py-1 text-sm rounded-sm",
    "md": "px-4 py-2 text-md rounded-md",
    "lg": "px-8 py-4 text-xl rounded-xl",
}

export const Button = (props: ButtonProps) => {
    return <button onClick={props.onClick} className={`flex items-center gap-2 ${variantStyle[props.variant]} ${sizeStyle[props.size]} ${props.fullwidth ? "w-full flex justify-center items-center" : ""} ${props.loading ? "opacity-50": ""}`} disabled={props.loading} >
        {props.startIcon}
        {props.text}
        {props.endIcon}
    </button>
}