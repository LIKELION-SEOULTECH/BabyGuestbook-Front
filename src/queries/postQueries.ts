import { deletePost, fetchPosts, updatePost } from "@/api/post";
import { useMutation, useQuery } from "@tanstack/react-query";

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
  pageSize: number;
  lastPostId: number; // 두번째 요청부터, 무한 스크롤을 위해
}) => {
  return useQuery({
    queryKey: ["posts", params],
    queryFn: () => fetchPosts(params),
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
