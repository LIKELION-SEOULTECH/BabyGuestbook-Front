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

// 방명록 가져오기, 처음에 한번만 호출
export const usePostsQuery = (
    params: Omit<ReadPostParameter, "lastPostId">
) => {
    return useQuery({
        queryKey: ["posts", params],
        queryFn: () => fetchPosts(params),
    });
};

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
        queryKey: ["infinitePosts", initialParams],
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
    });
};

// 방명록 생성하기
export const useCreatePostMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (params: CreatePostRequest) => createPost(params),
        onSuccess: () => {
            // 쿼리 캐시 무효화하여 새로운 데이터 가져오기
            queryClient.invalidateQueries({ queryKey: ["posts"] });
            queryClient.invalidateQueries({ queryKey: ["infinitePosts"] });
        },
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
            queryClient.invalidateQueries({ queryKey: ["posts"] });
            queryClient.invalidateQueries({ queryKey: ["infinitePosts"] });
        },
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
            queryClient.invalidateQueries({ queryKey: ["posts"] });
            queryClient.invalidateQueries({ queryKey: ["infinitePosts"] });
        },
        onError: (error) => {
            console.error("Error deleting post", error);
        },
    });
};
