import { memo, useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import GuestbookItem, { GuestbookItemProps } from "./GuestbookItem";

export interface GuestbookData
    extends Omit<
        GuestbookItemProps,
        "onEdit" | "onDelete" | "onCommentClick" | "onPlaylistClick"
    > {}

export interface GuestbookListProps {
    items: GuestbookData[];
    onItemUpdated?: (updatedItems: GuestbookData[]) => void;
    onCommentClick?: (postId: number) => void;
    onPlaylistClick?: (postId: number, emotion: string) => void;
}

/**
 * 방명록 리스트 뷰 입니다.
 *
 * @param items - 방명록 아이템 배열
 * @param onItemUpdated - 아이템이 수정되거나 삭제된 후 호출되는 콜백
 * @param onCommentClick - 댓글 버튼 클릭 시 호출되는 콜백
 * @param onPlaylistClick - 플레이리스트 버튼 클릭 시 호출되는 콜백
 */
function GuestbookList({
    items,
    onItemUpdated,
    onCommentClick,
    onPlaylistClick,
}: GuestbookListProps) {
    const [guestbooks, setGuestbooks] = useState<GuestbookData[]>(items);

    // 컴포넌트가 새 아이템을 받으면 로컬 state 업데이트
    useEffect(() => {
        setGuestbooks(items);
    }, [items]);

    // 방명록 수정시
    const handleEdit = useCallback(
        async (postId: number, content: string, password: string) => {
            try {
                // API Call
                // MOCK
                const success = true;
                const message = "성공적으로 수정되었습니다.";

                if (success) {
                    const updatedGuestbooks = guestbooks.map((item) =>
                        item.postId === postId ? { ...item, content } : item
                    );

                    setGuestbooks(updatedGuestbooks);

                    // Callback to parent
                    onItemUpdated?.(updatedGuestbooks);

                    toast?.success(message);
                } else {
                    toast?.error("비밀번호가 일치하지 않습니다.");
                }
            } catch (error) {
                console.error("방명록 수정 중 오류:", error);
                toast?.error("방명록 수정 중 오류가 발생했습니다.");
            }
        },
        [guestbooks, onItemUpdated]
    );

    // 방명록 삭제시
    const handleDelete = useCallback(
        async (postId: number, password: string) => {
            try {
                // API Call
                // 임시로 성공 가정
                const success = true;

                if (success) {
                    const updatedGuestbooks = guestbooks.filter(
                        (item) => item.postId !== postId
                    );

                    setGuestbooks(updatedGuestbooks);

                    // Callback to parent
                    onItemUpdated?.(updatedGuestbooks);

                    toast?.success("방명록이 삭제되었습니다.");
                } else {
                    toast?.error("비밀번호가 일치하지 않습니다.");
                }
            } catch (error) {
                console.error("방명록 삭제 중 오류:", error);
                toast?.error("방명록 삭제 중 오류가 발생했습니다.");
            }
        },
        [guestbooks, onItemUpdated]
    );

    // 댓글 클릭시
    const handleCommentClick = useCallback(
        (postId: number) => {
            onCommentClick?.(postId);
        },
        [onCommentClick]
    );

    // 플리 클릭시
    const handlePlaylistClick = useCallback(
        (postId: number, emotion: string) => {
            onPlaylistClick?.(postId, emotion);
        },
        [onPlaylistClick]
    );

    // exception - 아이템이 없을 경우
    if (guestbooks.length === 0) {
        return (
            <div className="py-8 text-center text-muted-foreground">
                아직 작성된 방명록이 없습니다.
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-12">
            {guestbooks.map((item) => (
                <GuestbookItem
                    key={item.postId}
                    {...item}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onCommentClick={() => handleCommentClick(item.postId)}
                    onPlaylistClick={() =>
                        handlePlaylistClick(item.postId, item.emotion)
                    }
                />
            ))}
        </div>
    );
}

export default memo(GuestbookList);
