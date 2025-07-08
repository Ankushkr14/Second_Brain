import { useState } from "react";
import { BrainIcon } from "../icons/brainIcon";
import { HomeIcon } from "../icons/homeIcon";
import { LogoutIcon } from "../icons/logoutIcon";
import { SearchIcon } from "../icons/searchIcon";
import { TwitterIcon } from "../icons/twitterIcon";
import { UrlIcon } from "../icons/urlIcon";
import { YoutubeIcon } from "../icons/youtubeIcon";
import { SidebarItem } from "./SidebarItem";
import { MenuIcon } from "../icons/menuIcon";
import { GithubIcon } from "../icons/githubIcon";

export function Sidebar({activeItem, setActiveItem}:{
    activeItem: string;
    setActiveItem: (item: string) => void;
}) {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


    return (
        <>
            {/* Mobile hamburger button*/}
            {!isMobileMenuOpen && (
                <div className="lg:hidden fixed top-4 left-4 z-50">
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg shadow-lg"
                    >
                        <MenuIcon />
                    </button>
                </div>
            )}

            <div className={`h-screen border-r absolute w-64 left-0 top-0 pl-6 shadow-lg transition-transform duration-300 z-50 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 bg-white lg:bg-blue-500`}>
                <div className="flex text-2xl pt-8 items-center justify-between text-gray-800 lg:text-white">
                    <div className="flex items-center">
                        <div className="pr-2 pl-2">
                            <BrainIcon />
                        </div>
                        Second Brain
                    </div>
                </div>

                {/* Sidebar content */}
                <div className="pt-8 space-y-4">
                    <SidebarItem
                        text="All Content"
                        icon={<HomeIcon size="lg" />}
                        active={activeItem === "All Content"}
                        onClick={() => {
                            setActiveItem("All Content");
                            setIsMobileMenuOpen(false);
                        }}
                    />
                    <SidebarItem
                        text="Search"
                        icon={<SearchIcon size="lg" />}
                        active={activeItem === "Search"}
                        onClick={() => {
                            setActiveItem("Search");
                            setIsMobileMenuOpen(false);
                        }}
                    />
                    <SidebarItem
                        text="Twitter"
                        icon={<TwitterIcon />}
                        active={activeItem === "Twitter"}
                        onClick={() => {
                            setActiveItem("Twitter");
                            setIsMobileMenuOpen(false);
                        }}
                    />
                    <SidebarItem
                        text="Youtube"
                        icon={<YoutubeIcon />}
                        active={activeItem === "Youtube"}
                        onClick={() => {
                            setActiveItem("Youtube");
                            setIsMobileMenuOpen(false);
                        }}
                    />
                    <SidebarItem
                        text="URL"
                        icon={<UrlIcon size="lg" />}
                        active={activeItem === "URL"}
                        onClick={() => {
                            setActiveItem("URL");
                            setIsMobileMenuOpen(false);
                        }}
                    />
                </div>

                <div className="absolute bottom-4 left-4 right-4 space-y-2">
                    <div className="hover:bg-green-400 hover:text-white transition-all duration-200 rounded-lg p-1">
                        <SidebarItem
                        text="Star on GitHub"
                        icon={<GithubIcon />}
                        active={activeItem === "Star on GitHub"}
                        customHover={true}
                        onClick={() => {
                            setActiveItem("Star on GitHub");
                            setIsMobileMenuOpen(false);
                            window.open('https://github.com/Ankushkr14/Second_Brain', '_blank');
                        }}
                    />
                    </div>
                    <div className="hover:bg-red-500 hover:text-white transition-all duration-200 rounded-lg p-1">
                        <SidebarItem
                            text="Logout"
                            icon={<LogoutIcon />}
                            active={activeItem === "Logout"}
                            customHover={true}
                            onClick={() => {
                                setActiveItem("Logout");
                                setIsMobileMenuOpen(false);
                                localStorage.removeItem("token");
                                window.location.href = "/signin";
                            }}
                        />
                    </div>
                </div>

            </div>

            {/* Background overlay */}
            {isMobileMenuOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
        </>
    )
}