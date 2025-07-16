
import { useRef, useState } from "react";
import { Button } from "../components/UI/Buttton";
import { Input } from "../components/UI/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BrainIcon } from "../components/icons/brainIcon";
import { useLoading } from "../context/LoadingContext";



export function Signup(){
    const firstnameRef = useRef<HTMLInputElement>(null);
    const lastnameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);    
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState("");
    const { showLoading, hideLoading, isLoading } = useLoading();
    const navigate = useNavigate();
    

    async function signupHandler(){
        showLoading("Creating your account...");
        setError("");
        
        const firstname = firstnameRef.current?.value;
        const lastname = lastnameRef.current?.value;
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        const confirmPassword = confirmPasswordRef.current?.value;

        if (!firstname || !lastname || !email || !password || !confirmPassword) {
            setError("Please fill in all fields");
            hideLoading();
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            hideLoading();
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters long");
            hideLoading();
            return;
        }

        try {
            const response = await axios.post(`${BACKEND_URL}/auth/signup`, {
                firstname,
                lastname,
                email,
                password,
                confirmPassword
            });
            
            const token = response.data.token;
            localStorage.setItem("token", `Bearer ${token}`);
            navigate("/dashboard");
        } catch (error: any) {
            console.error("signup error", error);
            setError(error.response?.data?.message || "Sign up failed. Please try again.");
        } finally {
            hideLoading();
        }
    }

    return (
        <div style={{ backgroundColor: '#030c1c' }} className="flex justify-center items-center min-h-screen w-screen">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative z-10 w-full max-w-md mx-4">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className=" text-white flex justify-center items-center gap-3 mb-4">
                        <BrainIcon />
                        <h1 className="text-3xl font-bold text-white">Second Brain</h1>
                    </div>
                    <p className="text-gray-400">Create your account to get started</p>
                </div>

                {/* Sign up form */}
                <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 shadow-2xl">
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                                <Input ref={firstnameRef} placeholder="John" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                                <Input ref={lastnameRef} placeholder="Doe" />
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                            <Input ref={emailRef} placeholder="Enter your email" />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                            <Input ref={passwordRef} placeholder="Create a password" type="password" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
                            <Input ref={confirmPasswordRef} placeholder="Confirm your password" type="password" />
                        </div>

                        {error && (
                            <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        <Button 
                            loading={isLoading} 
                            variant="primary" 
                            text={isLoading ? "Creating Account..." : "Create Account"} 
                            size="md" 
                            onClick={() => { signupHandler(); }}
                            fullwidth={true}
                        />
                    </div>

                    {/* Footer */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-400 text-sm">
                            Already have an account?{' '}
                            <button 
                                onClick={() => navigate('/signin')}
                                className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                            >
                                Sign in
                            </button>
                        </p>
                    </div>
                </div>

                {/* Back to home */}
                <div className="text-center mt-6">
                    <button 
                        onClick={() => navigate('/')}
                        className="text-gray-400 hover:text-white text-sm transition-colors"
                    >
                        ← Back to home
                    </button>
                </div>
            </div>
        </div>
    )
}