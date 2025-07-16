import { useRef, useState } from "react";
import { Button } from "../components/UI/Buttton";
import { Input } from "../components/UI/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BrainIcon } from "../components/icons/brainIcon";
import { useLoading } from "../context/LoadingContext";


export function Signin(){

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState("");
    const { showLoading, hideLoading, isLoading } = useLoading();
    const navigate = useNavigate();
    
    async function signinHandler(){
        showLoading("Signing you in...");
        setError("");
        
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;   

        try {
            const response = await axios.post(`${BACKEND_URL}/auth/signin`, {
                email,
                password
            });
            
            const token = response.data.token;
            localStorage.setItem("token",`Bearer ${token}`);
            navigate("/dashboard");
        } catch (error: any) {
            console.error("signin error", error);
            setError(error.response?.data?.message || "Sign in failed. Please try again.");
        } finally {
            hideLoading();
        }
    }

    return (
        <div style={{ backgroundColor: '#030c1c' }} className="flex justify-center items-center min-h-screen w-screen relative">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative z-10 w-full max-w-md mx-4">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex justify-center items-center gap-3 mb-4">
                        <div className="p-2 bg-white/10 rounded-full backdrop-blur-sm">
                            <BrainIcon />
                        </div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            Second Brain
                        </h1>
                    </div>
                    <p className="text-gray-300 text-lg">Welcome back!</p>
                    <p className="text-gray-400">Sign in to your account</p>
                </div>

                {/* Sign in form */}
                <div className="bg-gray-900/40 backdrop-blur-xl p-8 rounded-2xl border border-gray-700/50 shadow-2xl">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-200 mb-3">Email</label>
                            <Input ref={emailRef} placeholder="Enter your email" />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-semibold text-gray-200 mb-3">Password</label>
                            <Input ref={passwordRef} placeholder="Enter your password" type="password" />
                        </div>

                        {error && (
                            <div className="bg-red-500/20 border border-red-400/50 text-red-200 p-4 rounded-xl text-sm font-medium">
                                {error}
                            </div>
                        )}

                        <div className="pt-2">
                            <Button 
                                loading={isLoading} 
                                variant="primary" 
                                text={isLoading ? "Signing in..." : "Sign In"} 
                                size="md" 
                                onClick={() => { signinHandler(); }}
                                fullwidth={true}
                            />
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <p className="text-gray-300 text-sm">
                            Don't have an account?{' '}
                            <button 
                                onClick={() => navigate('/signup')}
                                className="text-blue-400 hover:text-blue-300 font-semibold transition-colors underline decoration-blue-400/50 hover:decoration-blue-300/50"
                            >
                                Sign up
                            </button>
                        </p>
                    </div>
                </div>

                {/* Back to home */}
                <div className="text-center mt-8">
                    <button 
                        onClick={() => navigate('/')}
                        className="text-gray-400 hover:text-gray-200 text-sm transition-colors flex items-center justify-center gap-2 mx-auto"
                    >
                        <span>←</span> Back to home
                    </button>
                </div>
            </div>
        </div>
    )
}