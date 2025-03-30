import { useState, useEffect, useCallback, memo } from "react";
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

type ActionType = "edit" | "delete" | null; // type safety를 위해 null을 추가

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

    // form 제출 핸들러
    const handleSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();

            onAction(postId, actionType, {
                content: actionType === "edit" ? content : undefined,
                password,
            });

            onOpenChange(false);
        },
        [postId, actionType, content, password, onAction, onOpenChange]
    );

    // 비밀번호 입력 핸들러 메모이제이션
    const handlePasswordChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
        },
        []
    );

    // 콘텐츠 입력 핸들러 메모이제이션
    const handleContentChange = useCallback(
        (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setContent(e.target.value);
        },
        []
    );

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
                            onChange={handleContentChange}
                            placeholder="수정할 내용을 입력하세요."
                            className="w-full"
                        />
                    )}
                    <Input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
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

export default memo(GuestbookActionDialog);
