import { emotionConfigs } from "./emotion";

export interface VideoEntry {
    id: string;
    title: string;
}

export interface VideoEntryWithEmotion extends VideoEntry {
    emotion: keyof typeof emotionConfigs;
}

export const emotionVideoMapping: Record<
    keyof typeof emotionConfigs,
    VideoEntry[]
> = {
    HAPPINESS: [
        {
            id: "X1Yv9DPhIdM",
            title: "커피도 분위기도 완벽한 하루 ☕",
        },
    ],
    SADNESS: [
        { id: "hAAixJ8lux8", title: "덕수궁에서 듣는 어쿠스틱" },
        { id: "3vrcoQTvAEw", title: "ADOY와 늦여름의 청춘" },
    ],
    ANGRY: [{ id: "7ID5N1dvcNk", title: "SZA 플레이리스트" }],
    SURPRISED: [
        {
            id: "ZsEPPRojzJ8",
            title: "그루브안타면 혼네한테 혼나(HONNE playlist)",
        },
    ],
    FEAR: [
        { id: "dcDmiUuQb6o", title: "우리집을 카페로 만드는 독보적인 음악들" },
    ],
    NEUTRAL: [{ id: "4eheUvD7tfg", title: "뉴욕에서 보내는 여름" }],
    DISGUST: [
        { id: "UdUkMDCdG58", title: "가을에 듣기 좋은 재즈플레이리스트" },
    ],
};
