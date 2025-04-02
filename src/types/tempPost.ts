// src/types/tempPost.ts
import { CommentDTO } from "./comment";

/**
 * 글쓰기 모달에서 사용하는 임시 Post 타입 (작성 후 목록에 추가용)
 */
export interface TempPost {
  postId: number;
  content: string;
  password: string;
  comments: CommentDTO[];
  createdAt: string;
}
