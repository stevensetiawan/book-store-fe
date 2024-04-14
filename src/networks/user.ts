import type { SignInParams } from '@/types/user';

export async function fetchSignIn(params: { data: SignInParams }, signal?: AbortSignal) {
  const { data } = params;
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/book-store/user/login`);

  const response = await fetch(`${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    signal,
  });
  const result = await response.json();

  return result;
}
