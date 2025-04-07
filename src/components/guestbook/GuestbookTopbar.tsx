import { useState } from "react";
import { Pencil } from "lucide-react";
import GuestbookWriteDialog from "./GuestbookWriteDialog";
import LoginButton from "../auth/LoginButton";
import { toast } from "sonner";
import { CreatePostRequest, Order } from "@/types/post";
import { GuestbookDropdownMenu } from "./GuestbookDropdownMenu";
import { Emotion } from "@/constants/emotion";

interface GuestbookTopbarProps {
    onPostSubmit: (post: CreatePostRequest) => void;
    currentOrder: Order;
    onOrderChange: (value: Order) => void;
    onEmotionChange: (value: Emotion) => void;
}

/**
 * @description 방명록 상단바 - 내 방명록 쓰기 버튼, 정렬 옵션, 감정별 필터
 * @returns {JSX.Element}
 */
function GuestbookTopbar({
    onPostSubmit,
    currentOrder,
    onOrderChange,
    onEmotionChange,
}: GuestbookTopbarProps) {
    const [isWriteOpen, setIsWriteOpen] = useState(false);
    const handleWriteSubmit = ({ content, password }: CreatePostRequest) => {
        onPostSubmit({ content, password });
        toast.success("방명록이 작성되었습니다!");
        setIsWriteOpen(false);
    };

    return (
        <>
            <div className="flex justify-between items-center overflow-hidden w-full">
                {/* 내 방명록 쓰기 버튼 */}
                <div
                    className="px-4.5 py-2 bg-lion-orange text-white rounded-full border-[0.5px] flex justify-between items-center text-sm font-semibold leading-3 tracking-tight cursor-pointer transition-transform duration-150 ease-in-out active:scale-97"
                    onClick={() => setIsWriteOpen(true)}
                >
                    <span>내 방명록 쓰기</span>
                    <Pencil size={12} className="ml-2" />
                </div>

                <LoginButton />

                <div className="flex items-center gap-3">
                    {/* 정렬 옵션: 최신순 / 댓글순 */}
                    <div className="h-6 rounded-full flex items-center gap-2.5 leading-3 tracking-tight text-sm">
                        <span
                            className={`cursor-pointer ${currentOrder === "LATEST"
                                ? "underline"
                                : "text-secondary"
                                }`}
                            onClick={() => onOrderChange("LATEST")}
                        >
                            최신순
                        </span>
                        <span
                            className={`cursor-pointer ${currentOrder === "COMMENT"
                                ? "underline"
                                : "text-secondary"
                                }`}
                            onClick={() => onOrderChange("COMMENT")}
                        >
                            댓글순
                        </span>
                    </div>

                    {/* 감정별 필터 -- TODO: Dropdown 등 */}
                    <GuestbookDropdownMenu onEmotionChange={onEmotionChange} />
                </div>
            </div>

            {/* 글쓰기 모달 */}
            <GuestbookWriteDialog
                open={isWriteOpen}
                onClose={() => setIsWriteOpen(false)}
                onSubmit={handleWriteSubmit}
            />
        </>
    );
}

export default GuestbookTopbar;
