import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { cardProps } from "../UI/Card";


export function useRefreshCard(){
    const [cards, setCards] = useState<cardProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchCards = useCallback(()=>{
        setLoading(true);

        axios.get(`${BACKEND_URL}/user/content`, {
            headers:{
                Authorization: localStorage.getItem("token"),
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
            console.error("Error fetching cards:", error);
            setLoading(false);
        });
    }, []);

    useEffect(()=>{
        fetchCards();
    }, [fetchCards]);   

    const deleteCard = (id:string) =>{
        axios.delete(`${BACKEND_URL}/user/content/${id}`,{
            headers:{
                Authorization: localStorage.getItem("token"),
            }
        })
        .then(() => setCards(prev => prev.filter(card => card._id !== id)))
        .catch((error)=>{
            console.error("Error deleting card:", error);
        })
    };

    return { cards, loading, fetchCards, deleteCard };  
}