// 프로필 이미지 관리
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { firebasedb } from "./firebasedb";

// Firebase Storage 초기화
const fireStorage = getStorage(firebasedb);

export const uploadProfileImage = async (
  file: File,
  userId: string,
): Promise<string> => {
  const storageRef = ref(fireStorage, `profileImages/${userId}`);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
};

export { fireStorage };
