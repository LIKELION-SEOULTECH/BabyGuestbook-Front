import { deletePost, fetchPosts, updatePost } from "@/api/post";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";

// 방명록 가져오기, 처음에 한번만 호출
export const usePostsQuery = (params: {
  order: "LATEST" | "OLDEST";
  emotion?: string;
  pageSize: 10; // 페이지당 포스트 수
}) => {
  return useQuery({
    queryKey: ["posts", params],
    queryFn: () => fetchPosts(params),
  });
};

// 방명록 가져오기, 무한 스크롤
export const usePostsInfiniteQuery = (params: {
  order: "LATEST" | "OLDEST";
  emotion?: string;
}) => {
  return useInfiniteQuery({
    queryKey: ["posts", params],
    queryFn: ({ pageParam }) => fetchPosts(pageParam),
    initialPageParam: {
      order: params.order,
      emotion: params.emotion,
      pageSize: 10,
    },
    getNextPageParam: (lastPage, pages) => {
      // 마지막 postId를 가져와서 다음 페이지의 lastPostId로 사용
      const lastPost = lastPage.data[lastPage.data.length - 1];

      // post data 배열의 길이가 0이면 더이상 가져올 포스트가 없으므로 undefined 리턴
      if (!lastPost || lastPage.data.length === 0) {
        return undefined;
      }

      if (lastPost) {
        return {
          order: params.order,
          emotion: params.emotion,
          pageSize: 10, // 10개씩 가져오기
          lastPostId: lastPost.postId,
        };
      }
    },
  });
};

// 방명록 수정하기
export const useUpdatePostMutation = () => {
  return useMutation({
    mutationFn: (params: {
      postId: number;
      content: string;
      password: string;
    }) =>
      updatePost(params.postId, {
        password: params.password,
        content: params.content,
      }),
    onSuccess: (data) => {
      console.log("Post updated successfully", data);
    },
    onError: (error) => {
      console.error("Error updating post", error);
    },
  });
};

// 방명록 삭제하기
export const useDeletePostMutation = () => {
  return useMutation({
    mutationFn: (params: { postId: number; password: string }) =>
      deletePost(params.postId, {
        password: params.password,
      }),
    onSuccess: (data) => {
      console.log("Post deleted successfully", data);
    },
    onError: (error) => {
      console.error("Error deleting post", error);
    },
  });
};
