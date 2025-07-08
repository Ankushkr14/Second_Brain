import { DeleteIcon } from "../icons/deleteIcon";
import { ShareIcon } from "../icons/shareIcon";
import { useMemo } from "react";
import { TwitterEmbed } from "./TwitterEmbed";
import { YoutubeIcon } from "../icons/youtubeIcon";
import { TwitterIcon } from "../icons/twitterIcon";
import { UrlIcon } from "../icons/urlIcon";
import { ExternalLinkIcon } from "../icons/externalLinkIcon";


export interface cardProps{
    _id: string;
    title: string;
    link: string;
    type: "youtube" | "twitter" | "url";
    tag: { _id: string; title: string}[];
    isDelete?: boolean;
    isShare?: boolean;
    onDelete?: (id: string, title : string) => void;
    onShare?: (id:string) => void;
    isPublicBrain?: boolean;
}

export function Card({_id, title, link, type, onDelete, tag, onShare, isPublicBrain, isDelete, isShare}:cardProps){
    const videoId = useMemo(() => {
        if(type !== "youtube") return null;
        try{
            const url = new URL(link);

            if(url.hostname === "youtube.com" || url.hostname === "www.youtube.com"){
                return url.searchParams.get("v");
            }

            if(url.hostname === "youtu.be"){
                return url.pathname.slice(1);
            }

            return null;
        }catch(e){
            return null;
        }
    }, [link, type]);

    return (
    <div className="w-86 bg-white rounded-xl shadow-xl border border-gray-200 flex flex-col justify-between p-2 pt-4 shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)] transition-shadow  duration-300 ease-in-out">
        {/* Header */}
        <div>
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-4 text-gray-800 font-bold text-lg">
                    {type === "youtube" && (
                        <div className="text-red-600">
                            <YoutubeIcon/>
                        </div>
                    )}
                    {type === "twitter" && (
                        <div className="text-blue-500">
                            <TwitterIcon/>
                        </div>
                    )}
                    {type === "url" && (
                        <UrlIcon size="lg"/>
                    )}
                    {title}
                </div>
                <div className="flex items-center gap-2">

                    {/* Share Button */}
                    {isShare && (
                        <button 
                            className="p-2 rounded-lg hover:bg-blue-600 hover:text-white text-slate-600 bg-blue-200 transition-colors"
                            onClick= {()=>onShare?.(_id)}
                            aria-label="Share"
                        >
                            <ShareIcon size="lg"/>
                        </button>
                    )}

                    {/* Public Link Button */}
                    {isPublicBrain && (
                        <button 
                            className="p-2 rounded-lg hover:bg-purple-600 text-white bg-purple-400 hover:text-purple-100 transition-colors"
                            onClick={() => window.open(link, "_blank")}
                            aria-label="Visit Original Link"
                            title="Open original link"
                        >
                            <ExternalLinkIcon/>
                        </button>
                    )}

                    {/* Delete Button */}
                    {isDelete && (
                        <button
                            className="p-2 rounded-lg hover:bg-red-600 text-white bg-red-400 hover:text-red-100 transition-colors"
                            onClick={() => onDelete?.(_id, title)}
                            aria-label="Delete"
                        >
                            <DeleteIcon size="lg" />
                        </button>
                    )}
                </div>
            </div>
        </div>
        {/* Content */}
        <div className="flex-1 flex items-center justify-center mb-3 overflow-hidden rounded-xl">
            {type === "youtube" && (
                !videoId ? (
                    <div className="text-red-500 text-base">Invalid YouTube link</div>
                ) : (
                    <iframe
                        className="w-full aspect-video rounded"
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    ></iframe>
                )
            )}
            {type === "twitter" && (
                <TwitterEmbed link = {link}/>
            )}
            {type === "url" && (
                <div className="text-blue-600 hover:underline break-all w-full text-center text-base">
                    <a href={link} target="_blank" rel="noopener noreferrer">
                        {link}
                    </a>
                </div>
            )}
        </div>
        {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-2">
                {Array.isArray(tag) && tag.map((t) => (
                    <span key={t._id} className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-base font-medium">
                        {t.title}
                    </span>
                ))}
            </div>
    </div>
    );
}