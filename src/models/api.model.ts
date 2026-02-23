type ApiResponse = {
    success: boolean;
    message: string;
}

export interface SuccessApiResponse<T> extends ApiResponse {
    data: T
}

export interface ErrorApiResponse extends ApiResponse {
    error: {
        type: string;
        status: number;
    }
}