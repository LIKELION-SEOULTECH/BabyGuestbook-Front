export interface EmotionConfig {
    key:
        | "happy"
        | "sad"
        | "angry"
        | "surprised"
        | "fear"
        | "calm"
        | "uncomfortable";
    label: string; // 한글 label
    playlistButtonTextPreColored: string; // 플리 버튼에서 앞에 색칠되는 부분
    playlistButtonTextPost: string; // 플리 버튼 라벨 나머지
    color: string;
}

export const emotionConfigs: Record<EmotionConfig["key"], EmotionConfig> = {
    happy: {
        key: "happy",
        label: "기쁨",
        playlistButtonTextPreColored: "기쁨",
        playlistButtonTextPost: "가득한 노래 듣기",
        color: "#ff9350", // --color-emotion-happy
    },
    sad: {
        key: "sad",
        label: "슬픔",
        playlistButtonTextPreColored: "슬픔",
        playlistButtonTextPost: "을 감싸줄 노래",
        color: "#7ca7ff", // --color-emotion-sad
    },
    angry: {
        key: "angry",
        label: "화남",
        playlistButtonTextPreColored: "화가 날 때",
        playlistButtonTextPost: "들어보세요",
        color: "#ff6b6b", // --color-emotion-angry
    },
    surprised: {
        key: "surprised",
        label: "놀람",
        playlistButtonTextPreColored: "놀람",
        playlistButtonTextPost: "속의 설렘을 담음 음악",
        color: "#ffd479", // --color-emotion-surprised
    },
    fear: {
        key: "fear",
        label: "공포",
        playlistButtonTextPreColored: "공포",
        playlistButtonTextPost: "를 달래주는 잔잔한 선율",
        color: "#a18adf", // --color-emotion-fear
    },
    calm: {
        key: "calm",
        label: "잔잔함",
        playlistButtonTextPreColored: "잔잔한",
        playlistButtonTextPost: "하루의 음악",
        color: "#e0e0e0", // --color-emotion-calm
    },
    uncomfortable: {
        key: "uncomfortable",
        label: "불편함",
        playlistButtonTextPreColored: "불편한",
        playlistButtonTextPost: "마음을 씻는 음악",
        color: "#8fc1a9", // --color-emotion-uncomfortable
    },
};
