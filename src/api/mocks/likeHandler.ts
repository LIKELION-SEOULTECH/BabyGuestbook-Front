import { http, HttpResponse } from "msw";

export const likeHandlers = [
    // ♡ 좋아요 등록
    http.post("/api/v1/posts/:postId/like", ({ params }) => {
        const { postId } = params;

        return HttpResponse.json({
            code: "SUCCESS",
            statusCode: 200,
            message: `Post ${postId} liked.`,
            data: null,
        });
    }),

    // ♡ 좋아요 취소
    http.delete("/api/v1/posts/:postId/like", ({ params }) => {
        const { postId } = params;

        return HttpResponse.json({
            code: "SUCCESS",
            statusCode: 200,
            message: `Post ${postId} unliked.`,
            data: null,
        });
    }),
];
