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

export interface GuestbookActionDialogProps {
    open: boolean;
    onClose: () => void;
    actionType: "edit" | "delete";
    postId: number;
    originalContent?: string;
    onSubmit: (data: { content?: string; password: string }) => void;
}

/**
 * 방명록 수정 및 삭제 액션을 위한 다이얼로그 컴포넌트이다.
 * actionType에 따라 수정 또는 삭제 입력 폼을 렌더링한다.
 */
function GuestbookActionDialog({
    open,
    onClose,
    actionType,
    postId,
    originalContent = "",
    onSubmit,
}: GuestbookActionDialogProps) {
    const [content, setContent] = useState(originalContent);
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (open) {
            setContent(originalContent);
            setPassword("");
        }
    }, [open, originalContent]);

    const handleSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            onSubmit({
                content: actionType === "edit" ? content : undefined,
                password,
            });
        },
        [actionType, content, password, onSubmit]
    );

    const handlePasswordChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
        },
        []
    );

    const handleContentChange = useCallback(
        (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setContent(e.target.value);
        },
        []
    );

    return (
        <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
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
