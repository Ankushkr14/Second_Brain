import axios from "axios"
import { BACKEND_URL } from "../config"
import { useEffect, useState } from "react";
import { Button } from "./UI/Buttton";
import { CopyIcon } from "./icons/copyIcon";

interface ShareContentModelProps{
    open: boolean;
    onClose: ()=>void;
    contentId: string;
}


export const ShareContentModel = ({open, onClose, contentId}: ShareContentModelProps) =>{
    
    const [permission, setPermission] = useState("read");
    const [shareableLink, setShareableLink] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isCopied, setIsCopied] = useState(false);    

    
    useEffect(() => {
        if (open && contentId) {
            setIsLoading(true);
            setShareableLink(""); 
            axios.post(`${BACKEND_URL}/user/content/${contentId}/share`, 
                { permission: permission },
                {
                    headers: { Authorization: localStorage.getItem("token") }
                }
            )
            .then((response) => {
                setShareableLink(response.data.shareableLink);
            })
            .catch((error) => {
                console.error("Error generating shareable link:", error);
                
            })
            .finally(() => {
                setIsLoading(false);
            });
        }
    }, [open, contentId, permission]);

    const handleCopyLink = () =>{
        if(shareableLink){
            navigator.clipboard.writeText(shareableLink);
            setIsLoading(false);
            setIsCopied(true);
            setTimeout(() => {
                setIsCopied(false);
            }, 3000); 
        }
    }

    if(!open) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md space-y-4">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-gray-900">Share Content</h3>
                </div>

                {/* Permission Dropdown */}
                <div>
                    <label htmlFor="permission" className="block text-sm font-medium text-gray-700">Permission</label>
                    <select
                        id="permission"
                        value={permission}
                        onChange={(e) => setPermission(e.target.value)}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border"
                    >
                        <option value="read">Read-Only</option>
                        <option value="edit">Allow Editing</option>
                    </select>
                </div>

                {/* Shareable Link Input and Copy Button */}
                <div className="mt-2 flex rounded-md shadow-sm">
                    <input
                        type="text"
                        readOnly
                        value={isLoading ? "Generating link..." : shareableLink}
                        className="flex-1 block w-full px-3 py-2 rounded-none rounded-l-md sm:text-sm border-gray-300 bg-gray-50 border"
                        placeholder="Generating link..."
                    />
                    <button
                        onClick={handleCopyLink}
                        disabled={isLoading || !shareableLink}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        {isCopied? "Copied!": <CopyIcon size="md" />}
                    </button>
                </div>

                {/* Footer */}
                <div className="flex justify-end pt-2">
                    <Button
                        onClick={onClose}
                        text="Close"
                        variant="secondary"
                        size="md"
                    />
                </div>
            </div>
        </div>
    );

}