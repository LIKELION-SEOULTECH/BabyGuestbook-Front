import LikeLion from "@/assets/likelion_univ_orange.svg?react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Key } from "lucide-react";
import { Button } from "../ui/button";

const KAKAO_AUTH_URL = "http://localhost:8080/login/oauth2/code/kakao";

const openOAuthPopup = (authUrl: string, name = "oauth", width = 500, height = 600) => {
    const left = window.screenX + (window.innerWidth - width) / 2;
    const top = window.screenY + (window.innerHeight - height) / 2;

    return window.open(
        authUrl,
        name,
        `width=${width},height=${height},left=${left},top=${top},status=no,scrollbars=yes,resizable=yes`
    );
};

function LoginButton() {
    const handleLogin = () => {
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

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div
                    className="px-4.5 py-2 bg-lion-orange text-white rounded-full border-[0.5px] flex justify-between items-center text-sm font-semibold leading-3 tracking-tight cursor-pointer transition-transform duration-150 ease-in-out active:scale-97"
                >
                    <span>로그인하기</span>
                    <Key size={12} className="ml-2" />
                </div>

            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle></DialogTitle>
                </DialogHeader>

                <div className="flex flex-col items-center justify-center gap-8 py-8">
                    <div className="flex flex-col items-center justify-center gap-2">
                        <LikeLion className="h-3" />
                        <p className="text-xl">로그인하기</p>
                    </div>

                    <Button onClick={handleLogin} className="w-full bg-[#FEE500] hover:bg-[#FEE500]/80">
                        카카오 로그인
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default LoginButton;
