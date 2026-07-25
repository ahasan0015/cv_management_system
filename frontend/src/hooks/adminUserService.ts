import api from '../config/axios';

export const adminUserService = {
    // user list fetch with (pagination)
    getAll: (page: number = 1) => api.get('/users', { params: { page } }),
    
    // dynamic role fetch
    getRoles: () => api.get('roles'),
    
    // user role update
    updateRole: (userId: number, roleId: number) => api.patch(`users/${userId}/role`, { role_id: roleId }),
    
    //user status change(Active / Blocked)
    updateStatus: (userId: number, status: string) => api.patch(`/users/${userId}/status`, { status }),
    
    //user destroy
    delete: (userId: number) => api.delete(`/users/${userId}`),
};