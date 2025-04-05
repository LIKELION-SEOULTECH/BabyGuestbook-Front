import { CommentDTO } from "@/types/comment";
import CommentItem from "./CommentItem";

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
        <div className="flex flex-col gap-4">
            {comments.map((comment) => (
                <CommentItem comment={comment} key={comment.commentId} onDelete={onDelete} />
            ))}
        </div>
    );
}
