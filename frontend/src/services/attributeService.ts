import api from '../config/axios';
import type { Attribute } from '../types/attribute';



export const attributeService = {
    getAll: () => api.get('/attributes'),
    
    // Add New
    create: (data: Omit<Attribute, 'id'>) => api.post('/attributes', data),
    
    // Update
    update: (id: number, data: Attribute) => api.put(`/attributes/${id}`, data),
    
    // Delete
    delete: (id: number) => api.delete(`/attributes/${id}`)
};