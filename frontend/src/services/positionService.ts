import api from '../config/axios';
import type { Position } from '../types/position';



export const positionService = {
    getAll: (page: number = 1) => api.get('/positions', { params: { page } }),
    
    create: (data: Partial<Position>) => api.post('/positions', data),
    
    update: (id: number, data: Partial<Position>) => api.put(`/positions/${id}`, data),
    
    delete: (id: number) => api.delete(`/positions/${id}`),
    
    // position duplicate
    duplicate: (id: number) => api.post(`/positions/${id}/duplicate`)
};