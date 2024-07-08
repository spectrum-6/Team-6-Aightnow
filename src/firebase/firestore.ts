import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { UserInfo } from "@/types/UserInfo";
import { firestore } from "./firebasedb";

// uid로 사용자 정보 가져오기
export const getUserInfo = async (uid: string): Promise<UserInfo | null> => {
  try {
    const userDoc = await getDoc(doc(firestore, "users", uid));
    if (userDoc.exists()) {
      return userDoc.data() as UserInfo;
    }
    return null;
  } catch (error: any) {
    console.error("Error getting user info:", error.message);
    throw error;
  }
};

// uid로 사용자 정보 업데이트
export const updateUserInfo = async (
  uid: string,
  userInfo: Partial<UserInfo>,
): Promise<void> => {
  try {
    const userDocRef = doc(firestore, "users", uid);
    await updateDoc(userDocRef, {
      ...userInfo,
      updatedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("Error updating user info:", error.message);
    throw error;
  }
};

// uid로 새 사용자 정보 생성
export const createUserInfo = async (
  uid: string,
  userInfo: UserInfo,
): Promise<void> => {
  try {
    const userDocRef = doc(firestore, "users", uid);
    await setDoc(userDocRef, {
      ...userInfo,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("Error creating user info:", error.message);
    throw error;
  }
};

// ID로 사용자 정보 가져오기
export const getUserInfoById = async (id: string): Promise<UserInfo | null> => {
  try {
    const usersRef = collection(firestore, "users");
    const q = query(usersRef, where("id", "==", id));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const userDoc = querySnapshot.docs[0];
    return userDoc.data() as UserInfo;
  } catch (error: any) {
    console.error("Error getting user info by ID:", error.message);
    throw error;
  }
};

export const updateLastLoginAt = async (uid: string): Promise<void> => {
  try {
    const userDocRef = doc(firestore, "users", uid);
    await updateDoc(userDocRef, {
      lastLoginAt: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("Error updating last login time:", error.message);
    throw error;
  }
};
