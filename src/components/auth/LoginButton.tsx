import LikeLion from "@/assets/likelion_univ_orange.svg?react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Key } from "lucide-react";
import KakaoButton from "./buttons/KakaoButton";

function LoginButton() {
    const handleLogin = () => {
        alert("로그인 버튼 클릭");
    }

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

                <div className="flex flex-col items-center justify-center gap-4 py-8">
                    <div className="flex flex-col items-center justify-center gap-2">
                        <LikeLion className="h-3" />
                        <p className="text-xl">로그인하기</p>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-2">
                        <KakaoButton />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default LoginButton;
