import { useState, useCallback } from "react";

export type GuestbookActionType = "edit" | "delete" | null;

/**
 * 방명록의 수정 및 삭제(이를 action이라 함)를 관리하는 hook입니다.
 *
 * @returns {Object} - activeAction: 현재 활성화된 action(dialog 종류), openActionDialog: action selector 역할, closeActionDialog: action 종료
 */
export default function useGuestbookAction() {
    const [activeAction, setActiveAction] = useState<GuestbookActionType>(null);

    const openActionDialog = useCallback((action: "edit" | "delete") => {
        setActiveAction(action);
    }, []);

    const closeActionDialog = useCallback(() => {
        setActiveAction(null);
    }, []);

    return { activeAction, openActionDialog, closeActionDialog };
}
