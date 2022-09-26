import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { User } from '../types/User';
import type { Todo } from '../types/Todo';
import type { Post } from '../types/Post';
import type { UserComment } from '../types/UserComment';
import { TOKEN_API } from '../env.local';

type UsersResponse = {
  list: User[];
  totalItems: number;
};

type TodosResponse = {
  list: Todo[];
  totalItems: number;
  nextPage: string;
}

type PostsResponse = {
  list: Post[],
  totalItems: number;
  nextPage: string;
}

type CommentsResponse = {
  list: UserComment[];
  totalItems: number;
  nextPage: string;
}

const baseUrl = 'https://gorest.co.in/public/v2';


export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${TOKEN_API}`)
      return headers
    }
  }),
  endpoints: builder => ({
    getSliceUsers: builder.query<UsersResponse, {page: number, search: string}>({
      query: (query) => {
        let url = `users?page=${query.page}`;

        if (query.search) {
          url += `&name=${query.search}`
        }
        return { url }
      },
      transformResponse: (apiResponse: User[], meta) => ({
        list: apiResponse,
        totalItems: Number(meta?.response?.headers.get('X-Pagination-Total') || '1')
      }),
    }),
    deleteUser: builder.mutation<{ data: any }, number>({
      query(id) {
        return {
          url: `users/${id}`,
          method: 'DELETE',
        }
      }
    }),
    getTodosUser: builder.query<TodosResponse, { page: number, id: number} >({
      query: (query) => ({ url: `users/${query.id}/todos?page=${query.page}` }),
      transformResponse: (apiResponse: Todo[], meta) => ({
        list: apiResponse,
        totalItems: Number(meta?.response?.headers.get('X-Pagination-Total') || '1'),
        nextPage: meta?.response?.headers.get('x-links-next') || ''
      })
    }),
    getPostsUser: builder.query<PostsResponse, { page: number, id: number}>({
      query: (query) => ({ url: `users/${query.id}/posts?page=${query.page}` }),
      transformResponse: (apiResponse: Post[], meta) => ({
        list: apiResponse,
        totalItems: Number(meta?.response?.headers.get('X-Pagination-Total') || '1'),
        nextPage: meta?.response?.headers.get('x-links-next') || ''
      })
    }),
    getCommentByPostUser: builder.query<CommentsResponse, { page: number, id: number}>({
      query: (query) => ({ url: `posts/${query.id}/comments?page=${query.page}` }),
      transformResponse: (apiResponse: UserComment[], meta) => ({
        list: apiResponse,
        totalItems: Number(meta?.response?.headers.get('X-Pagination-Total') || '1'),
        nextPage: meta?.response?.headers.get('x-links-next') || ''
      })
    }),
    createUser: builder.mutation<User, Partial<User>>({
      query(body) {
        return {
          url: `users/`,
          method: 'POST',
          body,
        }
      }
    }),
    updateUser: builder.mutation<void, Pick<User, 'id'> & Partial<User>>({
      query({id, ...patch}) {
        return {
          url: `users/${id}`,
          method: 'PUT',
          body: patch,
        }
      }
    })
  })
})

export const {
  useGetSliceUsersQuery,
  useDeleteUserMutation,
  useGetTodosUserQuery,
  useGetPostsUserQuery,
  useGetCommentByPostUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
} = usersApi;