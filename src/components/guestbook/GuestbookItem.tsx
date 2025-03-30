import { useState, useCallback, useMemo, memo } from "react";
import { MessageSquare, Play } from "lucide-react";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "../ui/context-menu";
import { emotionConfigs, EmotionConfig } from "@/constants/emotion";
import GuestbookActionDialog from "./GuestbookActionDialog";

export interface GuestbookItemProps {
    postId: number;
    author: string;
    time: string;
    content: string;
    commentCount: number;
    emotion: EmotionConfig["key"];
    onCommentClick?: () => void;
    onPlaylistClick?: () => void;
    onEdit?: (postId: number, content: string, password: string) => void;
    onDelete?: (postId: number, password: string) => void;
}

type ActionType = "edit" | "delete" | null;

/**
 * 방명록 단일 아이템 뷰 입니다.
 *
 * @component
 * @param postId - 방명록 ID
 * @param author - 작성자
 * @param time - 작성 시간(현재 raw로 표시하지만, 이후 DateTime으로 받아 포맷팅할 예정입니다)
 * @param content - 방명록 내용
 * @param commentCount - 댓글 수
 * @param emotion - 감정 key로서, emotionConfigs에서 구현된 감정별 value를 가져오는 데 사용됩니다.
 * @param onCommentClick - 댓글 버튼 클릭 이벤트 핸들러
 * @param onPlaylistClick - 플레이리스트 버튼 클릭 이벤트 핸들러
 * @param onEdit - 방명록 수정 이벤트 핸들러
 * @param onDelete - 방명록 삭제 이벤트 핸들러
 * @returns React.ReactElement
 */
function GuestbookItem({
    postId,
    author,
    time,
    content,
    commentCount,
    emotion,
    onCommentClick,
    onPlaylistClick,
    onEdit,
    onDelete,
}: GuestbookItemProps) {
    const emotionConfig = useMemo(() => emotionConfigs[emotion], [emotion]);

    const [activeAction, setActiveAction] = useState<ActionType>(null);

    // 다이얼로그가 열려있는지
    const isDialogOpen = activeAction !== null;

    // dialog opener
    const openActionDialog = useCallback((action: "edit" | "delete") => {
        setActiveAction(action);
    }, []);

    // dialog open sate 변경 핸들러
    const handleDialogChange = useCallback((open: boolean) => {
        if (!open) setActiveAction(null);
    }, []);

    // dialog handler - 수정 삭제 발생 시 trigger
    const handleAction = useCallback(
        (
            actionPostId: number,
            actionType: ActionType,
            data: { content?: string; password: string }
        ) => {
            if (actionType === "edit" && onEdit && data.content) {
                onEdit(actionPostId, data.content, data.password);
            } else if (actionType === "delete" && onDelete) {
                onDelete(actionPostId, data.password);
            }
        },
        [onEdit, onDelete]
    );

    // event handlers
    const handleEditSelect = useCallback(
        (e: Event) => {
            openActionDialog("edit");
        },
        [openActionDialog]
    );

    const handleDeleteSelect = useCallback(
        (e: Event) => {
            openActionDialog("delete");
        },
        [openActionDialog]
    );

    return (
        <>
            <ContextMenu>
                <ContextMenuTrigger>
                    <div className="flex flex-col items-start gap-4">
                        {/* Top - 작성자 및 작성 시간 */}
                        <div className="flex items-center gap-2 text-secondary text-sm leading-none tracking-tight">
                            <span>{author}</span>
                            <span className="w-0.5 h-0.5 bg-secondary rounded-full" />
                            <span>{time}</span>
                        </div>

                        {/* Body - 방명록 내용 */}
                        <p className="text-xl leading-normal tracking-tight">
                            {content}
                        </p>

                        {/* Bottom - 댓글 버튼 및 플레이리스트 버튼 */}
                        <div className="w-full pt-2 flex items-center gap-4">
                            {/* 댓글 버튼 및 댓글 수 */}
                            <div
                                onClick={onCommentClick}
                                className="flex items-center gap-1 text-secondary text-xs cursor-pointer transition-transform duration-150 ease-in-out hover:scale-103 active:scale-97"
                            >
                                <MessageSquare
                                    strokeWidth={1}
                                    size={16}
                                    className="rotate-y-180"
                                />
                                <span>{commentCount}</span>
                            </div>

                            {/* 감정 플레이리스트 버튼 */}
                            <div
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
                            </div>
                        </div>
                    </div>
                </ContextMenuTrigger>

                <ContextMenuContent>
                    <ContextMenuItem onSelect={handleEditSelect}>
                        수정하기
                    </ContextMenuItem>

                    <ContextMenuItem
                        variant="destructive"
                        onSelect={handleDeleteSelect}
                    >
                        삭제하기
                    </ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>

            {/* 액션 다이얼로그 - 항상 렌더링되지만 open 상태로 제어 */}
            <GuestbookActionDialog
                open={isDialogOpen}
                onOpenChange={handleDialogChange}
                actionType={activeAction || "edit"}
                postId={postId}
                originalContent={content}
                onAction={handleAction}
            />
        </>
    );
}

export default memo(GuestbookItem);
