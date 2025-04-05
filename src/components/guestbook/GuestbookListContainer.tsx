import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useInView } from "react-intersection-observer";
import GuestbookList from "./GuestbookList";
import GuestbookTopbar from "./GuestbookTopbar";
import CommentModal from "./comment/CommentModal";
import { LoadingSpinner } from "../ui/loading-spinner";
import { CreatePostRequest, Emotion, Order } from "@/types/post";
import { TempPost } from "@/types/tempPost";
import {
    useUpdatePostMutation,
    useDeletePostMutation,
    useCreatePostMutation,
    usePostsInfiniteQuery,
} from "@/queries/postQueries";

export interface GuestbookListContainerProps {
    currentOrder: Order;
    currentEmotion: Emotion | undefined;
    onCommentClick?: (postId: number) => void;
    onPlaylistClick?: (
        emotion: keyof typeof import("@/constants/emotion").emotionConfigs
    ) => void;
}

/**
 * GuestbookListContainer
 * API Call, state 관리 등 비즈니스 로직을 담당합니다.
 */
function GuestbookListContainer({
    currentOrder,
    currentEmotion,
    onPlaylistClick,
}: GuestbookListContainerProps) {
    const {
        data,
        isLoading,
        isError,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = usePostsInfiniteQuery({
        order: currentOrder,
        emotion: currentEmotion,
        pageSize: 5, // 페이지당 5개의 포스트
    });

    const { ref, inView } = useInView({
        threshold: 0.5,
        triggerOnce: false,
        rootMargin: isFetchingNextPage ? "-100% 0px" : "0px",
    });

    useEffect(() => {
        if (inView && hasNextPage && !isLoading && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isLoading, isFetchingNextPage, fetchNextPage]);

    const createMutation = useCreatePostMutation();
    const updateMutation = useUpdatePostMutation();
    const deleteMutation = useDeletePostMutation();

    const handleEdit = useCallback(
        async (postId: number, content: string, password: string) => {
            updateMutation.mutate(
                { postId, content, password },
                {
                    onSuccess: () =>
                        toast.success("성공적으로 수정되었습니다."),
                    onError: () => toast.error("비밀번호가 일치하지 않습니다."),
                }
            );
        },
        [updateMutation]
    );

    const handleDelete = useCallback(
        async (postId: number, password: string) => {
            deleteMutation.mutate(
                { postId, password },
                {
                    onSuccess: () => toast.success("방명록이 삭제되었습니다."),
                    onError: () => toast.error("비밀번호가 일치하지 않습니다."),
                }
            );
        },
        [deleteMutation]
    );

    const handleAddPost = ({
        content,
        username,
        password,
    }: CreatePostRequest) => {
        createMutation.mutate(
            { content, username, password },
            {
                onSuccess: () => toast.success("방명록이 작성되었습니다."),
                onError: () => toast.error("작성에 실패했습니다."),
            }
        );
    };

    // 댓글 modal focus 대상입니다.
    const [activePostId, setActivePostId] = useState<number | null>(null);

    const allPosts = data?.pages.flatMap((page) => page.data) || [];

    return (
        <>
            <GuestbookTopbar onPostSubmit={handleAddPost} />

            {isLoading && !data ? (
                <div className="flex flex-col justify-center items-center h-40 gap-4">
                    <LoadingSpinner className="text-secondary" />
                    <span className="text-sm text-secondary">
                        방명록을 불러오는 중입니다...
                    </span>
                </div>
            ) : (
                <>
                    <GuestbookList
                        items={allPosts}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onCommentClick={(postId) => setActivePostId(postId)}
                        onPlaylistClick={onPlaylistClick ?? (() => { })}
                    />
                    <div
                        ref={ref}
                        className="h-20 flex justify-center items-center"
                    >
                        {isFetchingNextPage ? (
                            <LoadingSpinner className="text-secondary" />
                        ) : !hasNextPage && allPosts.length > 0 ? (
                            <span className="text-sm text-secondary">
                                더 이상 불러올 방명록이 없습니다.
                            </span>
                        ) : null}
                    </div>
                </>
            )}

            <CommentModal
                postId={activePostId ?? 0}
                open={activePostId !== null}
                onClose={() => setActivePostId(null)}
            />
        </>
    );
}

export default GuestbookListContainer;
