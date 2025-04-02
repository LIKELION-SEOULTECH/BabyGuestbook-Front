import { useState } from "react";
import { Pencil } from "lucide-react";
import GuestbookWriteDialog from "./GuestbookWriteDialog";
import { toast } from "sonner";
import { TempPost } from "@/types/tempPost";
import { CommentDTO } from "@/types/comment";

interface GuestbookTopbarProps {
  onPostSubmit: (post: TempPost) => void;
}

/**
 * @description 방명록 상단바 - 내 방명록 쓰기 버튼, 정렬 옵션, 감정별 필터
 * @returns {JSX.Element}
 */
function GuestbookTopbar({ onPostSubmit }: GuestbookTopbarProps) {
  const [isWriteOpen, setIsWriteOpen] = useState(false);

  const handleWriteSubmit = (data: { content: string; password: string }) => {
    const newPost: TempPost = {
      postId: Date.now(),
      content: data.content,
      password: data.password,
      comments: [] as CommentDTO[],
      createdAt: new Date().toISOString(),
    };

    onPostSubmit(newPost);
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

        <div className="flex items-center gap-3">
          {/* 정렬 옵션: 최신순 / 댓글순 */}
          <div className="h-6 rounded-full flex items-center gap-2.5 leading-3 tracking-tight text-sm">
            <span className="underline cursor-pointer">최신순</span>
            <span className="text-secondary cursor-pointer">댓글순</span>
          </div>

          {/* 감정별 필터 -- TODO: Dropdown 등 */}
          <div className="px-4.5 py-2 bg-surface rounded-full border-[0.5px] flex justify-between items-center text-sm leading-3 tracking-tight">
            <span>감정별로 보기</span>
          </div>
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
