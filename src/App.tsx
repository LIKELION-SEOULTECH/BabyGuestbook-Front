import GuestbookList from "./components/guestbook/GuestbookList";
import GuestbookTopbar from "./components/guestbook/GuestbookTopbar";
import Header from "./components/layout/Header";
import { Toaster } from "./components/ui/sonner";
import MiniplayerMock from "./components/player/MiniPlayer";
import { mockGuestbookItems } from "./constants/mockData";

function App() {
    return (
        <div className="max-w-4xl mx-auto px-4 pt-16 pb-12">
            <Header />

            <div className="mt-16 flex flex-col gap-8">
                <GuestbookTopbar />

                <GuestbookList
                    items={mockGuestbookItems}
                    onItemUpdated={(updatedGuestbooks) => {
                        console.log("Updated guestbooks:", updatedGuestbooks);
                    }}
                    onCommentClick={(postId) => {
                        console.log("Comment clicked for postId:", postId);
                    }}
                    onPlaylistClick={(postId, emotion) => {
                        console.log(
                            "Playlist clicked for postId:",
                            postId,
                            "with emotion:",
                            emotion
                        );
                    }}
                />

                <Toaster position="top-right" />

                <MiniplayerMock />
            </div>
        </div>
    );
}

export default App;
