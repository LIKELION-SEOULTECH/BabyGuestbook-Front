import { client } from "./client";
import type { ApiResponse } from "@/types/common";

// ♡ 좋아요 등록
export const likePost = async (postId: number): Promise<ApiResponse<null>> => {
    const response = await client.post<ApiResponse<null>>(`/posts/${postId}/like`);
    return response.data;
};

// ♡ 좋아요 취소
export const unlikePost = async (postId: number): Promise<ApiResponse<null>> => {
    const response = await client.delete<ApiResponse<null>>(`/posts/${postId}/like`);
    return response.data;
};
