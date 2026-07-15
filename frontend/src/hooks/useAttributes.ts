// src/hooks/useAttributes.ts
import { useQuery } from '@tanstack/react-query';
import { attributeService } from '../services/attributeService';
import type { AttributeFilters } from '../types/attribute';

// src/hooks/useAttributes.ts
// src/hooks/useAttributes.ts
export const useAttributes = (filters?: AttributeFilters) => {
  return useQuery({
    // JSON.stringify 
    queryKey: ['attributes', JSON.stringify(filters)], 
    queryFn: async () => {
      const response = await attributeService.getAll(filters);
      return response.data; // api response {data: [...]}
    },
    // cache data
    staleTime: 30000, 
  });
};