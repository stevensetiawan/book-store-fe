export interface Employee {
  id: number;
  name: string;
  email: string;
  emp_photo: string;
  position: string;
  phone: string;
  password: string;
  created_at: string;
  updated_at: string;
}

export interface Book {
  id: number;
  title: string;
  writer: string;
  cover_image: string;
  point: number;
  tags: string[];
  created_at: Date;
  quantity? : number;
}

export interface EmployeeParams {
  id?: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  password: string;
  image?: File | null | string;
  panel?: string;
}

export interface Token {
  token?: string;
}

export interface PageParams {
  page: number
}

export interface BooksState {
  books: Book[];
  page: number;
  hasMore: boolean;
  loading: boolean;
  error: string | null;
}

