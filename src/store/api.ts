import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookRequest {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description?: string;
  copies: number;
}

export interface BorrowRequest {
  bookId: string;
  quantity: number;
  dueDate: string;
}

export interface BorrowSummary {
  bookId: string;
  title: string;
  isbn: string;
  totalQuantityBorrowed: number;
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api',
  }),
  tagTypes: ['Book', 'BorrowSummary'],
  endpoints: (builder) => ({
    // Books
    getBooks: builder.query<Book[], void>({
      query: () => '/books',
      providesTags: ['Book'],
    }),
    getBook: builder.query<Book, string>({
      query: (id) => `/books/${id}`,
      providesTags: ['Book'],
    }),
    createBook: builder.mutation<Book, CreateBookRequest>({
      query: (book) => ({
        url: '/books',
        method: 'POST',
        body: book,
      }),
      invalidatesTags: ['Book'],
    }),
    updateBook: builder.mutation<Book, { id: string; book: Partial<CreateBookRequest> }>({
      query: ({ id, book }) => ({
        url: `/books/${id}`,
        method: 'PUT',
        body: book,
      }),
      invalidatesTags: ['Book'],
    }),
    deleteBook: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Book'],
    }),
    // Borrow
    borrowBook: builder.mutation<any, BorrowRequest>({
      query: (borrow) => ({
        url: '/borrow',
        method: 'POST',
        body: borrow,
      }),
      invalidatesTags: ['Book', 'BorrowSummary'],
    }),
    getBorrowSummary: builder.query<BorrowSummary[], void>({
      query: () => '/borrow-summary',
      providesTags: ['BorrowSummary'],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useBorrowBookMutation,
  useGetBorrowSummaryQuery,
} = api;