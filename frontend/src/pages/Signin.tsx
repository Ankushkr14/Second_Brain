import { useRef } from "react";
import { Button } from "../components/UI/Buttton";
import { Input } from "../components/UI/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export function Signin(){

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    
    async function signinHandler(){
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;   

        await axios.post(`${BACKEND_URL}/auth/signin`, {
            email,
            password
        })
        .then((response)=>{
            const token = response.data.token;
            localStorage.setItem("token",`Bearer ${token}`);
            navigate("/dashboard");
        })
        .catch((error)=>{
            console.error("signin error",error);
        })
    }

    return (
        <div className="flex justify-center items-center h-screen w-screen bg-gray-300">
            <div className="bg-white p-2 border rounded min-w-48">
                <Input ref={emailRef} placeholder="Email"/>
                <Input ref={passwordRef} placeholder="Password" type="password"/>
                <Button loading={false} variant="primary" text="Signin" size="md" onClick={signinHandler}/>
            </div>
        </div>
    )
}