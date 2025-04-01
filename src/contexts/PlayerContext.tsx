import React, { createContext, useContext, useState, useMemo } from "react";
import { emotionConfigs } from "@/constants/emotion";
import {
    emotionVideoMapping,
    VideoEntryWithEmotion,
} from "@/constants/emotionVideos";

export interface PlayerContextType {
    currentVideo: VideoEntryWithEmotion | null;
    setCurrentVideo: React.Dispatch<
        React.SetStateAction<VideoEntryWithEmotion | null>
    >;
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

export const PlayerContext = createContext<PlayerContextType | undefined>(
    undefined
);

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentVideo, setCurrentVideo] =
        useState<VideoEntryWithEmotion | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [volume, setVolume] = useState<number[]>([70]);
    const [isMiniPlayerVisible, setIsMiniPlayerVisible] =
        useState<boolean>(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

    const curatePlaylistByEmotion = (emotion: keyof typeof emotionConfigs) => {
        const videoIds = emotionVideoMapping[emotion];
        if (!videoIds || videoIds.length === 0) {
            console.warn(`${emotion}에 대한 video id가 없습니다.`);
            return;
        }

        // Suffle
        const shuffledVideoIds = [...videoIds].sort(() => Math.random() - 0.5);
        const curatedPlaylist: VideoEntryWithEmotion[] = shuffledVideoIds.map(
            (video) => ({
                id: video.id,
                title: video.title,
                emotion,
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
