export interface IComment {
  id: number;
  author: string;
  post: number;
  likes: any[];
  liked_by: any[];
  body: string;
  created_on: string;
  user: number;
}
