// Id
// 6~12자의 영문, 숫자, 언더바_ 만 가능
export const validateId = (id: string) => {
  if (id.length < 6 || id.length > 12) {
    return false;
  }
  return /^[A-Za-z0-9_]+$/.test(id);
};

// Password
// 8-20자 이내 숫자, 특수문자, 영문자 중 2가지 이상을 조합한 경우
export const validatePassword = (password: string) => {
  if (password.length < 8 || password.length > 20) {
    return false;
  }
  let count = 0;
  if (/[0-9]/.test(password)) {
    count += 1;
  }
  if (/[A-Za-z]/.test(password)) {
    count += 1;
  }
  if (/[\W_]/.test(password)) {
    count += 1;
  }
  return count >= 2;
};

// phoneNumber
// - 를 제외한 숫자만 입력 가능
export const validatePhoneNumber = (phoneNumber: string) => {
  if (phoneNumber.length < 11 || phoneNumber.length > 11) {
    return false;
  }
  return /^[0-9]+$/.test(phoneNumber.replace(/-/g, ""));
};

// Birthdate
// 주민번호 앞자리 6자리만 가능하게 (yyMMdd로)
export const validateBirthDate = (birthDate: string) => {
  // 6자리의 숫자
  if (!/^[0-9]{6}$/.test(birthDate)) {
    return false;
  }

  const month = parseInt(birthDate.substring(2, 4), 10);
  const day = parseInt(birthDate.substring(4, 6), 10);

  if (month < 1 || month > 12) {
    return false;
  }

  if (day < 1 || day > 31) {
    return false;
  }

  return true;
};

export type InputType = "id" | "password" | "phoneNumber" | "birthDate";

export const validateInputValue = (type: InputType, value: string) => {
  switch (type) {
    case "id":
      return validateId(value);
    case "password":
      return validatePassword(value);
    case "phoneNumber":
      return validatePhoneNumber(value);
    case "birthDate":
      return validateBirthDate(value);
    default:
      return false;
  }
};
