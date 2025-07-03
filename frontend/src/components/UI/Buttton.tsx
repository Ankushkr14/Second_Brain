import { ReactElement } from "react";

interface ButtonProps {
    variant: 'primary' | 'secondary',
    text: string,
    startIcon?: ReactElement,
    endIcon?: ReactElement,
    size: "lg" | "md" | "sm",
    onClick?: () => void,
    fullwidth?: boolean,
    loading?: boolean,
}

const variantStyle = {
    "primary": "bg-purple-600 text-white",
    "secondary": "bg-purple-300 text-purple-500"
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