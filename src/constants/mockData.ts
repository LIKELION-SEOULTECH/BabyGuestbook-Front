import { PostDTO } from "@/api/post";

export const mockGuestbookItems: PostDTO[] = [
    {
        postId: 1,
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        emotion: "HAPPY",
        user: { userId: 1, username: "멋쟁이사자" },
        updatedAt: "2025-03-28T12:34:56Z",
        likeCnt: 10,
        commentCnt: 3,
    },
    {
        postId: 2,
        content:
            "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
        emotion: "CALM",
        user: { userId: 2, username: "행복한고양이" },
        updatedAt: "2025-03-30T12:30:00Z",
        likeCnt: 20,
        commentCnt: 5,
    },
    {
        postId: 3,
        content:
            "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        emotion: "SAD",
        user: { userId: 3, username: "슬픈강아지" },
        updatedAt: "2025-03-15T12:20:00Z",
        likeCnt: 8,
        commentCnt: 2,
    },
];
