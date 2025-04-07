import { emotionConfigs } from "@/constants/emotion";

export type Emotion =
    | "HAPPY"
    | "SAD"
    | "ANGRY"
    | "SURPRISED"
    | "FEAR"
    | "CALM"
    | "UNCOMFORTABLE"
    | "ALL";

export type Order = "LATEST" | "COMMENT";

export interface ReadPostParameter {
    order: Order;
    emotion?: Emotion;
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
    emotion: Emotion;
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
