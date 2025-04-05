import { HttpResponse, http } from "msw";
import { CommentDTO, CommentResponse } from "@/types/comment";
import { CreateCommentRequest, DeleteCommentRequest } from "@/types/comment";

const commentsDB: CommentDTO[] = [
    {
        commentId: 1,
        content: "안뇽하세여",
        user: {
            userId: 101,
            username: "어린이사자",
        },
        updatedAt: new Date().toISOString(),
    },
    {
        commentId: 2,
        content: "저녁뭐먹지요",
        user: {
            userId: 102,
            username: "꼬맹이사자",
        },
        updatedAt: new Date().toISOString(),
    },
];

const commentPasswords: Record<number, string> = {
    1: "1234",
    2: "abcd",
};

export const commentHandlers = [
    // 댓글 조회
    http.get<never, CommentResponse>("/api/v1/posts/:postId/comments", ({ params, request }) => {
        const { postId } = params;

        return HttpResponse.json<CommentResponse>({
            code: "SUCCESS",
            statusCode: 200,
            message: `댓글 조회 성공, postId: ${postId}`,
            data: commentsDB,
        });
    }),

    // 댓글 생성
    http.post("/api/v1/posts/:postId/comments", async ({ request }) => {
        const body = await request.json() as CreateCommentRequest;
        const newComment: CommentDTO = {
            commentId: commentsDB.length + 1,
            content: body.content,
            user: {
                userId: Math.floor(Math.random() * 10000),
                username: body.username || "익명",
            },
            updatedAt: new Date().toISOString(),
        };

        commentsDB.unshift(newComment);
        commentPasswords[newComment.commentId] = body.password || "";

        return HttpResponse.json({
            code: "SUCCESS",
            statusCode: 201,
            message: "댓글 생성 완료",
            data: newComment,
        });
    }),

    // 댓글 삭제
    http.delete("/api/v1/posts/:postId/comments/:commentId", async ({ params, request }) => {
        const postId = Number(params.postId);
        const commentId = Number(params.commentId);
        const url = new URL(request.url);
        const password = url.searchParams.get("password");

        const index = commentsDB.findIndex((c) => c.commentId === commentId);
        const savedPassword = commentPasswords[commentId];

        if (index === -1) {
            return HttpResponse.json(
                {
                    code: "FAILURE",
                    statusCode: 404,
                    message: "댓글이 존재하지 않습니다.",
                    data: null,
                },
                { status: 404 }
            );
        }

        if (password !== savedPassword) {
            return HttpResponse.json(
                {
                    code: "FAILURE",
                    statusCode: 403,
                    message: "비밀번호가 일치하지 않습니다.",
                    data: null,
                },
                { status: 403 }
            );
        }

        commentsDB.splice(index, 1);
        delete commentPasswords[commentId];

        return HttpResponse.json({
            code: "SUCCESS",
            statusCode: 200,
            message: "댓글 삭제 완료",
            data: null,
        });
    }),
];
