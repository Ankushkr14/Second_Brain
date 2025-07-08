import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../config";
import axios from "axios";
import Masonry from "react-masonry-css";
import { Card } from "./UI/Card";
import { PublicBrainIcon } from "./icons/publicBrainIcon";
import { BrainIconForError, BrainIconWithText } from "./icons/brainIcon";

interface PublicBrainData{
    content: any[];
    total: number;
    brainOwner: {
        name: string;
    }
}

export const PublicBrainPage = ()=>{
    const { userId } = useParams();
    const [ brainData, setBrainData ] = useState<PublicBrainData | null>(null);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(''); 
    
    useEffect(()=>{
        if(userId) {
            loadPublicBrain();
        } else {
            setError('Invalid brain ID');
            setLoading(false);
        }
    },[userId]);

    const loadPublicBrain = async ()=>{
        try{
            console.log('Loading brain for userId:', userId);
            await new Promise(resolve => setTimeout(resolve, 1000));
            const response = await axios.get(`${BACKEND_URL}/brain/${userId}`);
            console.log('API Response:', response.data);
            
            if(response.data.success){
                const brainData = {
                    content: response.data.content || [],
                    total: response.data.total || 0,
                    brainOwner: response.data.brainOwner || { name: "Unknown User" }
                };
                setBrainData(brainData);
            } else {
                setError(response.data.message || 'Brain not accessible');
            }
        }catch(error: any){
            console.error('Error in loading public brain:', error);
            if(error.response?.status === 404){
                setError('Brain not found');
            } else if(error.response?.status === 403){
                setError('Brain content is private, please request access from the owner.');
            } else {
                setError('Failed to load brain');
            }
        }finally{
            setLoading(false);
        }
    }

    const breakpointColumns = {
        default: 4,
        1300: 3,
        1000: 2,
        500: 1
    }

    if(loading) return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
            <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4 animate-pulse">
                    <PublicBrainIcon />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading Brain...</h2>
                <p className="text-gray-500">Fetching shared knowledge</p>
            </div>
        </div>
    );

    if(!brainData || (brainData && brainData.content.length === 0)) return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
            <div className="text-center max-w-md mx-auto px-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-2xl mb-4">
                    <BrainIconWithText/>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Brain Not Found</h2>
                <p className="text-gray-500">The brain you're looking for doesn't exist or isn't publicly shared.</p>
            </div>
        </div>
    );
    
    if(error) return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
            <div className="text-center max-w-md mx-auto px-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-2xl mb-4">
                    <BrainIconForError/>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Oops! Something went wrong</h2>
                <p className="text-black mb-4">{error}</p>
                <button 
                    onClick={() => window.location.reload()} 
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Try Again
                </button>
            </div>
        </div>
    );
    
    

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Hero Section */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 py-12">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-3">
                            {brainData.brainOwner.name}
                        </h1>
                        <p className="text-lg text-gray-600 mb-2">
                            A curated collection of knowledge and resources
                        </p>
                        <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                            {brainData.total} {brainData.total === 1 ? 'item' : 'items'} shared
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                {brainData.content.length > 0 ? (
                    <>
                        {/* Filter/Category Section */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Explore the Collection</h2>
                            <div className="flex flex-wrap gap-2">
                                {/* Get unique types for filters */}
                                {Array.from(new Set(brainData.content.map(item => item.type))).map(type => (
                                    <span key={type} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                                        {type}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Content Grid */}
                        <Masonry
                            breakpointCols={breakpointColumns}
                            className="flex w-auto -ml-4"
                            columnClassName="pl-4 bg-clip-padding"
                        >
                            {brainData.content.map((item)=>(
                                <div key={item._id} className="mb-6">
                                    <div className="group hover:scale-105 transition-transform duration-200">
                                        <Card
                                            _id = {item._id}
                                            title = {item.title}
                                            link = {item.link}
                                            type = {item.type}
                                            tag = {item.tags}
                                            isPublicBrain = {true}
                                        />
                                    </div>
                                </div>
                            ))}
                        </Masonry>
                    </>
                ) : (
                    <div className="text-center py-16">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No content available</h3>
                        <p className="text-gray-500">This brain doesn't have any shared content yet.</p>
                    </div>
                )}
            </div>
        </div>
    );

};