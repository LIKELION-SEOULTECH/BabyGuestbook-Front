import * as React from "react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EMOTIONS, EMOTION_LABELS, Emotion } from "@/constants/emotion";

export function GuestbookDropdownMenu({
    onEmotionChange,
}: {
    onEmotionChange: (emotion: Emotion) => void;
}) {
    const [selectedEmotion, setSelectedEmotion] = React.useState<Emotion>(
        EMOTIONS.ALL
    );
    const handleEmotionChange = (value: string) => {
        setSelectedEmotion(value as Emotion);
        onEmotionChange(value as Emotion);
    };
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    // className="px-4.5 py-2 bg-surface bg-clip-content rounded-full border-[0.5px] flex justify-between items-center text-sm leading-3 tracking-tight"
                >
                    {EMOTION_LABELS[selectedEmotion]}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>감정 선택</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                    value={selectedEmotion}
                    onValueChange={handleEmotionChange}
                >
                    {Object.entries(EMOTIONS).map(([key, value]) => (
                        <DropdownMenuRadioItem key={value} value={value}>
                            {EMOTION_LABELS[value]}
                        </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
