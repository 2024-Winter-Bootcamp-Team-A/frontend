export const DeleteWished = async ({ bookId }: { bookId: number }) => {
  const API_URL = `http://localhost:8000/api/v1/shorts/${bookId}/wishes`;

  const response = await fetch(API_URL, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response) {
    throw new Error(`HTTP error! status: ${response}`);
  }
  const data = await response.json();
  return data;
};
