import { client } from "./client";

import type {
    PostResponse,
    CreatePostRequest,
    UpdatePostRequest,
    DeletePostRequest,
    ReadPostParameter,
    PostDTO,
} from "@/types/post";

interface ApiResponse<T> {
    code: string;
    statusCode: number;
    message: string;
    data: T;
}

// ● GET: 방명록 목록 조회 (초기 로딩)
export const fetchPosts = async (
    params: Omit<ReadPostParameter, "lastPostId">
): Promise<PostResponse> => {
    const response = await client.get<PostResponse>("/api/v1/posts", {
        params,
    });
    return response.data;
};

// ● GET: 무한 스크롤 요청
export const fetchInfinitePosts = async (
    params: ReadPostParameter
): Promise<PostResponse> => {
    const response = await client.get<PostResponse>("/api/v1/posts", {
        params,
    });
    return response.data;
};

// ● POST: 방명록 작성
export const createPost = async (
    body: CreatePostRequest
): Promise<ApiResponse<PostDTO>> => {
    const response = await client.post<ApiResponse<PostDTO>>(
        "/api/v1/posts/post",
        body
    );
    return response.data;
};

// ● PATCH: 방명록 수정
export const updatePost = async (
    postId: number,
    body: UpdatePostRequest
): Promise<ApiResponse<PostDTO>> => {
    const response = await client.patch<ApiResponse<PostDTO>>(
        `/api/v1/posts/${postId}`,
        body
    );
    return response.data;
};

// ● DELETE: 방명록 삭제
export const deletePost = async (
    postId: number,
    body: DeletePostRequest
): Promise<ApiResponse<null>> => {
    const response = await client.delete<ApiResponse<null>>(
        `/api/v1/posts/${postId}`,
        {
            params: {
                password: body.password,
            },
        }
    );
    return response.data;
};
