import { emotionConfigs } from "@/constants/emotion";
import React, { createContext, useContext, useState, useMemo } from "react";

export interface Video {
    id: string;
    title: string;
}

export interface PlayerContextType {
    currentVideo: Video | null;
    setCurrentVideo: React.Dispatch<React.SetStateAction<Video | null>>;
    isPlaying: boolean;
    setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
    volume: number[];
    setVolume: React.Dispatch<React.SetStateAction<number[]>>;
    isMiniPlayerVisible: boolean;
    setIsMiniPlayerVisible: React.Dispatch<React.SetStateAction<boolean>>;
    isDrawerOpen: boolean;
    setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
    curatePlaylistByEmotion: (emotion: keyof typeof emotionConfigs) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [volume, setVolume] = useState<number[]>([70]);
    const [isMiniPlayerVisible, setIsMiniPlayerVisible] =
        useState<boolean>(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

    // 임시!
    const emotionVideoMapping: Record<keyof typeof emotionConfigs, string[]> = {
        happy: ["X1Yv9DPhIdM"],
        sad: ["hAAixJ8lux8"],
        angry: ["7ID5N1dvcNk"],
        surprised: ["wI00QO2A2j4"],
        fear: ["dcDmiUuQb6o"],
        calm: ["4eheUvD7tfg"],
        uncomfortable: ["UdUkMDCdG58"],
    };

    const curatePlaylistByEmotion = (emotion: keyof typeof emotionConfigs) => {
        const videoIds = emotionVideoMapping[emotion];
        if (!videoIds || videoIds.length === 0) {
            console.warn(`${emotion}에 대한 video id가 없습니다.`);
            return;
        }

        // Suffle
        const shuffledVideoIds = [...videoIds].sort(() => Math.random() - 0.5);
        const curatedPlaylist: Video[] = shuffledVideoIds.map(
            (videoId, index) => ({
                id: videoId,
                title: `${emotion} Video ${index + 1}`,
            })
        );

        setIsMiniPlayerVisible(true);
        setCurrentVideo(curatedPlaylist[0]);
        setIsPlaying(true);
    };

    const contextValue = useMemo(
        () => ({
            currentVideo,
            setCurrentVideo,
            isPlaying,
            setIsPlaying,
            volume,
            setVolume,
            isMiniPlayerVisible,
            setIsMiniPlayerVisible,
            isDrawerOpen,
            setIsDrawerOpen,
            curatePlaylistByEmotion,
        }),
        [currentVideo, isPlaying, volume, isMiniPlayerVisible, isDrawerOpen]
    );

    return (
        <PlayerContext.Provider value={contextValue}>
            {children}
        </PlayerContext.Provider>
    );
};

export const usePlayer = () => {
    const context = useContext(PlayerContext);
    if (!context) {
        throw new Error("Provider가 어디갔나요?;;");
    }
    return context;
};
