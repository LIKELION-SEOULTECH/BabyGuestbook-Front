import { CommentDTO } from "@/types/comment";
import CommentItem from "./CommentItem";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CommentListProps {
    comments: CommentDTO[];
    onDelete: (commentId: number, password: string) => void;
}

export default function CommentList({ comments, onDelete }: CommentListProps) {
    if (comments.length === 0) {
        return (
            <div className="py-4 text-sm text-center text-muted-foreground">
                아직 댓글이 없습니다.
            </div>
        );
    }

    return (
        <ScrollArea className="h-80 w-full rounded-sm p-2" type="always">
            {comments.map((comment) => (
                <div className="py-2" key={comment.commentId}>
                    <CommentItem comment={comment} onDelete={onDelete} />
                </div>
            ))}
        </ScrollArea>
    );
}
