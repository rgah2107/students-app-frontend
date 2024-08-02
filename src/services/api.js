import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const studentsApi = createApi({
  reducerPath: 'studentsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: ({ page = 0, size = 5 }) => {
        return {
          url: `/students?page=${page}&size=${size}`,
        }
      },
      providesTags: ['getStudents']
    }),
    addStudent: builder.mutation({
      query: (data) => {
        return {
          url: '/students',
          method: 'POST',
          body: data,
        }
      },
      invalidatesTags: ['getStudents'],
    }),
    patchStudent: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/students/${id}`,
          method: 'PATCH',
          body: data,
        }
      },
      invalidatesTags: ['getStudents'],
    }),
    deleteStudent: builder.mutation({
      query: (id) => {
        return {
          url: `/students/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: ['getStudents'],
    }),
  }),
})

export const {
  useGetStudentsQuery,
  useAddStudentMutation,
  usePatchStudentMutation,
  useDeleteStudentMutation,
} = studentsApi
