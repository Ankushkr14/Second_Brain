import { createContext, useContext, useState, ReactNode } from 'react';
import { Loading } from '../components/Loading';

interface LoadingContextType {
  isLoading: boolean;
  showLoading: (message?: string) => void;
  hideLoading: () => void;
  setLoadingMessage: (message: string) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Loading your brain...');

  const showLoading = (message?: string) => {
    if (message) setLoadingMessage(message);
    setIsLoading(true);
  };

  const hideLoading = () => {
    setIsLoading(false);
  };

  return (
    <LoadingContext.Provider value={{ 
      isLoading, 
      showLoading, 
      hideLoading, 
      setLoadingMessage 
    }}>
      {children}
      {isLoading && <Loading message={loadingMessage} />}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within LoadingProvider');
  }
  return context;
};
