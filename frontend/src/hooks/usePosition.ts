import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { positionService } from '../services/positionService'; 
import type { Position } from '../types/position';

// get data with pagination
export const usePositions = (page: number = 1) => {
    return useQuery({
        queryKey: ['positions', page],
        queryFn: async () => {
            const response = await positionService.getAll(page); //positionService.getAll(page)
            return response.data;
        },
    });
};

// create position hook
export const useCreatePosition = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: Partial<Position>) => positionService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['positions'] });
        },
    });
};

// position update mutation hook
export const useUpdatePosition = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: Partial<Position> }) => 
            positionService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['positions'] });
        },
    });
};

// position duplicate hook
export const useDuplicatePosition = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => positionService.duplicate(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['positions'] });
        },
    });
};

// position delete hook
export const useDeletePosition = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => positionService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['positions'] });
        },
    });
};