import { createContext, useContext, useState, useCallback, useMemo, ReactNode } from 'react';
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

  const showLoading = useCallback((message?: string) => {
    if (message) setLoadingMessage(message);
    setIsLoading(true);
  }, []); 

  const hideLoading = useCallback(() => {
    setIsLoading(false);
  }, []); 

  const setLoadingMessageMemo = useCallback((message: string) => {
    setLoadingMessage(message);
  }, []);

  const contextValue = useMemo(() => ({
    isLoading,
    showLoading,
    hideLoading,
    setLoadingMessage: setLoadingMessageMemo
  }), [isLoading, showLoading, hideLoading, setLoadingMessageMemo]);

  return (
    <LoadingContext.Provider value={contextValue}>
      {children}
      {isLoading && <Loading message={loadingMessage} />}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};
