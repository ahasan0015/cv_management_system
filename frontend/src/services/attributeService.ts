import api from '../config/axios';
import type { Attribute, AttributeFilters } from '../types/attribute';



export const attributeService = {
    // getAll: () => api.get('/attributes'),
    getAll: (filters?: AttributeFilters) => api.get('/attributes', { params: filters }),
    
    // Add New
    create: (data: Omit<Attribute, 'id'>) => api.post('/attributes', data),
    
    // Update
    update: (id: number, data: Omit<Attribute, 'id'>) => api.put(`/attributes/${id}`, data),
    
    // Delete
    delete: (id: number) => api.delete(`/attributes/${id}`)
};