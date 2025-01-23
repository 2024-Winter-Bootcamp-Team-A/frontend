export const saveBook = async (bookUrl: string) => {
  const API_URL = 'http://localhost:8000/api/v1/books/gpt';

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ book_url: bookUrl }),
    });

    // 응답 로그 출력
    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);

    const text = await response.text(); // JSON이 아닌 일반 텍스트로 파싱
    console.log('Raw response:', text);

    if (!response.ok) {
      throw new Error('책 저장에 실패하였습니다. 상태 코드: ' + response.status);
    }

    const result = JSON.parse(text); // JSON 파싱 시도
    return result;
  } catch (error: any) {
    console.error('saveBook에서 오류 발생:', error);
    throw new Error(error.message || '책 저장 중 네트워크 오류가 발생했습니다.');
  }
};

export const makeShorts = async (bookId: number) => {
  // book_id에서 bookId로 수정
  const API_URL = 'http://localhost:8000/api/v1/shorts/dalle';

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ book: bookId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || '숏츠 생성에 실패하였습니다.');
    }
    const result = await response.json();

    return result;
  } catch (error: any) {
    throw new Error(error.message || '숏츠 생성 중 네트워크 오류가 발생했습니다.');
  }
};

export const MakeShorts = async (bookUrl: string) => {
  try {
    const bookResult = await saveBook(bookUrl);

    if (!bookResult.success || !bookResult.data || !bookResult.data.id) {
      throw new Error('책 저장에 실패했거나, book_id를 찾을 수 없습니다.');
    }

    const bookId = bookResult.data.id;
    const shortsResult = await makeShorts(bookId);

    return { book: bookResult, shorts: shortsResult };
  } catch (error) {
    // 오류를 여기서 처리하거나, 필요하다면 다시 던집니다.
    console.error('MakeShorts에서 오류 발생:', error);
    throw error; // 또는 사용자에게 보여줄 오류 메시지를 생성하여 throw
  }
};
