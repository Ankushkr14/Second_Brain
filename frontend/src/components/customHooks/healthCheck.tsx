import { useState, useEffect } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../config';
import { toast } from 'react-toastify';

export const useHealthCheck = () => {
  const [isServerHealthy, setIsServerHealthy] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  const checkHealth = async () => {
    try {
      await axios.get(`${BACKEND_URL}/health`, { timeout: 5000 });
      setIsServerHealthy(true);
    } catch (error) {
      setIsServerHealthy(false);
      toast.error('Server is down. Please try again later.');
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