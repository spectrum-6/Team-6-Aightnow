// 프로필 이미지 관리
import { getStorage } from "firebase/storage";
import { firebasedb } from "./firebasedb";

// Firebase Storage 초기화
const fireStorage = getStorage(firebasedb);
export { fireStorage };
