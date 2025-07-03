import { useRef } from "react";
import { Button } from "../components/UI/Buttton";
import { Input } from "../components/UI/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";


export function Signin(){

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    
    async function signinHandler(){
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;   

        await axios.post(`${BACKEND_URL}/auth/signin`, {
            email,
            password
        })
        .then((response)=>{
            console.log("Signin successful", response);
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