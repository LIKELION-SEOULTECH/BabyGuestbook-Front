import { HttpResponse, http } from "msw";
import { CommentDTO, CommentResponse } from "@/types/comment";
import { CreateCommentRequest, DeleteCommentRequest } from "@/types/comment";

const commentsDB: CommentDTO[] = [
    {
        commentId: 1,
        content: "그냥 그렇다.",
        username: "사용자A",
        updatedAt: "2025-04-05T16:48:00",
    },
    {
        commentId: 2,
        content: "의미없는 말.",
        username: "사용자B",
        updatedAt: "2025-04-05T16:38:00",
    },
    {
        commentId: 3,
        content: "뭐랄까...",
        username: "사용자C",
        updatedAt: "2025-04-05T16:28:00",
    },
    {
        commentId: 4,
        content: "헛소리 중 하나이다.",
        username: "사용자D",
        updatedAt: "2025-04-05T15:58:00",
    },
    {
        commentId: 5,
        content: "그냥 웃기기만 하다.",
        username: "사용자E",
        updatedAt: "2025-04-05T14:58:00",
    },
    {
        commentId: 6,
        content: "아무 의미가 없다.",
        username: "사용자F",
        updatedAt: "2025-04-05T13:58:00",
    },
    {
        commentId: 7,
        content: "말이 필요 없다.",
        username: "사용자G",
        updatedAt: "2025-04-04T16:58:00",
    },
    {
        commentId: 8,
        content: "생각 없이 쓴 댓글이다.",
        username: "사용자H",
        updatedAt: "2025-04-03T16:58:00",
    },
    {
        commentId: 9,
        content: "그냥 지나가는 말이다.",
        username: "사용자I",
        updatedAt: "2025-04-01T16:58:00",
    },
    {
        commentId: 10,
        content: "의미를 찾기 어렵다.",
        username: "사용자J",
        updatedAt: "2025-03-31T16:58:00",
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
            username: "익명",
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
        const commentId = Number(params.commentId);
        const body = await request.json() as DeleteCommentRequest;

        console.log(body)

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

        if (body.password !== savedPassword) {
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
