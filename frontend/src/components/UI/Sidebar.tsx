import { BrainIcon } from "../icons/brainIcon";
import { TwitterIcon } from "../icons/twitterIcon";
import { YoutubeIcon } from "../icons/youtubeIcon";
import { SidebarItem } from "./SidebarItem";

export function Sidebar(){
    return <div className = "h-screen bg-white border-r absolute w-72 left-0 top-0 pl-6">
        <div className="flex text-2xl pt-8 items-center ">
            <div className="pr-2 text-purple-600">
                <BrainIcon/>
            </div>
            Brainly
        </div>

        <div className="pt-8">
            <SidebarItem text="Twitter" icon={<TwitterIcon/>}/>
            <SidebarItem text="Youtube" icon={<YoutubeIcon/>}/>
        </div>

    </div>
}