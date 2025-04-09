import type { BaseEmotion } from "@/constants/emotion";

export type Order = "LATEST" | "COMMENT";

export interface ReadPostParameter {
    order: Order;
    emotion?: BaseEmotion;
    pageSize: number;
    lastPostId?: number;
}

export interface CreatePostRequest {
    content: string;
    password: string;
}

export interface UpdatePostRequest {
    content: string;
    password: string;
}

export interface DeletePostRequest {
    password: string;
}

export interface PostDTO {
    postId: number;
    content: string;
    emotion: BaseEmotion;
    username: string;
    updatedAt: string; // ISO 8601 maybe
    isLike: boolean;
    likeCnt: number;
    commentCnt: number;
}

export interface PostResponse {
    code: string;
    statusCode: number;
    message: string;
    data: PostDTO[];
}
