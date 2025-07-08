
import { useRef } from "react";
import { Button } from "../components/UI/Buttton";
import { Input } from "../components/UI/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";



export function Signup(){
    const firstnameRef = useRef<HTMLInputElement>(null);
    const lastnameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);    
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    

    async function signupHandler(){
        const firstname = firstnameRef.current?.value;
        const lastname = lastnameRef.current?.value;
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        const confirmPassword = confirmPasswordRef.current?.value;

        await axios.post(`${BACKEND_URL}/auth/signup`,{
            firstname,
            lastname,
            email,
            password,
            confirmPassword
        })
        .then((resopnse)=>{
            const token = resopnse.data.token;
            localStorage.setItem("token",`Bearer ${token}`);
            navigate("/dashboard");
        })
        .catch((error)=>{
            console.error("signup error", error);
        })
    }

    return <div className="flex justify-center items-center h-screen w-screen bg-gray-300">
        <div className="bg-white p-2 border rounded min-w-48">
            <Input ref={firstnameRef} placeholder="First Name"/>
            <Input ref={lastnameRef} placeholder="Last Name"/>
            <Input ref={emailRef} placeholder="Email"/>
            <Input ref={passwordRef} placeholder="Password" type="password"/>
            <Input ref={confirmPasswordRef} placeholder="Confirm Password" type='password'/>
            <div className="flex justify-center pt-4">
                 <Button loading={false} variant="primary" text="Signup" fullwidth ={true} size="md" onClick={signupHandler}/>
            </div>
        </div>
    </div>
}