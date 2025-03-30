import GuestbookList from "./components/guestbook/GuestbookList";
import GuestbookTopbar from "./components/guestbook/GuestbookTopbar";
import Header from "./components/layout/Header";
import { mockGuestbookItems } from "./constants/mockData";
import MiniplayerMock from "./components/player/MiniPlayer";

function App() {
    return (
        <div className="max-w-4xl mx-auto px-4 pt-16 pb-12">
            <Header />

            <div className="mt-16 flex flex-col gap-8">
                <GuestbookTopbar />

                <GuestbookList items={mockGuestbookItems} />

                <MiniplayerMock />
            </div>
        </div>
    );
}

export default App;
