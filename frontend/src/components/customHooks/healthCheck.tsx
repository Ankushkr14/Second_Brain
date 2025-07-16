import { useState, useEffect } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../config';

export const useHealthCheck = () => {
  const [isServerHealthy, setIsServerHealthy] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  const checkHealth = async () => {
    try {
      await axios.get(`${BACKEND_URL}/health`, { timeout: 5000 });
      setIsServerHealthy(true);
    } catch (error) {
      console.error('Server Error', error);
      setIsServerHealthy(false);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    checkHealth();
  }, []);

  return { 
    isServerHealthy, 
    isChecking, 
    recheckHealth: checkHealth 
  };
};