import { useCallback, useEffect, useState } from 'react';

export const useAuth = () => {
    const [token, setToken] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const checkAuth = useCallback(() => {
        const storedToken = localStorage.getItem('accessToken');
        setToken(storedToken);
        setIsAuthenticated(!!storedToken);
    }, []);


    const signIn = useCallback((newToken: string) => {
        localStorage.setItem('accessToken', newToken);
        setToken(newToken);
        setIsAuthenticated(true);
    }, []);


    const signOut = useCallback(() => {
        localStorage.removeItem('accessToken');
        setToken(null);
        setIsAuthenticated(false);
        window.location.reload(); // ui 반영 문제-> 그냥 새로고침으로 해결 ㅎㅎ
    }, []);

    const loginWithPopup = useCallback(() => {
        const KAKAO_AUTH_URL = "http://localhost:8080/login/oauth2/code/kakao";
        const popup = window.open(KAKAO_AUTH_URL, "oauthPopup", "width=500,height=600");

        if (!popup) return; // 팝업 차단인 경우..

        // 팝업에서 redirect polling
        const polling = setInterval(() => {
            try {
                if (!popup || popup.closed) {
                    clearInterval(polling);
                    return;
                }
                if (popup.location.href.indexOf("accessToken") !== -1) {
                    const urlParams = new URLSearchParams(popup.location.search);
                    const accessToken = urlParams.get("accessToken");

                    if (accessToken) {
                        signIn(accessToken);
                    }

                    clearInterval(polling);
                    popup.close();
                }
            } catch (error) {
                // cors는 그냥 무시~
            }
        }, 500);
    }, [signIn]);

    useEffect(() => {
        checkAuth();

        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === 'accessToken') {
                checkAuth();
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [checkAuth]);

    return {
        token,
        isAuthenticated,
        checkAuth,
        signIn,
        signOut,
        loginWithPopup,
    };
};
