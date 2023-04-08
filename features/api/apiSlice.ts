import type { RootState } from "@/store/store";
import { IComment } from "@/types/comments";
import { INotifications } from "@/types/notifications";
import { IPost, IPostsResponse } from "@/types/posts";
import { IUserInfo } from "@/types/userInfo";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://escooter230.pythonanywhere.com/",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Token ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Posts", "User", "Comments", "Notifications"],
  endpoints: (builder) => ({
    getPublicPosts: builder.query<IPostsResponse, string>({
      query: (page) => `posts/all?page=${page}`,
      providesTags: ["Posts"],
    }),
    getSpecificPost: builder.query<IPost, string>({
      query: (id) => `posts/${id}`,
      providesTags: ["Posts"],
    }),

    getFollowingPosts: builder.query<IPost[], void>({
      query: () => `posts/following/`,
      providesTags: ["Posts"],
    }),
    getPrivatePosts: builder.query<IPost[], void>({
      query: () => `posts/my/`,
      providesTags: ["Posts"],
    }),
    getUserPosts: builder.query<IPost[], string>({
      query: (id) => `user/${id}/posts/`,
      providesTags: ["Posts"],
    }),
    getUserInfo: builder.query<IUserInfo, string>({
      query: (id) => `user/${id}/`,
      providesTags: ["User"],
    }),
    getCurrentUserInfo: builder.query<IUserInfo, void>({
      query: () => `user/`,
      providesTags: ["User"],
    }),
    getPostComments: builder.query<IComment[], number>({
      query: (id) => `posts/${id}/comments/`,
      providesTags: ["Comments"],
    }),
    getNotifications: builder.query<INotifications, void>({
      query: () => `my_notifications/`,
      providesTags: ["Notifications"],
    }),
    like: builder.mutation({
      query: (id) => ({
        url: `posts/${id}/like/`,
        method: "PUT",
      }),
      invalidatesTags: ["Posts"],
    }),
    makePrivate: builder.mutation({
      query: (post) => ({
        url: `posts/${post.id}/`,
        method: "PUT",
        body: { caption: post.caption, public: !post.public },
      }),
      invalidatesTags: ["Posts"],
    }),
    delete: builder.mutation({
      query: (id) => ({
        url: `posts/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Posts"],
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "login/",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "register/",
        method: "POST",
        body: credentials,
      }),
    }),
    newPost: builder.mutation({
      query: (data) => ({
        url: "posts/my/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Posts"],
    }),
    editUserProfile: builder.mutation({
      query: (data) => ({
        url: "user/",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    addComment: builder.mutation({
      query: (data) => ({
        url: `posts/${data.id}/comments/add/`,
        method: "POST",
        body: data.body,
      }),
      invalidatesTags: ["Posts", "Comments"],
    }),
    deleteComment: builder.mutation({
      query: (id) => ({
        url: `comments/${id}/`,
        method: "Delete",
      }),
      invalidatesTags: ["Posts", "Comments"],
    }),
    likeComment: builder.mutation({
      query: (id) => ({
        url: `comments/${id}/like/`,
        method: "PUT",
      }),
      invalidatesTags: ["Comments"],
    }),
    followUser: builder.mutation({
      query: (id) => ({
        url: `user/${id}/follow/`,
        method: "PUT",
      }),
      invalidatesTags: ["User", "Posts"],
    }),
    markNotificationRead: builder.mutation({
      query: (id) => ({
        url: `my_notifications/${id}/`,
        method: "PATCH",
        body: { unread: false },
      }),
      invalidatesTags: ["Notifications"],
    }),
  }),
});

export const {
  useGetPublicPostsQuery,
  useGetSpecificPostQuery,
  useGetFollowingPostsQuery,
  useGetPrivatePostsQuery,
  useGetUserPostsQuery,
  useGetUserInfoQuery,
  useGetCurrentUserInfoQuery,
  useGetPostCommentsQuery,
  useGetNotificationsQuery,
  useLikeMutation,
  useMakePrivateMutation,
  useDeleteMutation,
  useLoginMutation,
  useRegisterMutation,
  useNewPostMutation,
  useEditUserProfileMutation,
  useAddCommentMutation,
  useDeleteCommentMutation,
  useLikeCommentMutation,
  useFollowUserMutation,
  useMarkNotificationReadMutation,
} = postsApi;
