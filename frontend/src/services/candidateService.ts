import api from '../config/axios';
import type { ProfileApiResponse, ProfileState } from '../types/candidate';

export const candidateService = {
    // Profile Management
    getProfile: () => api.get<ProfileApiResponse>('/candidate/profile'),
    
    updateProfile: (data: Partial<ProfileState>) => api.put('/candidate/profile', data),

    // Projects Management
    getProjects: () => api.get('/projects'),
    
    createProject: (data: {
        name: string;
        date_start: string | null;
        date_end: string | null;
        markdown_description: string;
        tags: string[];
    }) => api.post('/projects', data),
    
    deleteProject: (id: number) => api.delete(`/projects/${id}`),
};