import { useState } from "react";
import { usePlayer } from "@/contexts/PlayerContext";
import { Emotion, Order } from "@/types/post";

import GuestbookListContainer from "../guestbook/GuestbookListContainer";
import { Toaster } from "../ui/sonner";
import MiniPlayer from "../player/MiniPlayer";

function MainContent() {
    const { curatePlaylistByEmotion } = usePlayer();

    return (
        <div className="mt-16 flex flex-col gap-8">
            {/* <GuestbookTopbar /> */}

            <GuestbookListContainer
                onCommentClick={(postId) => {
                    console.log("Comment clicked for postId:", postId);
                }}
                onPlaylistClick={(emotion) => {
                    console.log("Playlist clicked with emotion:", emotion);
                    curatePlaylistByEmotion(emotion);
                }}
            />

            <Toaster position="top-right" richColors />

            <MiniPlayer />
        </div>
    );
}

export default MainContent;
