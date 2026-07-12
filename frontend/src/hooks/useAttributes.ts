import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
import api from '../config/axios';
import type { Attribute } from '../types/attribute';


export const useAttributes = () => {
  return useQuery<Attribute[]>({ // Tpye define
    queryKey: ['attributes'],
    queryFn: async () => {
      const { data } = await api.get('/attributes');
      return data.data; 
    },
  });
};