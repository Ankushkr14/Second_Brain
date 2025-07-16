
import { BrainIcon } from "./icons/brainIcon";

interface LoadingProps {
  message?: string;
}

export const Loading = ({ message = "Loading your brain..." }: LoadingProps) => {
  return (
    <div className="fixed inset-0 bg-gray-900/90 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="flex flex-col items-center">
        <div className="animate-pulse mb-4">
          <BrainIcon />
        </div>
        
        <h2 className="text-white text-xl font-bold mb-4">Second Brain</h2>

        <div className="w-48 h-2 bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 rounded-full animate-pulse"></div>
        </div>
        
        <p className="text-gray-300 mt-4">{message}</p>
      </div>
    </div>
  );
};