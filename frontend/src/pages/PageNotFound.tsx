import { useNavigate } from "react-router-dom";
import { BrainIcon } from "../components/icons/brainIcon";

export const PageNotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
            <div className="flex items-center gap-3 mb-8">
                <BrainIcon />
                <h1 className="text-2xl font-bold text-gray-800">Second Brain</h1>
            </div>

            <h2 className="text-8xl font-bold text-gray-300 mb-4">404</h2>

            <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                    Page Not Found
                </h3>
                <p className="text-gray-600 max-w-md">
                    The page you're looking for doesn't exist or has been moved.
                </p>
            </div>
            <div>
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                    onClick={() => navigate(-1)}>
                    ← Go Back
                </button>
            </div>
        </div>
    )
}