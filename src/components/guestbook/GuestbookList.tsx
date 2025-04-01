import { memo } from "react";
import GuestbookItem from "./GuestbookItem";
import { PostDTO } from "@/types/post";

export interface GuestbookListProps {
    items: PostDTO[];
    onEdit: (postId: number, content: string, password: string) => void;
    onDelete: (postId: number, password: string) => void;
    onCommentClick: (postId: number) => void;
    onPlaylistClick: (
        emotion: keyof typeof import("@/constants/emotion").emotionConfigs
    ) => void;
}

/**
 * 방명록 리스트 뷰 입니다.
 *
 * @param items - PostDTO[]
 * @param onEdit - 방명록 수정 시 호출되는 콜백
 * @param onDelete - 방명록 삭제 시 호출되는 콜백
 * @param onCommentClick - 댓글 버튼 클릭 시 호출되는 콜백
 * @param onPlaylistClick - 플레이리스트 버튼 클릭 시 호출되는 콜백
 */
function GuestbookList({
    items,
    onEdit,
    onDelete,
    onCommentClick,
    onPlaylistClick,
}: GuestbookListProps) {
    if (items.length === 0) {
        return (
            <div className="py-8 text-center text-muted-foreground">
                아직 작성된 방명록이 없습니다.
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-12">
            {items.map((item) => (
                <GuestbookItem
                    key={item.postId}
                    {...item}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onCommentClick={() => onCommentClick(item.postId)}
                    onPlaylistClick={() => onPlaylistClick(item.emotion)}
                />
            ))}
        </div>
    );
}

export default memo(GuestbookList);
