import { memo } from "react"
import { CommentDTO } from "@/types/comment";
import { formatRelativeDate } from "@/lib/formatRelativeDate";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";

interface CommentItemProps {
    comment: CommentDTO;
    onDelete: (commentId: number, password: string) => void;
}

function CommentItem({ comment, onDelete }: CommentItemProps) {
    const handleDeleteClick = () => {
        const password = prompt("댓글 삭제를 위한 비밀번호를 입력해주세요.");
        if (password) {
            onDelete(comment.commentId, password);
        }
    };

    const { username, content } = comment;
    const displayTime = formatRelativeDate(comment.updatedAt)

    return (
        <>

            <ContextMenu>
                <ContextMenuTrigger>
                    <div className="w-full inline-flex flex-col justify-center items-start gap-2 overflow-hidden">
                        <div className="w-full flex justify-start items-center gap-2 text-secondary text-sm leading-none tracking-tight">
                            <span>{username}</span>
                            <div className="w-0.5 h-0.5 bg-secondary rounded-full" />
                            <span>{displayTime}</span>
                        </div>
                        <p className="text-md leading-snug tracking-tight">{content}</p>
                    </div>
                </ContextMenuTrigger>

                <ContextMenuContent>
                    <ContextMenuItem
                        variant="destructive"
                        onSelect={() => handleDeleteClick()}
                    >
                        삭제하기
                    </ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>
        </>
    );
}

export default memo(CommentItem);
