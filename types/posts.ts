export interface IPostsResponse {
  count: number;
  next: number;
  previous: number;
  results: IPost[];
}

export interface IPost {
  id: number;
  author: string;
  image_url: string;
  comments: number[];
  likes: number[];
  liked_by: string[];
  caption: string;
  created_on: string;
  public: boolean;
  user: number;
}
