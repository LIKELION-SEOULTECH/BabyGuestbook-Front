export function useAuth() {
    const token = localStorage.getItem("accessToken");

    return {
        isLoggedIn: Boolean(token),
        token,
        logout: () => {
            localStorage.removeItem("accessToken");
            window.location.reload();
        },
    };
}
