// DB 조회하여 중복 닉네임 체크
// type : "id" or "nickname"
// value : inputValue

export const duplicateCheck = async (type: string, value: string) => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  try {
    const response = await fetch(`${BASE_URL}/api/users/duplicate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type, value }),
    });

    return await response.json();
  } catch (e) {
    console.log("error : ", e);
  }
};
