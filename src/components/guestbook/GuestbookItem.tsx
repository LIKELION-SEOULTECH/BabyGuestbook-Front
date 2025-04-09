import { memo, useMemo, useCallback } from "react";
import { MessageSquare, Play } from "lucide-react";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "../ui/context-menu";
import GuestbookActionDialog from "./GuestbookActionDialog";
import LikeButton from "./GuestbookLikeButton";

import useGuestbookAction from "@/hooks/guestbook/useGuestbookAction";
import { emotionConfigs } from "@/constants/emotion";
import { PostDTO } from "@/types/post";
import { formatRelativeDate } from "@/lib/formatRelativeDate";

export interface GuestbookItemProps extends PostDTO {
    onCommentClick?: () => void;
    onPlaylistClick?: () => void;
    onEdit?: (postId: number, content: string, password: string) => void;
    onDelete?: (postId: number, password: string) => void;
}

/**
 * 방명록 단일 아이템 뷰 입니다.
 *
 * @param postId - 방명록 ID
 * @param content - 방명록 내용
 * @param emotion - 방명록 감정
 * @param user - 방명록 작성자
 * @param updatedAt - 방명록 작성 시간
 * @param commentCnt - 방명록 댓글 수
 * @param onCommentClick - 댓글 버튼 클릭 시 호출되는 콜백
 * @param onPlaylistClick - 플레이리스트 버튼 클릭 시 호출되는 콜백
 * @param onEdit - 방명록 수정 시 호출되는 콜백
 * @param onDelete - 방명록 삭제 시 호출되는 콜백
 */
function GuestbookItem({
    postId,
    content,
    emotion,
    username,
    updatedAt,
    isLike,
    likeCnt,
    commentCnt,
    onCommentClick,
    onPlaylistClick,
    onEdit,
    onDelete,
}: GuestbookItemProps) {
    const emotionConfig = useMemo(() => emotionConfigs[emotion], [emotion]);
    const { activeAction, openActionDialog, closeActionDialog } =
        useGuestbookAction();

    const relativeUpdatedTime = useMemo(
        () => formatRelativeDate(updatedAt),
        [updatedAt]
    );

    // dialog handler - 수정 삭제 발생 시 trigger
    const handleActionSubmit = useCallback(
        (data: { content?: string; password: string }) => {
            if (activeAction === "edit" && onEdit && data.content) {
                onEdit(postId, data.content, data.password);
            } else if (activeAction === "delete" && onDelete) {
                onDelete(postId, data.password);
            }
            closeActionDialog();
        },
        [activeAction, onEdit, onDelete, postId, closeActionDialog]
    );

    return (
        <>
            <ContextMenu>
                <ContextMenuTrigger>
                    <div className="flex flex-col items-start gap-4">
                        {/* Top - 작성자 및 작성 시간 */}
                        <div className="flex items-center gap-2 text-secondary text-sm leading-none tracking-tight">
                            <span>{username}</span>
                            <span className="w-0.5 h-0.5 bg-secondary rounded-full" />
                            <span>{relativeUpdatedTime}</span>
                        </div>

                        {/* Body - 방명록 내용 */}
                        <p className="text-xl leading-normal tracking-tight">
                            {content}
                        </p>

                        {/* Bottom - 좋아요, 댓글 버튼 및 플레이리스트 버튼 */}


                        <div className="w-full flex items-center gap-4">

                            <LikeButton postId={postId} isLike={isLike} likeCnt={likeCnt} />

                            <button
                                onClick={onCommentClick}
                                className="flex items-center gap-1 text-secondary text-xs cursor-pointer transition-transform duration-150 ease-in-out hover:scale-103 active:scale-97"
                            >
                                <MessageSquare
                                    strokeWidth={1}
                                    size={16}
                                    className="rotate-y-180"
                                />
                                <span>{commentCnt}</span>
                            </button>

                            <button
                                onClick={onPlaylistClick}
                                className="flex items-center rounded-sm cursor-pointer transition-transform duration-150 ease-in-out hover:scale-103 active:scale-97"
                            >
                                <div className="flex items-center space-x-1">
                                    <span
                                        className="text-sm leading-none tracking-tight"
                                        style={{ color: emotionConfig.color }}
                                    >
                                        {
                                            emotionConfig.playlistButtonTextPreColored
                                        }
                                    </span>
                                    <span className="text-sm leading-none tracking-tight">
                                        {emotionConfig.playlistButtonTextPost}
                                    </span>
                                </div>
                                <Play size={12} className="ml-1" />
                            </button>
                        </div>
                    </div>
                </ContextMenuTrigger>
                <ContextMenuContent>
                    <ContextMenuItem onSelect={() => openActionDialog("edit")}>
                        수정하기
                    </ContextMenuItem>
                    <ContextMenuItem
                        variant="destructive"
                        onSelect={() => openActionDialog("delete")}
                    >
                        삭제하기
                    </ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>

            {/* 액션 다이얼로그 - 항상 렌더링되지만 open 상태로 제어 */}
            <GuestbookActionDialog
                open={activeAction !== null}
                actionType={activeAction ?? "edit"}
                postId={postId}
                originalContent={content}
                onSubmit={handleActionSubmit}
                onClose={closeActionDialog}
            />
        </>
    );
}

export default memo(GuestbookItem);
