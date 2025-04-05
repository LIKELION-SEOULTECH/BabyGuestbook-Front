import {
    fetchPosts,
    fetchInfinitePosts,
    updatePost,
    deletePost,
    createPost,
} from "@/api/post";
import {
    useInfiniteQuery,
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import type {
    Emotion,
    Order,
    ReadPostParameter,
    CreatePostRequest,
    UpdatePostRequest,
    DeletePostRequest,
} from "@/types/post";

// 방명록 가져오기, 무한 스크롤
export const usePostsInfiniteQuery = (params: {
    order: Order;
    emotion?: Emotion;
    pageSize?: number;
}) => {
    const initialParams: Omit<ReadPostParameter, "lastPostId"> = {
        order: params.order,
        emotion: params.emotion,
        pageSize: params.pageSize || 10,
    };

    return useInfiniteQuery({
        queryKey: [
            "infinitePosts",
            params.emotion,
            params.order,
            params.pageSize,
        ],

        queryFn: ({ pageParam }) => fetchInfinitePosts(pageParam),
        initialPageParam: initialParams,
        getNextPageParam: (lastPage, pages) => {
            // 마지막 postId를 가져와서 다음 페이지의 lastPostId로 사용
            const lastPost = lastPage.data[lastPage.data.length - 1];

            // post data 배열의 길이가 0이면 더이상 가져올 포스트가 없으므로 undefined 리턴
            if (!lastPost || lastPage.data.length === 0) {
                return undefined;
            }

            // ReadPostParameter 타입을 정확히 사용
            const nextPageParam: ReadPostParameter = {
                order: initialParams.order,
                emotion: initialParams.emotion,
                pageSize: initialParams.pageSize,
                lastPostId: lastPost.postId,
            };

            return nextPageParam;
        },

        gcTime: 5 * 60 * 1000, // 5분 동안 캐시 유지
    });
};

// 방명록 생성하기
export const useCreatePostMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (params: CreatePostRequest) => createPost(params),
        onSuccess: () => {
            // 쿼리 캐시 무효화하여 새로운 데이터 가져오기
            queryClient.removeQueries({
                queryKey: ["infinitePosts"],
                exact: false,
            });
        },
        // onSuccess: (newPost) => {
        //     // 기존의 invalidateQueries 대신 새로운 데이터를 캐시에 직접 추가
        //     queryClient.setQueryData(["infinitePosts"], (oldData: any) => {
        //         if (!oldData) return oldData;

        //         // 첫 페이지에 새 포스트 추가
        //         const newPages = [...oldData.pages];
        //         if (newPages[0]) {
        //             newPages[0] = {
        //                 ...newPages[0],
        //                 data: [newPost.data[0], ...newPages[0].data],
        //             };
        //         }

        //         return {
        //             ...oldData,
        //             pages: newPages,
        //         };
        //     });
        // },
        onError: (error) => {
            console.error("Error creating post", error);
        },
    });
};

// 방명록 수정하기
export const useUpdatePostMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (params: { postId: number } & UpdatePostRequest) =>
            updatePost(params.postId, {
                password: params.password,
                content: params.content,
            }),
        onSuccess: () => {
            // 쿼리 캐시 무효화하여 새로운 데이터 가져오기
            queryClient.removeQueries({
                queryKey: ["infinitePosts"],
                exact: false,
            });
        },
        // onSuccess: (updatedPost, variables) => {
        //     queryClient.setQueryData(["infinitePosts"], (oldData: any) => {
        //         if (!oldData) return oldData;
        //         // 모든 페이지에서 수정된 포스트를 찾아 업데이트
        //         const newPages = oldData.pages.map((page: any) => ({
        //             ...page,
        //             data: page.data.map((post: any) =>
        //                 post.postId === variables.postId
        //                     ? updatedPost.data[0]
        //                     : post
        //             ),
        //         }));
        //         return {
        //             ...oldData,
        //             pages: newPages,
        //         };
        //     });
        // },
        onError: (error) => {
            console.error("Error updating post", error);
        },
    });
};

// 방명록 삭제하기
export const useDeletePostMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (params: { postId: number } & DeletePostRequest) =>
            deletePost(params.postId, {
                password: params.password,
            }),
        onSuccess: () => {
            // 쿼리 캐시 무효화하여 새로운 데이터 가져오기
            queryClient.removeQueries({
                queryKey: ["infinitePosts"],
                exact: false,
            });
        },
        // onSuccess: (_, variables) => {
        //     queryClient.setQueryData(["infinitePosts"], (oldData: any) => {
        //         if (!oldData) return oldData;

        //         // 모든 페이지에서 삭제된 포스트를 필터링하여 제거
        //         const newPages = oldData.pages.map((page: any) => ({
        //             ...page,
        //             data: page.data.filter(
        //                 (post: any) => post.postId !== variables.postId
        //             ),
        //         }));

        //         // 빈 페이지 제거 (선택사항)
        //         const nonEmptyPages = newPages.filter(
        //             (page: any) => page.data.length > 0
        //         );

        //         return {
        //             ...oldData,
        //             pages: nonEmptyPages,
        //         };
        //     });
        // },
        onError: (error) => {
            console.error("Error deleting post", error);
        },
    });
};
