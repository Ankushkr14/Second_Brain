import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import { CloseIcon } from "./icons/closeIcon";

interface BrainShareModelProps {
    open: boolean;
    onClose: () => void;
}

export const BrainShareModel = ({ open, onClose }: BrainShareModelProps) => {
    const [isPublic, setIsPublic] = useState(false);
    const [shareableLink, setShareableLink] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (open) {
            loadBrainSettings();
        }
    }, [open])


    const loadBrainSettings = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/user/brain/settings`, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                }
            })

            if (response.data.success) {
                setIsPublic(response.data.settings.isPublic);
                setShareableLink(response.data.settings.shareableLink);
            }
            //else for error handling
            

        } catch (error) {
            console.error("Error in loading brain setting.");
        }
    }

    const handleToggle = async () =>{
        setLoading(true);
        try{

            const response = await axios.put(`${BACKEND_URL}/user/brain/toggle`, {
                isPublic: !isPublic
            }, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                }
            })

            if(response.data.success){
                setIsPublic(response.data.isPublic);
                setShareableLink(response.data.shareableLink || '');
            }
            
        }catch(error){
            console.error("Error in toggle brain.")
        }finally{
            setLoading(false);
        }
    }

    const handleCopyLink = ()=>{
        if(shareableLink){
            navigator.clipboard.writeText(shareableLink);
            setCopied(true);
            setTimeout(()=> setCopied(false), 3000);
        }
    }


    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md space-y-6 relative">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <CloseIcon />
                </button>

                {/* Header */}
                <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-gray-900">Share Your Brain</h3>
                    <p className="text-sm text-gray-500">
                        Share your brain with others. They'll see your content but won't be able to modify it.
                    </p>
                </div>

                <div className="space-y-6">
                    {/* Sharing Toggle */}
                    <div className="flex items-center justify-between">
                        <span className="text-base font-medium text-gray-900">Sharing enabled</span>
                        <button
                            onClick={handleToggle}
                            disabled={isLoading}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                                isPublic ? 'bg-blue-600' : 'bg-gray-200'
                            } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                    isPublic ? 'translate-x-6' : 'translate-x-1'
                                }`}
                            />
                        </button>
                    </div>

                    {/* Shareable Link Section */}
                    {isPublic && shareableLink && (
                        <div className="space-y-3">
                            <label className="block text-sm font-medium text-gray-700">
                                Share Link
                            </label>
                            <div className="flex">
                                <input
                                    type="text"
                                    readOnly
                                    value={shareableLink}
                                    className="flex-1 rounded-l-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-700 focus:outline-none"
                                />
                                <button
                                    onClick={handleCopyLink}
                                    className="rounded-r-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                                >
                                    {copied ? 'Copied!' : 'Copy'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex justify-end pt-4">
                    <button
                        onClick={onClose}
                        className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}