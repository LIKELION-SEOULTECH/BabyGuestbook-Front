import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import MiniPlayer from "../MiniPlayer";
import { PlayerContext, PlayerContextType } from "@/contexts/PlayerContext";

const mockPlayerContext: PlayerContextType = {
    currentVideo: {
        id: "X1Yv9DPhIdM",
        title: "커피도 분위기도 완벽한 하루 ☕",
        emotion: "happy",
    },
    setCurrentVideo: vi.fn(),
    isPlaying: true,
    setIsPlaying: vi.fn(),
    volume: [70],
    setVolume: vi.fn(),
    isMiniPlayerVisible: true,
    setIsMiniPlayerVisible: vi.fn(),
    isDrawerOpen: false,
    setIsDrawerOpen: vi.fn(),
    curatePlaylistByEmotion: vi.fn(),
};

const renderWithPlayerContext = (
    ui: React.ReactElement,
    contextValue = mockPlayerContext
) => {
    return render(
        <PlayerContext.Provider value={contextValue}>
            {ui}
        </PlayerContext.Provider>
    );
};

describe("MiniPlayer Test", () => {
    it("영상 제목 표시되는 지", () => {
        renderWithPlayerContext(<MiniPlayer />);
        expect(
            screen.getByText(/커피도 분위기도 완벽한 하루 ☕/i)
        ).toBeInTheDocument();
    });

    it("재생/일시정지 버튼 작동 여부", () => {
        renderWithPlayerContext(<MiniPlayer />);
        // isPlaying이 true인 상태이므로 "Pause" 가 나ㅗ와야함
        const playPauseButton = screen.getByRole("button", {
            name: /일시정지/i,
        });
        fireEvent.click(playPauseButton);
        expect(mockPlayerContext.setIsPlaying).toHaveBeenCalled();
    });

    it("MiniPlayer Visibility 확인", () => {
        const customContext = {
            ...mockPlayerContext,
            isMiniPlayerVisible: false,
        };
        renderWithPlayerContext(<MiniPlayer />, customContext);
        expect(
            screen.queryByText(/커피도 분위기도 완벽한 하루 ☕/i)
        ).toBeNull();
    });

    it("MiniPlayer 드로어 토글 작동 여부", () => {
        renderWithPlayerContext(<MiniPlayer />);
        const toggleElement = screen.getByText(/happy/i); // 감정 텍스트 뜨는지도 확인
        fireEvent.click(toggleElement);
        expect(mockPlayerContext.setIsDrawerOpen).toHaveBeenCalled();
    });
});
