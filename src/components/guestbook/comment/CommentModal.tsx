import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useCommentsQuery, useCreateCommentMutation, useDeleteCommentMutation } from "@/queries/commentQuries";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import CommentList from "./CommentList";
import { toast } from "sonner";

interface CommentModalProps {
    postId: number;
    open: boolean;
    onClose: () => void;
}

export default function CommentModal({
    postId,
    open,
    onClose,
}: CommentModalProps) {
    const { data, isLoading, isError, refetch } = useCommentsQuery(postId);
    const [comment, setComment] = useState("");
    const [password, setPassword] = useState("");

    const createMutation = useCreateCommentMutation(postId);
    const deleteMutation = useDeleteCommentMutation(postId);

    const handleSubmit = () => {
        if (!comment.trim() || !password.trim()) {
            toast.error("댓글과 비밀번호를 입력해주세요.");
            return;
        }

        createMutation.mutate(
            {
                content: comment,
                password,
                username: "익명",
            },
            {
                onSuccess: () => {
                    toast.success("댓글이 등록되었습니다.");
                    setComment("");
                    setPassword("");
                    refetch();
                },
                onError: () => {
                    toast.error("댓글 등록에 실패했습니다.");
                },
            }
        );
    };

    const handleDelete = (commentId: number, password: string) => {
        deleteMutation.mutate(
            {
                commentId,
                password,
            },
            {
                onSuccess: () => {
                    toast.success("댓글이 삭제되었습니다.");
                    refetch();
                },
                onError: () => {
                    toast.error("비밀번호가 일치하지 않습니다.");
                },
            }
        );
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>댓글</DialogTitle>
                </DialogHeader>

                {isLoading ? (
                    <div className="text-sm text-muted-foreground">
                        댓글을 불러오는 중입니다...
                    </div>
                ) : isError ? (
                    <div className="text-sm text-destructive">오류가 발생했습니다.</div>
                ) : (
                    <CommentList comments={data?.data || []} onDelete={handleDelete} />
                )}

                <div className="flex flex-col gap-2">
                    <Textarea
                        className="resize-none"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="한 마디 해주세요 :)"
                    />
                    <div className="flex gap-2 mt-1">
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="비밀번호"
                        />
                        <Button onClick={handleSubmit} disabled={
                            comment === "" || password === ""
                        }>개시</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
