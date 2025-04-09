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

    /**
    * 사실 redirect이지만 rename하기 귀찮아서 둡니다.
    */
    const loginWithPopup = useCallback(() => {
        const KAKAO_AUTH_URL = "http://localhost:8080/oauth2/authorization/kakao";
        window.location.href = KAKAO_AUTH_URL;
    }, []);

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
