import { ReactElement } from "react";

export function SidebarItem({text, icon}:{
    text: string;
    icon: ReactElement;
}){
    return <div className="flex text-gray-700 py-2 ursor-pointer hover:bg-gray-200 rounded max-w-56 pl-4 transition-colors transition-all duration-150" >
        <div className="pr-2 c">
            {icon}
        </div>
        <div>
            {text}
        </div>
    </div>
}