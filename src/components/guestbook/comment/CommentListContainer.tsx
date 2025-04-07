import { useCallback } from "react";
import { toast } from "sonner";
import CommentList from "./CommentList";
import { useCreateCommentMutation, useDeleteCommentMutation, useCommentsQuery } from "@/queries/commentQuries";
import type { CommentDTO } from "@/types/comment";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export interface CommentListContainerProps {
    postId: number;
}

function CommentListContainer({ postId }: CommentListContainerProps) {
    const { data, isLoading, isError } = useCommentsQuery(postId);
    const createCommentMutation = useCreateCommentMutation(postId);
    const deleteCommentMutation = useDeleteCommentMutation(postId);

    const handleCreateComment = useCallback(
        (content: string, username: string, password: string) => {
            createCommentMutation.mutate(
                { content, password },
                {
                    onSuccess: () => {
                        toast.success("댓글이 성공적으로 작성되었습니다.");
                    },
                    onError: () => {
                        toast.error("댓글 작성에 실패했습니다.");
                    },
                }
            );
        },
        [postId, createCommentMutation]
    );

    const handleDeleteComment = useCallback(
        (commentId: number, password: string) => {
            deleteCommentMutation.mutate(
                { commentId, password },
                {
                    onSuccess: () => {
                        toast.success("댓글이 삭제되었습니다.");
                    },
                    onError: () => {
                        toast.error("비밀번호가 일치하지 않습니다.");
                    },
                }
            );
        },
        [deleteCommentMutation]
    );

    const comments: CommentDTO[] = data?.data ?? [];

    return (

        <>
            {
                isLoading ? (
                    <div className="flex flex-col justify-center items-center h-40 gap-4" >
                        <LoadingSpinner className="text-secondary" />
                        <span className="text-sm text-secondary">
                            댓글을 불러오는 중입니다...
                        </span>
                    </div>
                ) :
                    (<CommentList
                        comments={comments}
                        // onCreate={handleCreateComment} // TODO
                        onDelete={handleDeleteComment}
                    />)
            }</>
    );
}

export default CommentListContainer;
