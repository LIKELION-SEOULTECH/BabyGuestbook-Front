import { PostDTO, Emotion } from "@/types/post";

export const mockGuestbookItems: PostDTO[] = Array.from(
    { length: 25 },
    (_, i) => ({
        postId: i + 1,
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        emotion: [
            "HAPPY",
            "SAD",
            "CALM",
            "ANGRY",
            "SURPRISED",
            "FEAR",
            "UNCOMFORTABLE",
        ][Math.floor(Math.random() * 7)] as Emotion,
        username: [
            "멋쟁이사자",
            "행복한고양이",
            "슬픈강아지",
            "즐거운토끼",
            "신나는거북이",
        ][Math.floor(Math.random() * 5)],
        updatedAt: new Date(
            Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
        ).toISOString(),
        likeCnt: Math.floor(Math.random() * 100),
        commentCnt: Math.floor(Math.random() * 20),
    })
);
