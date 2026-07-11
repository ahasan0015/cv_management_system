import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
import api from '../config/axios';

//interface Attribute
export interface Attribute {
  id: number;
  name: string;
  version: number;
  category: string;
  type: string;
}

export const useAttributes = () => {
  return useQuery<Attribute[]>({ // Tpye define
    queryKey: ['attributes'],
    queryFn: async () => {
      const { data } = await api.get('/attributes');
      return data.data; 
    },
  });
};