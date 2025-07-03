import { DeleteIcon } from "../icons/deleteIcon";
import { NoteIcon } from "../icons/noteIcon";
import { ShareIcon } from "../icons/shareIcon";
import { useMemo } from "react";


interface cardProps{
    title: string;
    link: string;
    type: "youtube" | "twitter";
}

export function Card({title, link, type}:cardProps){
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

    return <div>
        <div className="bg-white rounded-md p-4 border border-gray-200 max-w-72 shadow-sm min-h-48 min-w-72">
            <div className="flex justify-between ">
                <div className="flex items-center">
                    <div className="pr-2 text-gray-700">
                        <NoteIcon size= "md"/>
                    </div>
                    {title}
                </div>
                <div className="flex items-center">
                    <div className="pr-2 text-gray-700">
                        <ShareIcon size="md"/>
                    </div>
                    <div className="text-gray-600">
                        <DeleteIcon size = "md"/>
                    </div>
                </div>
            </div>
            <div className= "w-full pt-4">
                {type === "youtube" && (
                    !videoId ? (
                        <div className="text-red-500">Invalid YouTube link</div>
                    ) : (
                        <iframe className="w-full"
                            src={`https://www.youtube.com/embed/${videoId}`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    )
                )}

                {type === "twitter" &&
                <blockquote className="twitter-tweet">
                    <a href={link.replace("x.com", "twitter.com")}></a>
                </blockquote>
                }

                
            

            </div>
        </div>
    </div>
} 