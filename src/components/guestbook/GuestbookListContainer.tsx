import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import GuestbookList from "./GuestbookList";
import GuestbookTopbar from "./GuestbookTopbar";
import { PostDTO } from "@/types/post";
import { TempPost } from "@/types/tempPost";

export interface GuestbookListContainerProps {
  initialItems: PostDTO[];
  onCommentClick?: (postId: number) => void;
  onPlaylistClick?: (
    emotion: keyof typeof import("@/constants/emotion").emotionConfigs
  ) => void;
}

/**
 * GuestbookListContainer
 * API Call, state 관리 등 비즈니스 로직을 담당합니다.
 */
function GuestbookListContainer({
  initialItems,
  onCommentClick,
  onPlaylistClick,
}: GuestbookListContainerProps) {
  const [guestbooks, setGuestbooks] = useState<PostDTO[]>(initialItems);

  useEffect(() => {
    setGuestbooks(initialItems);
  }, [initialItems]);

  const handleEdit = useCallback(
    async (postId: number, content: string, password: string) => {
      try {
        // updatePost 올 자리
        const success = true;
        if (success) {
          const updatedGuestbooks = guestbooks.map((item) =>
            item.postId === postId ? { ...item, content } : item
          );
          setGuestbooks(updatedGuestbooks);
          toast.success("성공적으로 수정되었습니다.");
        } else {
          toast.error("비밀번호가 일치하지 않습니다.");
        }
      } catch (error) {
        console.error("방명록 수정 중 오류:", error);
        toast.error("방명록 수정 중 오류가 발생했습니다.");
      }
    },
    [guestbooks]
  );

  const handleDelete = useCallback(
    async (postId: number, password: string) => {
      try {
        // deletePost 올 자리
        const success = true;
        if (success) {
          const updatedGuestbooks = guestbooks.filter(
            (item) => item.postId !== postId
          );
          setGuestbooks(updatedGuestbooks);
          toast.success("방명록이 삭제되었습니다.");
        } else {
          toast.error("비밀번호가 일치하지 않습니다.");
        }
      } catch (error) {
        console.error("방명록 삭제 중 오류:", error);
        toast.error("방명록 삭제 중 오류가 발생했습니다.");
      }
    },
    [guestbooks]
  );

  /** ✅ 글쓰기 모달에서 전달된 새 글 추가 함수 */
  const handleAddPost = (newPost: TempPost) => {
    const { password, ...rest } = newPost;

    const post: PostDTO = {
      ...rest,
      emotion: "HAPPY", // 추후 감정 선택 기능이 생기면 바꿔줄 수 있어요
      user: {
        userId: 0,
        username: "익명",
      },
      updatedAt: new Date().toISOString(),
      likeCnt: 0,
      commentCnt: 0,
    };

    setGuestbooks((prev) => [post, ...prev]);
  };

  return (
    <>
      <GuestbookTopbar onPostSubmit={handleAddPost} />
      <GuestbookList
        items={guestbooks}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCommentClick={onCommentClick ?? (() => {})}
        onPlaylistClick={onPlaylistClick ?? (() => {})}
      />
    </>
  );
}

export default GuestbookListContainer;
