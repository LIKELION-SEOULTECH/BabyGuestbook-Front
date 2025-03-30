import { MessageSquare, Play } from "lucide-react";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "../ui/context-menu";
import { emotionConfigs, EmotionConfig } from "@/constants/emotion";

export interface GuestbookItemProps {
    postId: number;
    author: string;
    time: string;
    content: string;
    commentCount: number;
    emotion: EmotionConfig["key"];
    onCommentClick?: () => void;
    onPlaylistClick?: () => void;
}

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
 * @returns React.ReactElement
 */
function GuestbookItem({
    author,
    time,
    content,
    commentCount,
    emotion,
    onCommentClick,
    onPlaylistClick,
}: GuestbookItemProps) {
    const emotionConfig = emotionConfigs[emotion];

    return (
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
                                    {emotionConfig.playlistButtonTextPreColored}
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
                <ContextMenuItem className="cursor-pointer" onClick={() => {}}>
                    수정하기
                </ContextMenuItem>
                <ContextMenuItem
                    variant="destructive"
                    className="cursor-pointer"
                    onClick={() => {}}
                >
                    삭제하기
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    );
}

export default GuestbookItem;
