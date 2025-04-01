import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { PlayerProvider } from "./contexts/PlayerContext";
import Header from "./components/layout/Header";
import MainContent from "./components/layout/MainContent";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
        },
    },
});

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <PlayerProvider>
                <div className="max-w-4xl mx-auto px-4 pt-16 pb-12">
                    <Header />
                    <MainContent />
                </div>
            </PlayerProvider>
        </QueryClientProvider>
    );
}

export default App;
