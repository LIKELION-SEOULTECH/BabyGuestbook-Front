import { useAuth } from "@/hooks/auth/useAuth";

function Footer() {
    const { isAuthenticated, signOut, loginWithPopup } = useAuth();
    return (
        <footer className="w-full py-8">
            <div className="text-center">
                {isAuthenticated ? (
                    <p className="text-sm cursor-pointer" onClick={signOut}>로그아웃</p>
                ) : (
                    <p className="text-sm cursor-pointer" onClick={loginWithPopup}>로그인</p>
                )}
                < p className="text-sm pt-2">© BabyGuestbook. All rights reserved.</p>
            </div>
        </footer >
    );
}

export default Footer;

