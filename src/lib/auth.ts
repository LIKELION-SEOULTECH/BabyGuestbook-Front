const KAKAO_AUTH_URL = "http://localhost:8080/login/oauth2/code/kakao";

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

const openOAuthPopup = (authUrl: string, name = "oauth", width = 500, height = 600) => {
    const left = window.screenX + (window.innerWidth - width) / 2;
    const top = window.screenY + (window.innerHeight - height) / 2;

    return window.open(
        authUrl,
        name,
        `width=${width},height=${height},left=${left},top=${top},status=no,scrollbars=yes,resizable=yes`
    );
};

export const handleLogin = () => {
    const popup = openOAuthPopup(KAKAO_AUTH_URL);

    const interval = setInterval(() => {
        try {
            const url = popup?.location.href;
            const hasToken = url && url.includes("accessToken");

            if (hasToken) {
                const params = new URLSearchParams(new URL(url).search);
                const token = params.get("accessToken");

                if (token) {
                    localStorage.setItem("accessToken", token);
                }

                popup?.close();
                clearInterval(interval);
            }
        } catch (err) {
            // cross-origin...
        }

        if (popup?.closed) {
            clearInterval(interval);
        }
    }, 500);
};
