export function extractAccessTokenFromURL(): string | null {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("accessToken");
    return token;
}

export function storeAccessToken(token: string) {
    localStorage.setItem("accessToken", token);
}

export function getAccessToken(): string | null {
    return localStorage.getItem("accessToken");
}

export function clearAccessToken() {
    localStorage.removeItem("accessToken");
}
