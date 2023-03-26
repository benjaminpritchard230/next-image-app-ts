export interface IComment {
  id: number;
  author: string;
  post: number;
  likes: number[];
  liked_by: number[];
  body: string;
  created_on: string;
  user: number;
}
