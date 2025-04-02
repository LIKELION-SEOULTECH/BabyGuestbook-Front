import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import GuestbookList from "./GuestbookList";
import { PostDTO } from "@/types/post";
import {
    useUpdatePostMutation,
    useDeletePostMutation,
} from "@/queries/postQueries";

export interface GuestbookListContainerProps {
    initialItems: PostDTO[];
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
    initialItems,
    onCommentClick,
    onPlaylistClick,
}: GuestbookListContainerProps) {
    const [guestbooks, setGuestbooks] = useState<PostDTO[]>(initialItems);

    const updateMutation = useUpdatePostMutation();
    const deleteMutation = useDeletePostMutation();

    useEffect(() => {
        setGuestbooks(initialItems);
    }, [initialItems]);

    const handleEdit = useCallback(
        async (postId: number, content: string, password: string) => {
            updateMutation.mutate(
                { postId, content, password },
                {
                    onSuccess: () => {
                        setGuestbooks((prev) =>
                            prev.map((item) =>
                                item.postId === postId
                                    ? { ...item, content }
                                    : item
                            )
                        );
                        toast.success("성공적으로 수정되었습니다.");
                    },
                    onError: () => {
                        toast.error("비밀번호가 일치하지 않습니다.");
                    },
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
                    onSuccess: () => {
                        setGuestbooks((prev) =>
                            prev.filter((item) => item.postId !== postId)
                        );
                        toast.success("방명록이 삭제되었습니다.");
                    },
                    onError: () => {
                        toast.error("비밀번호가 일치하지 않습니다.");
                    },
                }
            );
        },
        [deleteMutation]
    );

    return (
        <GuestbookList
            items={guestbooks}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onCommentClick={onCommentClick ?? (() => {})}
            onPlaylistClick={onPlaylistClick ?? (() => {})}
        />
    );
}

export default GuestbookListContainer;
