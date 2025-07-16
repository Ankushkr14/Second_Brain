import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../../config";
import { cardProps } from "../UI/Card";
import { useLoading } from "../../context/LoadingContext";


export function useRefreshCard(){
    const [cards, setCards] = useState<cardProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { showLoading, hideLoading } = useLoading();

    const fetchCards = useCallback(()=>{
        setLoading(true);
        showLoading("Loading your content...");

        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Session expired. Please sign in again.");
            setLoading(false);
            hideLoading();
            return;
        }

        axios.get(`${BACKEND_URL}/user/content`, {
            headers:{
                Authorization: token,
            }
        })
        .then((response)=>{
            setCards(response.data.content.map((item: any) => ({
                ...item,
                tag: item.tags,
            })));
            setLoading(false);
        })
        .catch((error)=>{
            setLoading(false);
            
            if (error.response?.status === 404) {
                toast.error("User not found. Please sign in again.");
                localStorage.removeItem("token");
            } else if (error.response?.status === 403) {
                toast.error("Access denied. Please sign in again.");
                localStorage.removeItem("token");
            } else if (error.response?.status === 500) {
                toast.error("Server error. Please try refreshing the page.");
            } else if (error.code === 'ECONNABORTED') {
                toast.error("Request timeout. Please check your connection.");
            } else if (error.code === 'ERR_NETWORK') {
                toast.error("Network error. Please check your internet connection.");
            } else {
                toast.error("Failed to load content. Please try again.");
            }
        })
        .finally(() => {
            hideLoading();
        });
    }, [showLoading, hideLoading]);

    useEffect(() => {
        fetchCards();
    }, [fetchCards]);   

    const deleteCard = (id:string) =>{
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Session expired. Please sign in again.");
            return;
        }

        axios.delete(`${BACKEND_URL}/user/content/${id}`,{
            headers:{
                Authorization: token,
            }
        })
        .then(() => {
            setCards(prev => prev.filter(card => card._id !== id));
            toast.success("Content deleted successfully!");
        })
        .catch((error)=>{
            if (error.response?.status === 404) {
                toast.warning("Content not found. It may have been already deleted.");
                setCards(prev => prev.filter(card => card._id !== id));
            } else if (error.response?.status === 403) {
                toast.error("Access denied. You cannot delete this content.");
            } else if (error.response?.status === 500) {
                toast.error("Server error. Please try again later.");
            } else if (error.code === 'ECONNABORTED') {
                toast.error("Request timeout. Please try again.");
            } else if (error.code === 'ERR_NETWORK') {
                toast.error("Network error. Please check your internet connection.");
            } else {
                toast.error("Failed to delete content. Please try again.");
            }
        })
    };

    return { cards, loading, fetchCards, deleteCard };  
}