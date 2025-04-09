import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import { createComment, deleteComment, fetchComments } from "@/api/comment";
import type {
    CommentResponse,
    CreateCommentRequest,
    DeleteCommentRequest,
} from "@/types/comment";

export const useCommentsQuery = (postId: number) => {
    return useQuery<CommentResponse, Error>({
        queryKey: ["comments", postId],
        queryFn: () => fetchComments(postId),
        enabled: !!postId,
    });
};

export const useCreateCommentMutation = (postId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (params: CreateCommentRequest) => createComment(postId, params),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["comments", postId] });
        },
        onError: (error) => {
            console.error("Error creating comment", error);
        },
    });
};

export const useDeleteCommentMutation = (postId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (params: { commentId: number } & DeleteCommentRequest) =>
            deleteComment(postId, params.commentId, {
                password: params.password,
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["comments", postId] });
        },
        onError: (error) => {
            console.error("Error deleting comment", error);
        },
    });
};
