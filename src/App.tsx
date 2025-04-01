import { PlayerProvider } from "./contexts/PlayerContext";
import Header from "./components/layout/Header";
import MainContent from "./components/layout/MainContent";

function App() {
    return (
        <PlayerProvider>
            <div className="max-w-4xl mx-auto px-4 pt-16 pb-12">
                <Header />
                <MainContent />
            </div>
        </PlayerProvider>
    );
}

export default App;
