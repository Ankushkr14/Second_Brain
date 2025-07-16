import { useState, useEffect } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../config';
import { toast } from 'react-toastify';

export const useHealthCheck = () => {
  const [isServerHealthy, setIsServerHealthy] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  const checkHealth = async () => {
    try {
      console.log('Checking health at:', `${BACKEND_URL}/health`);
      const response = await axios.get(`${BACKEND_URL}/health`, { 
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Health check response:', response.data);
      setIsServerHealthy(true);
    } catch (error) {
      console.error('Health check failed:', error);
      if (axios.isAxiosError(error)) {
        console.error('Axios error details:', {
          message: error.message,
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data
        });
      }
      setIsServerHealthy(false);
      toast.error(`Server connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
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