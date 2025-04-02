import React, {
    useRef,
    useEffect,
    useImperativeHandle,
    forwardRef,
} from "react";

declare global {
    interface Window {
        YT: {
            Player: new (element: HTMLElement, options: any) => any;
        };
        onYouTubeIframeAPIReady: (() => void) | null;
    }
}

interface YouTubePlayerProps {
    vodKey: string;
    isPlaying: boolean;
    volume: number[];
}

export interface YouTubePlayerHandles {
    skipForward: () => void;
    skipBackward: () => void;
}

const YouTubePlayer = forwardRef<YouTubePlayerHandles, YouTubePlayerProps>(
    ({ vodKey, isPlaying, volume }, ref) => {
        const playerContainerRef = useRef<HTMLDivElement>(null);
        const ytPlayerInstanceRef = useRef<any>(null);
        const isPlayerReadyRef = useRef<boolean>(false);

        const initializePlayer = () => {
            if (playerContainerRef.current && !ytPlayerInstanceRef.current) {
                ytPlayerInstanceRef.current = new window.YT.Player(
                    playerContainerRef.current,
                    {
                        videoId: vodKey,
                        playerVars: {
                            origin: window.location.origin,
                            autoplay: 1,
                            mute: 0,
                            controls: 0,
                            playsinline: 1,
                            rel: 0,
                            showinfo: 0,
                            iv_load_policy: 3,
                        },
                        events: {
                            onReady: (event: any) => {
                                isPlayerReadyRef.current = true;
                                event.target.setVolume(volume[0]);
                                isPlaying
                                    ? event.target.playVideo()
                                    : event.target.pauseVideo();
                            },
                            onStateChange: (event: any) => {
                                if (event.data === 0 && isPlaying) {
                                    try {
                                        event.target.seekTo(0);
                                        event.target.playVideo();
                                    } catch (error) {
                                        console.error(
                                            "YouTube player loop error:",
                                            error
                                        );
                                    }
                                }
                            },
                            onError: (event: any) => {
                                console.error(
                                    "YouTube player error:",
                                    event.data
                                );
                            },
                        },
                    }
                );
            }
        };

        useEffect(() => {
            if (!document.getElementById("youtube-api-script")) {
                const scriptElement = document.createElement("script");
                scriptElement.id = "youtube-api-script";
                scriptElement.src = "https://www.youtube.com/iframe_api";
                const firstScriptElement = document.querySelector("script");
                firstScriptElement?.parentNode?.insertBefore(
                    scriptElement,
                    firstScriptElement
                );
            }
            return () => {
                isPlayerReadyRef.current = false;
            };
        }, []);

        // 음악 변경 시 즉시 재생함
        useEffect(() => {
            if (ytPlayerInstanceRef.current && isPlayerReadyRef.current) {
                try {
                    ytPlayerInstanceRef.current.loadVideoById(vodKey);
                } catch (error) {
                    console.error("YouTube player loadVideoById error:", error);
                }
            } else {
                if (window.YT && window.YT.Player) {
                    initializePlayer();
                } else {
                    window.onYouTubeIframeAPIReady = initializePlayer;
                }
            }
        }, [vodKey]);

        useEffect(() => {
            if (ytPlayerInstanceRef.current && isPlayerReadyRef.current) {
                try {
                    isPlaying
                        ? ytPlayerInstanceRef.current.playVideo()
                        : ytPlayerInstanceRef.current.pauseVideo();
                } catch (error) {
                    console.error("YouTube player play/pause error:", error);
                }
            }
        }, [isPlaying]);

        useEffect(() => {
            if (ytPlayerInstanceRef.current && isPlayerReadyRef.current) {
                try {
                    ytPlayerInstanceRef.current.setVolume(volume[0]);
                } catch (error) {
                    console.error("YouTube player volume error:", error);
                }
            }
        }, [volume]);

        useImperativeHandle(ref, () => ({
            skipForward: () => {
                if (ytPlayerInstanceRef.current && isPlayerReadyRef.current) {
                    try {
                        const currentTime =
                            ytPlayerInstanceRef.current.getCurrentTime();
                        ytPlayerInstanceRef.current.seekTo(
                            currentTime + 10,
                            true
                        );
                    } catch (error) {
                        console.error(
                            "YouTube player skip forward error:",
                            error
                        );
                    }
                }
            },
            skipBackward: () => {
                if (ytPlayerInstanceRef.current && isPlayerReadyRef.current) {
                    try {
                        const currentTime =
                            ytPlayerInstanceRef.current.getCurrentTime();
                        ytPlayerInstanceRef.current.seekTo(
                            Math.max(currentTime - 10, 0),
                            true
                        );
                    } catch (error) {
                        console.error(
                            "YouTube player skip backward error:",
                            error
                        );
                    }
                }
            },
        }));

        return (
            <div
                ref={playerContainerRef}
                id="youtube-player"
                className="w-full h-full"
            />
        );
    }
);

export default YouTubePlayer;
