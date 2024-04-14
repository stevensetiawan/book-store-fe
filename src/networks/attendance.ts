export async function fetchAttendances(params: { token?: string | null }, signal?: AbortSignal) {
  const { token } = params;
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/book-store/order`);

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
