export interface ApiResponse<T> {
    code: string;
    statusCode: number;
    message: string;
    data: T;
}
