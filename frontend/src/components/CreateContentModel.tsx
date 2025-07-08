import { useEffect, useState } from "react";
import { Button } from "./UI/Buttton";
import { Input } from "./UI/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { CloseIcon } from "./icons/closeIcon";


export function CreateContentModel({open, onClose, onContentAdded}:{open:boolean, onClose:()=>void, onContentAdded:()=>void }){

    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [type, setType] = useState("url");
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState("");


    const getDefaultTag = (type: string)=>{
        if(type ==="youtube") return "video";
        if(type ==="twitter") return "tweets";
        return "url";
    }

    useEffect(()=>{

        const defaultTag = getDefaultTag(type);
        setTags((prev)=>{
            const filtered = prev?.filter(
                t => !["video","tweets","url"].includes(t)
            );
            return [defaultTag, ...(filtered ?? [])];
        })
    },[type])


    //auto-detect url type based on the link input 
    const handleLinkChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const url = e.target.value;

        setLink(url);
        if(url.includes("youtube.com") || url.includes("youtu.be")){
            setType("youtube");
        }else if(url.includes("twitter.com") || url.includes("x.com")){
            setType("twitter"); 
        }else{
            setType("url");
        }
    }

    //Add tags
    const handleAddTag = ()=>{
        const trimmed = tagInput.trim();
        if(trimmed && !tags?.includes(trimmed)){
            setTags([...(tags ?? []), trimmed]);
            setTagInput("");
        }
    }

    //Remove tag 
    const handleRemoveTag = (tag: string)=>{
        const defaultTag = getDefaultTag(type);
        if(tag === defaultTag)return;
        setTags(tags?.filter(t => t !== tag));
    }

    const handleSubmit = async () =>{
        
        await axios.post(`${BACKEND_URL}/user/content`, {
            type, 
            title,
            link,
            tags
        }, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        .then(()=>{
            onClose();
            onContentAdded();
        })
        .catch((error)=>{
            console.log("Error: ", error);
        })
    };


    if(!open) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-85 transition-opacity flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-xl transform transition-all sm:my-8 sm:max-w-sm sm:w-full p-7 space-y-4">
                
                {/* Modal Header */}
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="text-lg leading-6 font-bold text-gray-900">Add New Content</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Add a link to your second brain. We'll automatically detect the content type.
                        </p>
                    </div>
                    <button onClick={onClose} className="text-black bg-gray-300 rounded-md hover:text-white hover:bg-gray-600">
                        <CloseIcon/>
                    </button>
                </div>

                {/* Form Body */}
                <div className="space-y-4">
                    {/* Title Input */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                        <Input
                            placeholder="Enter a title for this content"
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                            required={true}
                        />
                    </div>

                    {/* Link Input */}
                    <div>
                        <label htmlFor="link" className="block text-sm font-medium text-gray-700">Link</label>
                        <Input
                            placeholder="https://example.com"
                            value={link} 
                            onChange={handleLinkChange}
                            type="text"
                            required={true}
                        />
                    </div>

                    {/* Content Type Dropdown */}
                    <div>
                        <label htmlFor="content-type" className="block text-sm font-medium text-gray-700">Content Type</label>
                        <select
                            id="content-type"
                            className="mt-1 ml-2 block w-80 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            <option value="url">URL</option>
                            <option value="youtube">Youtube</option>
                            <option value="twitter">Twitter</option>
                        </select>
                    </div>

                    {/* Tags Section */}
                    <div>
                        <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags</label>
                        <div className="flex gap-2 mt-1">
                            <Input
                                placeholder="Add a tag and press Enter"
                                value={tagInput}
                                onChange={e => setTagInput(e.target.value)}
                                onKeyDown={e => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        handleAddTag();
                                    }
                                }}
                            />
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {tags?.map(tag => (
                                <span key={tag} className="bg-blue-100 text-blue-600 text-sm font-medium px-3 py-1 rounded-md flex items-center">
                                    {tag}
                                    {tag !== getDefaultTag(type) && (
                                        <button type="button" className="ml-1.5 size-sm text-blue-800 hover:text-black" onClick={() => handleRemoveTag(tag)}>
                                            &times;
                                        </button>
                                    )}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="flex justify-end gap-3 pt-4">
                    <Button variant="secondary" size="md" text="Cancel" onClick={onClose}/>
                    <Button variant="primary" size="md" text="Add Content" onClick={handleSubmit}/>
                </div>
            </div>
        </div>
    );
}
