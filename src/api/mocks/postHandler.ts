import { http, HttpResponse } from "msw";
import type {
    PostDTO,
    CreatePostRequest,
    UpdatePostRequest,
    PostResponse,
    ReadPostParameter,
    Emotion,
    Order,
} from "@/types/post";
import { mockGuestbookItems } from "@/constants/mockData";
// Mock DB
let mockPosts: PostDTO[] = mockGuestbookItems;

// 임시 비밀번호 매핑(postID -> 비밀번호)
const mockPasswordMap: Record<number, string> = {
    1: "1234",
    2: "abcd",
};

export const postHandlers = [
    // 📥 방명록 작성
    http.post("/api/v1/posts/post", async ({ request }) => {
        const body = (await request.json()) as CreatePostRequest;

        const newPostId = Math.floor(Math.random() * 100000);

        const newPost: PostDTO = {
            postId: newPostId,
            content: body.content,
            emotion: "HAPPY",
            user: {
                userId: Math.floor(Math.random() * 1000),
                username: body.username || "익명",
            },
            updatedAt: new Date().toISOString(),
            likeCnt: 0,
            commentCnt: 0,
        };

        mockPosts.unshift(newPost);
        if (body.password) {
            mockPasswordMap[newPostId] = body.password;
        }

        return HttpResponse.json<PostResponse>({
            code: "SUCCESS",
            statusCode: 201,
            message: "방명록 작성 완료",
            data: [newPost],
        });
    }),

    // 📖 방명록 조회
    http.get("/api/v1/posts", async ({ request }) => {
        const url = new URL(request.url);
        const params: ReadPostParameter = {
            order: url.searchParams.get("order") as Order,
            emotion: url.searchParams.get("emotion") as Emotion | undefined,
            pageSize: Number(url.searchParams.get("pageSize")),
            lastPostId: url.searchParams.get("lastPostId")
                ? Number(url.searchParams.get("lastPostId"))
                : undefined,
        };

        let filtered = [...mockPosts];

        if (params.emotion) {
            filtered = filtered.filter((p) => p.emotion === params.emotion);
        }

        if (params.order === "COMMENT") {
            filtered.sort((a, b) => b.commentCnt - a.commentCnt);
        } else {
            filtered.sort((a, b) => b.postId - a.postId);
        }

        if (params.lastPostId) {
            filtered = filtered.filter((p) => p.postId < params.lastPostId!);
        }

        const paged = filtered.slice(0, params.pageSize);
        // 1초 지연 추가
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return HttpResponse.json<PostResponse>({
            code: "SUCCESS",
            statusCode: 200,
            message: "방명록 조회 성공",
            data: paged,
        });
    }),

    // 📝 방명록 수정
    http.patch("/api/v1/posts/:postId", async ({ params, request }) => {
        const postId = Number(params.postId);
        const body = (await request.json()) as UpdatePostRequest;

        const target = mockPosts.find((p) => p.postId === postId);
        const savedPassword = mockPasswordMap[postId];

        if (!target) {
            return HttpResponse.json(
                {
                    code: "NOT_FOUND",
                    statusCode: 404,
                    message: "게시글 없음",
                    data: [],
                },
                { status: 404 }
            );
        }

        if (body.password !== savedPassword) {
            return HttpResponse.json(
                {
                    code: "FORBIDDEN",
                    statusCode: 403,
                    message: "비밀번호 불일치",
                    data: [],
                },
                { status: 403 }
            );
        }

        target.content = body.content;
        target.updatedAt = new Date().toISOString();

        return HttpResponse.json({
            code: "SUCCESS",
            statusCode: 200,
            message: "수정 완료",
            data: [target],
        });
    }),

    // 🗑️ 방명록 삭제
    http.delete("/api/v1/posts/:postId", ({ params, request }) => {
        const postId = Number(params.postId);
        const url = new URL(request.url);
        const password = url.searchParams.get("password");

        const index = mockPosts.findIndex((p) => p.postId === postId);
        const savedPassword = mockPasswordMap[postId];

        if (index === -1) {
            return HttpResponse.json(
                {
                    code: "NOT_FOUND",
                    statusCode: 404,
                    message: "삭제 대상 없음",
                    data: [],
                },
                { status: 404 }
            );
        }

        if (password !== savedPassword) {
            return HttpResponse.json(
                {
                    code: "FORBIDDEN",
                    statusCode: 403,
                    message: "비밀번호 불일치",
                    data: [],
                },
                { status: 403 }
            );
        }

        mockPosts.splice(index, 1);
        delete mockPasswordMap[postId];

        return HttpResponse.json({
            code: "SUCCESS",
            statusCode: 200,
            message: "삭제 완료",
            data: [],
        });
    }),
];
