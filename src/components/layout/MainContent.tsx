import { useRef, useState } from "react";
import { usePlayer } from "@/contexts/PlayerContext";
import { Emotion, Order } from "@/types/post";

import GuestbookTopbar from "../guestbook/GuestbookTopbar";
import GuestbookListContainer from "../guestbook/GuestbookListContainer";
import { Toaster } from "../ui/sonner";
import MiniPlayer from "../player/MiniPlayer";
import { usePostsQuery } from "@/queries/postQueries";
import { LoadingSpinner } from "../ui/loading-spinner";

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

    // const handleFilterChange = (order: Order, emotion?: Emotion) => {
    //     setCurrentOrder(order);
    //     setCurrentEmotion(emotion);
    //     // 필터 변경 시 데이터 다시 로드
    //     setTimeout(() => refetch(), 0);
    // };

    const posts = data?.data || [];

    return (
        <div className="mt-16 flex flex-col gap-8">
            <GuestbookTopbar />

            {isLoading ? (
                <div className="flex flex-col justify-center items-center h-40 gap-4">
                    <LoadingSpinner className="text-secondary" />
                    <span className="text-sm text-secondary">
                        방명록을 불러오는 중입니다...
                    </span>
                </div>
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

            <Toaster position="top-right" richColors />

            <MiniPlayer />
        </div>
    );
}

export default MainContent;
