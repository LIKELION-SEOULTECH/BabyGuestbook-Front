import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Props {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: { content: string; password: string }) => void;
}

function GuestbookWriteDialog({ open, onClose, onSubmit }: Props) {
    const [content, setContent] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ content, password });
        setContent("");
        setPassword("");
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
            <DialogContent className="w-[90vw] max-w-none !max-w-[90vw] !w-[90vw] h-[80vh] max-h-[90vh] overflow-y-auto">
                <DialogHeader className="mb-1">
                    <DialogTitle className="text-2xl font-bold">
                        방명록 작성
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground mt-1">
                        아기사자에게 마음을 담은 메시지를
                        <br />
                        작성해보세요 🦁✨
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col justify-between h-full"
                >
                    <div className="flex flex-col gap-4 mt-2">
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-foreground">
                                내용
                            </label>
                            <Textarea
                                placeholder="아기사자에게 전하고 싶은 말을 적어보세요 :)"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="resize-none h-[350px]"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-foreground">
                                비밀번호
                            </label>
                            <Input
                                type="password"
                                placeholder="글 수정/삭제를 위한 비밀번호"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <DialogFooter className="pt-6">
                        <Button
                            type="submit"
                            className="ml-auto px-6 py-2 text-sm font-semibold"
                        >
                            ✍️ 작성 완료
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default GuestbookWriteDialog;
