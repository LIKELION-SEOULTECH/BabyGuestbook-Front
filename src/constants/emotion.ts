export type BaseEmotion =
    | "HAPPINESS"
    | "SADNESS"
    | "ANGRY"
    | "SURPRISED"
    | "FEAR"
    | "NEUTRAL"
    | "DISGUST";

export interface EmotionConfig {
    key: BaseEmotion;
    label: string; // 한글 감정 이름
    playlistButtonTextPreColored: string; // 버튼 앞 색칠되는 부분
    playlistButtonTextPost: string; // 버튼 나머지 문구
    color: string; // HEX 색상
}

export const emotionConfigs: Record<BaseEmotion, EmotionConfig> = {
    HAPPINESS: {
        key: "HAPPINESS",
        label: "기쁨",
        playlistButtonTextPreColored: "기쁨",
        playlistButtonTextPost: "가득한 노래 듣기",
        color: "#ff9350",
    },
    SADNESS: {
        key: "SADNESS",
        label: "슬픔",
        playlistButtonTextPreColored: "슬픔을",
        playlistButtonTextPost: "감싸줄 노래",
        color: "#7ca7ff",
    },
    ANGRY: {
        key: "ANGRY",
        label: "화남",
        playlistButtonTextPreColored: "화가 날 때",
        playlistButtonTextPost: "들어보세요",
        color: "#ff6b6b",
    },
    SURPRISED: {
        key: "SURPRISED",
        label: "놀람",
        playlistButtonTextPreColored: "놀람",
        playlistButtonTextPost: "속의 설렘을 담은 음악",
        color: "#ffd479",
    },
    FEAR: {
        key: "FEAR",
        label: "공포",
        playlistButtonTextPreColored: "공포를",
        playlistButtonTextPost: "달래주는 잔잔한 선율",
        color: "#a18adf",
    },
    NEUTRAL: {
        key: "NEUTRAL",
        label: "잔잔함",
        playlistButtonTextPreColored: "잔잔한",
        playlistButtonTextPost: "하루의 음악",
        color: "#e0e0e0",
    },
    DISGUST: {
        key: "DISGUST",
        label: "불편함",
        playlistButtonTextPreColored: "불편한",
        playlistButtonTextPost: "마음을 씻는 음악",
        color: "#8fc1a9",
    },
};

export const EMOTIONS = {
    ALL: "ALL",
    ...Object.fromEntries(Object.keys(emotionConfigs).map((key) => [key, key])),
} as const;

export type Emotion = (typeof EMOTIONS)[keyof typeof EMOTIONS];

export const EMOTION_LABELS: Record<Emotion, string> = {
    ALL: "전체",
    ...Object.entries(emotionConfigs).reduce((acc, [key, config]) => {
        acc[key as BaseEmotion] = config.label;
        return acc;
    }, {} as Record<BaseEmotion, string>),
};
