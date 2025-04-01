export interface CommentDTO {
    commentId: number;
    content: string;
    user: {
        userId: number;
        username: string;
    };
    updatedAt: string;
}

export interface CommentResponse {
    code: string;
    statusCode: number;
    message: string;
    data: CommentDTO[];
}
