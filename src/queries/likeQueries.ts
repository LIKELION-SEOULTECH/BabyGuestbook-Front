import { likePost, unlikePost } from "@/api/like";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// ♡ 좋아요 등록
export const useLikePostMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (postId: number) => likePost(postId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
        onError: (error) => {
            console.error("Error liking post:", error);
        },
    });
};

// ♡ 좋아요 취소
export const useUnlikePostMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (postId: number) => unlikePost(postId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
        onError: (error) => {
            console.error("Error unliking post:", error);
        },
    });
};

