export interface CommentDTO {
    commentId: number;
    content: string;
    username: string;
    updatedAt: string;
}

export interface CommentResponse {
    code: string;
    statusCode: number;
    message: string;
    data: CommentDTO[];
}

export interface CreateCommentRequest {
    content: string;
    password: string;
}

export interface DeleteCommentRequest {
    password: string;
}

