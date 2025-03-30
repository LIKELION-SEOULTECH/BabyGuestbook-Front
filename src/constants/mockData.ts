import { GuestbookData } from "@/components/guestbook/GuestbookList";

export const mockGuestbookItems: GuestbookData[] = [
    {
        postId: 1,
        author: "멋쟁이사자",
        time: "3분 전",
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        commentCount: 3,
        emotion: "happy",
    },
    {
        postId: 2,
        author: "행복한고양이",
        time: "5분 전",
        content:
            "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
        commentCount: 5,
        emotion: "calm",
    },
    {
        postId: 3,
        author: "슬픈강아지",
        time: "10분 전",
        content:
            "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        commentCount: 2,
        emotion: "sad",
    },
];
