import { useNavigate } from "react-router-dom"

export const SecondHeroSection = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full py-24  flex flex-col items-center justify-center">
            <div className="max-w-2xl mx-auto text-center px-4">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-white to-purple-300 bg-clip-text text-transparent leading-tight">
                    Store All Your Ideas,<br/>
                    Access Them Anytime, Anywhere
                </h1>
                <p className="text-md md:text-lg mb-8 text-gray-300">
                    Organize your thoughts, links and resources in with a second brain that helps you stay productive and creative.
                </p>
                <button 
                    className="bg-purple-800 text-xl text-white px-7 py-3 rounded-lg font-semibold hover:bg-purple-900 transition-colors w-full md:w-auto"
                    onClick={() => navigate('/dashboard')}
                >
                    Get Started
                </button>

            </div>

        </div>
    )
}