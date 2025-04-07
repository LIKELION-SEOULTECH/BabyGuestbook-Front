import { useLayoutEffect } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { AuthProvider } from "./contexts/AuthContext";
import { useAuth } from "./hooks/auth/useAuth";
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
    const { signIn } = useAuth();

    useLayoutEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get('accessToken');
        if (accessToken) {
            signIn(accessToken);
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }, [signIn]);

    return (
        <AuthProvider>
            <QueryClientProvider client={queryClient}>
                <PlayerProvider>
                    <div className="max-w-4xl mx-auto px-4 pt-16 pb-12">
                        <Header />
                        <MainContent />
                    </div>
                </PlayerProvider>
            </QueryClientProvider>
        </AuthProvider>
    );
}

export default App;
