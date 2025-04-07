import { useState } from "react";
import { cn } from "@/lib/utils";
import { useLikePostMutation, useUnlikePostMutation } from "@/queries/likeQueries";
import { Heart } from "lucide-react";
import { useAuth } from "@/hooks/auth/useAuth";

interface LikeButtonProps {
    postId: number;
    isLike: boolean;
    likeCnt: number;
}

function LikeButton({ postId, isLike, likeCnt }: LikeButtonProps) {
    const { isAuthenticated, loginWithPopup } = useAuth();
    const [liked, setLiked] = useState(isLike);
    const [count, setCount] = useState(likeCnt);

    const likeMutation = useLikePostMutation();
    const unlikeMutation = useUnlikePostMutation();

    const handleLikeToggle = () => {
        if (!isAuthenticated) {
            loginWithPopup();
            return
        }

        if (liked) {
            unlikeMutation.mutate(postId, {
                onSuccess: () => {
                    setLiked(false);
                    setCount((prev) => prev - 1);
                },
            });
        } else {
            likeMutation.mutate(postId, {
                onSuccess: () => {
                    setLiked(true);
                    setCount((prev) => prev + 1);
                },
            });
        }
    };


    return (
        <button
            onClick={handleLikeToggle}
            className="flex items-center gap-1 text-secondary text-xs cursor-pointer transition-transform duration-150 ease-in-out hover:scale-103 active:scale-97"
        >
            <Heart
                strokeWidth={1}
                size={16}
                className={cn(
                    liked && "fill-lion-orange text-lion-orange",
                    "transition-colors duration-200"
                )}
            />

            <span
                className={cn(
                    liked && "text-lion-orange",
                    "transition-colors duration-200"
                )}
            >{count}</span>
        </button>
    );
}

export default LikeButton;
