import React, { createContext, useContext } from 'react';
import { useAuth } from '@/hooks/auth/useAuth';

interface AuthContextType {
    token: string | null;
    isAuthenticated: boolean;
    checkAuth: () => void;
    signIn: (newToken: string) => void;
    signOut: () => void;
    loginWithPopup: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const auth = useAuth();

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error();
    }
    return context;
};
