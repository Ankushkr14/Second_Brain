import { ReactElement } from "react";

export function SidebarItem({text, icon, active = false, onClick, customHover}:{
    text: string;
    icon: ReactElement;
    active?: boolean;
    onClick?: () => void;
    customHover?: boolean;
    }){
        return <div 
        className={`flex py-2 cursor-pointer rounded max-w-56 pl-4 transition-all duration-150 ${
            active 
                ? 'bg-blue-100 text-blue-600 lg:bg-white lg:text-blue-600' 
                : customHover 
                    ? 'text-gray-800 lg:text-white' 
                    : 'text-gray-800 lg:text-white hover:bg-blue-400 lg:hover:bg-blue-400'
        }`}
        onClick={onClick}
    >
            <div className="pr-2">
                {icon}
            </div>
            <div>
                {text}
            </div>
        </div>
    }