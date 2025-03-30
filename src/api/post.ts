import { client } from "./client";
import { emotionConfigs } from "@/constants/emotion";

export interface FetchPostResponse {
    code: string;
    statusCode: number;
    message: string;
    data: PostDTO[];
}

export interface PostDTO {
    postId: number;
    content: string;
    emotion: keyof typeof emotionConfigs;
    user: {
        userId: number;
        username: string;
    };
    updatedAt: string;
    likeCnt: number;
    commentCnt: number;
}

export const fetchPosts = async (params: {
    order: "LATEST" | "OLDEST";
    emotion?: string;
    pageSize: number;
    lastPostId?: number;
}): Promise<FetchPostResponse> => {
    const response = await client.get<FetchPostResponse>("posts", {
        params: {
            order: params.order,
            emotion: params.emotion,
            pageSize: params.pageSize,
            lastPostId: params.lastPostId, // 두번째 요청부타, 무한 스크롤을 위해
        },
    });
    return response.data;
};
export const createPost = async (body: {
    content: string;
    username: string;
    password: string;
}) => {
    const response = await client.post("/api/posts/post", {
        data: {
            content: body.content,
            username: body.username,
            password: body.password,
        },
    });
    return response.data;
};
export const updatePost = async (
    postId: number,
    body: {
        content: string;
        password: string;
    }
) => {
    const response = await client.patch(`/api/posts/${postId}`, {
        data: {
            content: body.content,
            password: body.password,
        },
    });
    return response.data;
};
export const deletePost = async (
    postId: number,
    body: { password: string }
) => {
    const response = await client.delete(`/api/posts/${postId}`, {
        params: {
            password: body.password,
        },
    });
    return response.data;
};
