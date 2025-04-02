import { useRef, useState } from "react";
import { usePlayer } from "@/contexts/PlayerContext";
import { Emotion, Order } from "@/types/post";

import GuestbookListContainer from "../guestbook/GuestbookListContainer"; // ✅ Topbar는 GuestbookListContainer 안에 있음
import { Toaster } from "../ui/sonner";
import MiniPlayer from "../player/MiniPlayer";
import { usePostsQuery } from "@/queries/postQueries";

function MainContent() {
  const { curatePlaylistByEmotion } = usePlayer();
  const [currentOrder, setCurrentOrder] = useState<Order>("LATEST"); // 정렬
  const [currentEmotion, setCurrentEmotion] = useState<Emotion | undefined>(
    undefined
  ); // 필터링
  const loaderRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, isError, error, refetch } = usePostsQuery({
    order: currentOrder,
    emotion: currentEmotion,
    pageSize: 10,
  });

  const posts = data?.data || [];

  return (
    <div className="mt-16 flex flex-col gap-8">
      {/* <GuestbookTopbar />  ← ✅ 중복 제거됨 */}

      {isLoading ? (
        <div className="flex justify-center items-center h-40">loading ...</div>
      ) : (
        <GuestbookListContainer
          initialItems={posts}
          onCommentClick={(postId) => {
            console.log("Comment clicked for postId:", postId);
          }}
          onPlaylistClick={(emotion) => {
            console.log("Playlist clicked with emotion:", emotion);
            curatePlaylistByEmotion(emotion);
          }}
        />
      )}

      <Toaster position="top-right" />
      <MiniPlayer />
    </div>
  );
}

export default MainContent;
