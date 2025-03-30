import { useState } from "react";
import { MessageSquare, Play } from "lucide-react";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "../ui/context-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { emotionConfigs, EmotionConfig } from "@/constants/emotion";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

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
    postId,
    author,
    time,
    content,
    commentCount,
    emotion,
    onCommentClick,
    onPlaylistClick,
}: GuestbookItemProps) {
    const emotionConfig = emotionConfigs[emotion];
    const [editContent, setEditContent] = useState(content);
    const [editPassword, setEditPassword] = useState("");

    const handleEditSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log("방명록 수정 제출", { postId, editContent, editPassword });
    };

    const handleDeleteSubmit = (e: React.FormEvent, password: string) => {
        e.preventDefault();

        console.log("방명록 삭제 제출", { postId, password });
    };

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
                {/* 수정하기 Dialog */}
                <Dialog>
                    <DialogTrigger asChild>
                        <ContextMenuItem className="cursor-pointer">
                            수정하기
                        </ContextMenuItem>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>방명록 수정</DialogTitle>
                            <DialogDescription>
                                방명록 내용을 수정하고, 비밀번호를 입력해 본인
                                인증을 진행한다.
                            </DialogDescription>
                        </DialogHeader>
                        <form
                            onSubmit={handleEditSubmit}
                            className="flex flex-col gap-4"
                        >
                            <Textarea
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                placeholder="수정할 내용을 입력하세요."
                                className="w-full"
                            />
                            <Input
                                type="password"
                                value={editPassword}
                                onChange={(e) =>
                                    setEditPassword(e.target.value)
                                }
                                placeholder="비밀번호를 입력하세요."
                                className="w-full"
                            />
                            <DialogFooter>
                                <Button type="submit">수정 완료</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>

                {/* 삭제하기 Dialog */}
                <Dialog>
                    <DialogTrigger asChild>
                        <ContextMenuItem
                            variant="destructive"
                            className="cursor-pointer"
                        >
                            삭제하기
                        </ContextMenuItem>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>삭제 확인</DialogTitle>
                            <DialogDescription>
                                방명록 삭제를 위해 비밀번호를 입력해 본인 인증을
                                진행한다.
                            </DialogDescription>
                        </DialogHeader>
                        <form
                            onSubmit={(e) =>
                                handleDeleteSubmit(
                                    e,
                                    (
                                        e.currentTarget
                                            .password as HTMLInputElement
                                    ).value
                                )
                            }
                            className="flex flex-col gap-4"
                        >
                            <Input
                                name="password"
                                type="password"
                                placeholder="비밀번호를 입력하세요."
                                className="w-full"
                            />
                            <DialogFooter>
                                <Button type="submit" variant="destructive">
                                    삭제하기
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </ContextMenuContent>
        </ContextMenu>
    );
}

export default GuestbookItem;
