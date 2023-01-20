import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
interface Post {
  id: string;
  title: string;
  body: string;
}
interface Comment {
  postId: number;
  name: string;
  email: string;
  body: string;
}
type PostsResponse = Post[];

interface PostCurrent {
  id: string;
  title: string;
  body: string;
  comments: any[];
}

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://blog-api-t6u0.onrender.com",
  }),
  tagTypes: ["Posts"],
  endpoints: (build) => ({
    getPosts: build.query<PostsResponse, void>({
      query: () => "/posts",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Posts" as const, id })),
              { type: "Posts", id: "LIST" },
            ]
          : [{ type: "Posts", id: "LIST" }],
    }),
    getCurrentPost: build.query<PostCurrent, number>({
      query: (id) => `/posts/${id}?_embed=comments`,
    }),
    changeCurrentPost: build.mutation<
      PostCurrent,
      { id: number; title: string; body: string }
    >({
      query: ({ id, title, body }) => ({
        url: `/posts/${id}`,
        method: "PUT",
        body: { id: id, title: title, body: body },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Posts", id }],
    }),
    deletePost: build.mutation<PostCurrent, { id: string }>({
      query: ({ id }) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Posts", id }],
    }),
    addComment: build.mutation<
      Comment,
      { postId: number; name: string; email: string; body: string }
    >({
      query: ({ postId, name, email, body }) => ({
        url: `/comments`,
        method: "POST",
        body: {
          postId: postId,
          name: name,
          email: email,
          body: body,
        },
      }),
    }),
  }),
});
export const {
  useGetPostsQuery,
  useGetCurrentPostQuery,
  useChangeCurrentPostMutation,
  useDeletePostMutation,
  useAddCommentMutation,
} = api;
