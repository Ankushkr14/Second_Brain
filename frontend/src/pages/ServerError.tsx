import { BrainIcon } from "../components/icons/brainIcon";

interface ServerErrorProps {
  onRetry: () => void;
  isRetrying: boolean;
}

export const ServerError = ({ onRetry, isRetrying }: ServerErrorProps) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="flex items-center gap-3 mb-8">
        <BrainIcon />
        <h1 className="text-2xl font-bold text-gray-800">Second Brain</h1>
      </div>

      <div className="text-center mb-8 max-w-md">
        <div className="w-24 h-24 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
          <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Server Unavailable
        </h2>
        
        <div className="space-y-3 text-sm text-gray-500">
          <p>• Check your internet connection</p>
          <p>• Try refreshing in a few minutes</p>
        </div>
      </div>

      <div className="flex gap-4">
        <button 
          onClick={onRetry}
          disabled={isRetrying}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50"
        >
          {isRetrying ? 'Checking...' : 'Try Again'}
        </button>
        
        <button 
          onClick={() => window.location.reload()}
          className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors duration-200"
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
};