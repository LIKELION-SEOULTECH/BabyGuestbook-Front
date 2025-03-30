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
        const playerRef = useRef<HTMLDivElement>(null);
        const ytPlayerRef = useRef<any>(null);
        const playerReadyRef = useRef<boolean>(false);

        useEffect(() => {
            if (!document.getElementById("youtube-api-script")) {
                const tag = document.createElement("script");
                tag.id = "youtube-api-script";
                tag.src = "https://www.youtube.com/iframe_api";
                const firstScriptTag = document.querySelector("script");
                firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
            }
            return () => {
                playerReadyRef.current = false;
            };
        }, []);

        useEffect(() => {
            const initializePlayer = () => {
                if (playerRef.current && !ytPlayerRef.current) {
                    ytPlayerRef.current = new window.YT.Player(
                        playerRef.current,
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
                                    playerReadyRef.current = true;
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
                                        } catch (e) {
                                            console.error(
                                                "YouTube player loop error:",
                                                e
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

            if (window.YT && window.YT.Player) {
                initializePlayer();
            } else {
                window.onYouTubeIframeAPIReady = initializePlayer;
            }
            return () => {
                window.onYouTubeIframeAPIReady = null;
            };
        }, [vodKey]);

        useEffect(() => {
            if (ytPlayerRef.current && playerReadyRef.current) {
                try {
                    isPlaying
                        ? ytPlayerRef.current.playVideo()
                        : ytPlayerRef.current.pauseVideo();
                } catch (e) {
                    console.error("YouTube player method error:", e);
                }
            }
        }, [isPlaying]);

        useEffect(() => {
            if (ytPlayerRef.current && playerReadyRef.current) {
                try {
                    ytPlayerRef.current.setVolume(volume[0]);
                } catch (e) {
                    console.error("YouTube player volume error:", e);
                }
            }
        }, [volume]);

        useImperativeHandle(ref, () => ({
            skipForward: () => {
                if (ytPlayerRef.current && playerReadyRef.current) {
                    try {
                        const currentTime =
                            ytPlayerRef.current.getCurrentTime();
                        ytPlayerRef.current.seekTo(currentTime + 10, true);
                    } catch (e) {
                        console.error("YouTube player skip forward error:", e);
                    }
                }
            },
            skipBackward: () => {
                if (ytPlayerRef.current && playerReadyRef.current) {
                    try {
                        const currentTime =
                            ytPlayerRef.current.getCurrentTime();
                        const newTime = Math.max(currentTime - 10, 0);
                        ytPlayerRef.current.seekTo(newTime, true);
                    } catch (e) {
                        console.error("YouTube player skip backward error:", e);
                    }
                }
            },
        }));

        return <div ref={playerRef} id="player" className="w-full h-full" />;
    }
);

export default YouTubePlayer;
