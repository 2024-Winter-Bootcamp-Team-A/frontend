type CommentData = {
  content: string;
};

export const AddComment = async (book_id: number, data: CommentData) => {
  const API_URL = `http://localhost:8000/api/v1/shorts/${book_id}/comments`;
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || '댓글 등록에 실패하였습니다.');
    }

    const result = await response.json();
    return result; // 성공 메시지 또는 데이터 반환
  } catch (error: any) {
    throw new Error(error.message || '네트워크 오류가 발생했습니다.');
  }
};
