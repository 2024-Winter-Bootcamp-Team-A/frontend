const API_URL = 'http://localhost:8000/api/v1/users/signup';

export interface SignUpData {
  name: string;
  email: string;
  password: string;
  sex: string;
  age: number;
}

export const signUp = async (data: SignUpData) => {
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
      throw new Error(errorData.message || '회원가입에 실패했습니다.');
    }

    const result = await response.json();
    return result; // 성공 메시지 또는 데이터 반환
  } catch (error: any) {
    throw new Error(error.message || '네트워크 오류가 발생했습니다.');
  }
};
