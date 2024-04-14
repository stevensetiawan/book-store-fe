import { FetchState } from '@/enums/Fetch';
import { fetchCreateEmployee, fetchDetailEmployee, fetchEmployees, fetchUpdateEmployee, getBooks } from '@/networks/employee';
import type { AppState, AppThunk } from '@/redux/store';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { Employee, EmployeeParams, Book, PageParams } from '@/types/book';
import type { APIResponse } from '@/types/response';
import { any, string } from 'zod';

export interface BooksState {
  books: Book[];
  currentPage: number;
  hasMore: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: BooksState = {
  // status: FetchState.IDLE,
  books: [],
  currentPage: 1,
  hasMore: true,
  loading: false,
  error: 'Failed to fetch data',
};

export const fetchBooks = createAsyncThunk<Book[], number>(
  'books/fetchBooks',
  async (currentPage, { rejectWithValue, getState, signal }) => {
    try {
      const state = getState() as AppState;
      const token = localStorage.getItem('custom-auth-token');
      
      
      const data = await getBooks(currentPage, token , signal);
      return data as Book[];
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchBooks.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.loading = false;
      state.books.push(...action.payload);
      state.currentPage++; // Increment current page after fetching data
      state.hasMore = action.payload.length > 0;
    });
    builder.addCase(fetchBooks.rejected, (state, action) => {
      state.loading = false;
      state.error = null;
    });
  },
});

// export const { fetchBooksStart, fetchBooksSuccess, fetchBooksFailure } = booksSlice.actions;
export const selectCurrentPage = (state: AppState) => state.book.currentPage;

export default booksSlice.reducer;


