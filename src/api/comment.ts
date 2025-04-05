import { client } from "./client";
import type {
    CommentResponse,
    CreateCommentRequest,
    DeleteCommentRequest,
} from "@/types/comment";

// ● GET: 댓글 조회
export const fetchComments = async (
    postId: number
): Promise<CommentResponse> => {
    const response = await client.get<CommentResponse>(`/posts/${postId}/comments`);
    return response.data;
};

// ● POST: 댓글 생성
export const createComment = async (
    postId: number,
    body: CreateCommentRequest
) => {
    const response = await client.post(`/posts/${postId}/comments`, body);
    return response.data;
};

// ● DELETE: 댓글 삭제
export const deleteComment = async (
    postId: number,
    commentId: number,
    body: DeleteCommentRequest
) => {
    const response = await client.delete(`/posts/${postId}/comments/${commentId}`, {
        params: {
            password: body.password,
        },
    });
    return response.data;
};

