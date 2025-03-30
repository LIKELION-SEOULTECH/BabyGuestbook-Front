export function formatRelativeDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    // 1분 미만인 경우
    if (diffSeconds < 60) {
        return "방금 전";
    }
    // 1시간 미만인 경우 (분 단위)
    if (diffMinutes < 60) {
        return `${diffMinutes}분 전`;
    }
    // 24시간 미만인 경우 (시간 단위)
    if (diffHours < 24) {
        return `${diffHours}시간 전`;
    }
    // 하루 차이인 경우
    if (diffDays === 1) {
        return "하루 전";
    }
    // 7일 미만인 경우 (일 단위)
    if (diffDays < 7) {
        return `${diffDays}일 전`;
    }

    // 7일 이상인 경우, 같은 해라면 "월 일" 형식, 다른 해라면 "연도 월 일" 형식으로 반환
    const currentYear = now.getFullYear();
    const dateYear = date.getFullYear();
    const month = date.getMonth() + 1; // 0이 1월
    const day = date.getDate();

    if (currentYear === dateYear) {
        return `${month}월 ${day}일`;
    } else {
        return `${dateYear}년 ${month}월 ${day}일`;
    }
}
