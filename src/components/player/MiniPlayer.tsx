import React, { useState, useMemo, useCallback, Suspense, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Slider } from "@/components/ui/slider";
import {
    Play,
    Pause,
    Volume2,
    X,
    RotateCcw,
    RotateCw,
    Link,
} from "lucide-react";
import YouTubePlayer, { YouTubePlayerHandles } from "./YouTubePlayer";

interface Video {
    id: string;
    title: string;
}

interface MiniPlayerProps {
    currentVideo: Video;
    isPlaying: boolean;
    setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
    volume: number[];
    setVolume: React.Dispatch<React.SetStateAction<number[]>>;
    isDrawerOpen: boolean;
    setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function MiniPlayer({
    currentVideo,
    isPlaying,
    setIsPlaying,
    volume,
    setVolume,
    isDrawerOpen,
    setIsDrawerOpen,
}: MiniPlayerProps) {
    const [isPlayerVisible, setIsPlayerVisible] = useState(true);
    const videoPlayerRef = useRef<YouTubePlayerHandles>(null);

    const handleToggleDrawer = useCallback(() => {
        setIsDrawerOpen((prev) => !prev);
    }, [setIsDrawerOpen]);

    const handlePlayPause = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation();
            setIsPlaying((prev) => !prev);
        },
        [setIsPlaying]
    );

    const handleVolumeChange = useCallback(
        (value: number[]) => {
            setVolume(value);
        },
        [setVolume]
    );

    const handleClose = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation();
            setIsPlaying(false);
            setIsPlayerVisible(false);
        },
        [setIsPlaying]
    );

    const handleYouTubeLink = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation();
            if (currentVideo?.id) {
                window.open(
                    `https://www.youtube.com/watch?v=${currentVideo.id}`,
                    "_blank"
                );
            }
        },
        [currentVideo]
    );

    const handleShowPlayer = useCallback(() => {
        setIsPlayerVisible(true);
    }, []);

    const videoPlayer = useMemo(() => {
        if (!currentVideo) return null;
        return (
            <Suspense fallback={<div>Loading...</div>}>
                <YouTubePlayer
                    ref={videoPlayerRef}
                    vodKey={currentVideo.id}
                    isPlaying={isPlaying}
                    volume={volume}
                />
            </Suspense>
        );
    }, [currentVideo, isPlaying, volume]);

    if (!isPlayerVisible) {
        return (
            <div className="fixed z-20 bottom-4 right-4">
                <Button
                    variant="secondary"
                    size="sm"
                    className="rounded-full shadow-lg"
                    onClick={handleShowPlayer}
                >
                    <Play size={20} />
                </Button>
            </div>
        );
    }

    return (
        <>
            <div
                className={`fixed transition-all duration-300 z-10 ${
                    isDrawerOpen
                        ? "bottom-48 right-4 w-1 h-1 opacity-0 pointer-events-none"
                        : "bottom-0 left-0 w-1 h-1 opacity-0 pointer-events-none"
                }`}
            >
                {videoPlayer}
            </div>

            <div
                className="fixed bottom-0 left-0 right-0 z-20 p-3 bg-surface border-t shadow-lg cursor-pointer"
                onClick={handleToggleDrawer}
            >
                <div className="container max-w-4xl mx-auto">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handlePlayPause}
                            >
                                {isPlaying ? (
                                    <Pause size={20} />
                                ) : (
                                    <Play size={20} />
                                )}
                            </Button>
                            <div>
                                <h4 className="font-medium">
                                    {currentVideo?.title || "비디오 제목"}
                                </h4>
                                <p className="text-xs text-muted-foreground">
                                    ~~감정에 어울리는 음악
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center w-32 gap-2">
                                <Volume2 size={16} />
                                <Slider
                                    value={volume}
                                    max={100}
                                    step={1}
                                    className="w-24"
                                    onValueChange={handleVolumeChange}
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleClose}
                                title="플레이어 닫기"
                            >
                                <X size={18} />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                <DrawerContent className="px-4">
                    <div className="flex flex-col items-center justify-center mt-4 mb-6">
                        <div className="h-48 mb-4 overflow-hidden bg-gray-100 rounded-md shadow-md w-80">
                            <img
                                src={`https://img.youtube.com/vi/${currentVideo?.id}/0.jpg`}
                                alt={currentVideo?.title || "비디오 썸네일"}
                                className="object-cover w-full h-full"
                            />
                        </div>

                        {/* Title  */}

                        <h4 className="mb-4">
                            {currentVideo?.title || "비디오 제목"}
                        </h4>

                        {/* Controls ⏯️ */}
                        <div className="flex flex-col items-center space-y-4 w-80">
                            <div className="flex items-center justify-between w-40">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        videoPlayerRef.current?.skipBackward();
                                    }}
                                >
                                    <RotateCcw size={16} />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handlePlayPause}
                                >
                                    {isPlaying ? (
                                        <Pause size={16} />
                                    ) : (
                                        <Play size={16} />
                                    )}
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        videoPlayerRef.current?.skipForward();
                                    }}
                                >
                                    <RotateCw size={16} />
                                </Button>
                            </div>

                            {/* Volume 🔈 */}
                            <div className="flex items-center w-full">
                                <Volume2 size={16} />
                                <Slider
                                    value={volume}
                                    max={100}
                                    step={1}
                                    className="ml-2"
                                    onValueChange={handleVolumeChange}
                                />
                            </div>

                            {/* YT Link 🔗 */}
                            <Button
                                variant="ghost"
                                className="w-full mt-2"
                                onClick={handleYouTubeLink}
                            >
                                <Link size={16} />
                                <span>YouTube에서 보기</span>
                            </Button>
                        </div>
                    </div>
                </DrawerContent>
            </Drawer>
        </>
    );
}

function MiniPlayerMock() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState([70]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const currentVideo = useMemo<Video>(
        () => ({
            id: "J4p2XZ9uCLs",
            title: "테스트 비디오",
        }),
        []
    );

    return (
        <MiniPlayer
            currentVideo={currentVideo}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            volume={volume}
            setVolume={setVolume}
            isDrawerOpen={isDrawerOpen}
            setIsDrawerOpen={setIsDrawerOpen}
        />
    );
}

export default MiniPlayerMock;
