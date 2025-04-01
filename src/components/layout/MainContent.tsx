import { usePlayer } from "@/contexts/PlayerContext";
import GuestbookTopbar from "../guestbook/GuestbookTopbar";
import GuestbookListContainer from "../guestbook/GuestbookListContainer";
import { mockGuestbookItems } from "@/constants/mockData";
import { Toaster } from "../ui/sonner";
import MiniPlayer from "../player/MiniPlayer";

function MainContent() {
    const { curatePlaylistByEmotion } = usePlayer();

    return (
        <div className="mt-16 flex flex-col gap-8">
            <GuestbookTopbar />

            <GuestbookListContainer
                initialItems={mockGuestbookItems}
                onCommentClick={(postId) => {
                    console.log("Comment clicked for postId:", postId);
                }}
                onPlaylistClick={(emotion) => {
                    console.log("Playlist clicked with emotion:", emotion);
                    curatePlaylistByEmotion(emotion);
                }}
            />

            <Toaster position="top-right" />

            <MiniPlayer />
        </div>
    );
}

export default MainContent;
