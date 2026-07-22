export interface AttributeOption {
    id: number;
    name: string;
}

export interface ApiErrorResponse {
    response?: {
        data?: {
            message?: string;
        };
    };
}