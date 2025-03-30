import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type ActionType = "edit" | "delete";

interface GuestbookActionDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    actionType: ActionType;
    postId: number;
    originalContent?: string;
    onAction: (
        postId: number,
        actionType: ActionType,
        data: { content?: string; password: string }
    ) => void;
}

/**
 * 방명록 수정/삭제 액션을 처리하는 다이얼로그 컴포넌트입니다.
 */
function GuestbookActionDialog({
    open,
    onOpenChange,
    actionType,
    postId,
    originalContent = "",
    onAction,
}: GuestbookActionDialogProps) {
    const [content, setContent] = useState(originalContent);
    const [password, setPassword] = useState("");

    // 다이얼로그가 열릴 때마다 clear
    useEffect(() => {
        if (open) {
            setContent(originalContent);
            setPassword("");
        }
    }, [open, originalContent]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (actionType === "edit") {
            onAction(postId, actionType, { content, password });
        } else {
            onAction(postId, actionType, { password });
        }

        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        {actionType === "edit" ? "방명록 수정" : "삭제 확인"}
                    </DialogTitle>
                    <DialogDescription>
                        {actionType === "edit"
                            ? "방명록 수정하기"
                            : "방명록 삭제를 위해 비밀번호를 입력해주세요."}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {actionType === "edit" && (
                        <Textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="수정할 내용을 입력하세요."
                            className="w-full"
                        />
                    )}
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="비밀번호를 입력하세요."
                        className="w-full"
                    />
                    <DialogFooter>
                        <Button
                            type="submit"
                            variant={
                                actionType === "delete"
                                    ? "destructive"
                                    : "default"
                            }
                        >
                            {actionType === "edit" ? "수정 완료" : "삭제하기"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default GuestbookActionDialog;
