import type { Book, EmployeeParams, PageParams } from '@/types/book';
import { objectToFormData } from '@/lib/object-to-form-data';
import { Attendance, AttendanceCancel } from '@/types/attendance';

export async function fetchCreateEmployee(
  params: { data: EmployeeParams; token?: string | null },
  signal?: AbortSignal
) {
  const { data, token } = params;
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/book-store/order`);

  const payload = objectToFormData(data);

  const response = await fetch(`${url}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({books: data}),
    signal,
  });
  const result = await response.json();

  return result;
}

export async function fetchCreateOrder(
  params: { data: Book[]; token?: string | null },
  signal?: AbortSignal
) {
  const { data, token } = params;
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/book-store/order`);
  const books = objectToFormData(data);
  const transformedPayload = {
    books: data.map(book => ({
      book_id: book.id, // Assuming 'id' maps to 'book_id'
      quantity: book.quantity, // Example quantity, you need to set the quantity based on your logic
      point: book.point
    }))
  };
  const response = await fetch(`${url}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json', // Set the Content-Type header
    },
    body: JSON.stringify(transformedPayload),
    signal,
  });

  const result = await response.json();

  return result;
}

export async function fetchCancelOrder(
  params: { data: AttendanceCancel; token?: string | null },
  signal?: AbortSignal
) {
  const { data, token } = params;
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/book-store/order/${data.order_id}`);
  
  const response = await fetch(`${url}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json', // Set the Content-Type header
    },
    body: JSON.stringify(data),
    signal,
  });

  const result = await response.json();

  return result;
}

export async function fetchUpdateEmployee(
  params: { data: EmployeeParams; token?: string | null },
  signal?: AbortSignal
) {
  const { data, token } = params;
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/book-store/${data.id}`);

  delete data.id;

  const payload = objectToFormData(data);

  const response = await fetch(`${url}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: payload,
    signal,
  });

  const result = await response.json();

  return result;
}

export async function fetchDetailEmployee(params: { data: number; token?: string | null }, signal?: AbortSignal) {
  const { data, token } = params;
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/book-store/user/${data}`);
  const response = await fetch(`${url}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    signal,
  });

  const result = await response.json();

  return result;
}

export async function getBooks(page: number, token?: string | null, signal?: AbortSignal) {
  // const { token } = params;
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/book-store/book?page=${page}`);

  const response = await fetch(`${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    signal,
  });

  const result = await response.json();

  return result;
}
