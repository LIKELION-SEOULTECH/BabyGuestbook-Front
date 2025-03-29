import GuestbookList from "./components/guestbook/GuestbookList";
import Header from "./components/layout/Header";
import { mockGuestbookItems } from "./constants/mockData";

function App() {
    return (
        <div className="max-w-4xl mx-auto px-4 pt-16 pb-12">
            <Header />

            <div className="h-16"></div>

            <GuestbookList items={mockGuestbookItems} />
        </div>
    );
}

export default App;
