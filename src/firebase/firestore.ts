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

// ID로 사용자 정보 가져오기
export const getUserInfoById = async (id: string): Promise<UserInfo | null> => {
  try {
    const usersRef = collection(firestore, "users");
    const q = query(usersRef, where("id", "==", id));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    return querySnapshot.docs[0].data() as UserInfo;
  } catch (error: any) {
    console.error("Error getting user info by ID:", error.message);
    throw error;
  }
};

// uid로 사용자 정보 가져오기
export const getUserInfo = async (userId: string): Promise<UserInfo | null> => {
  try {
    const userDocRef = doc(firestore, "users", userId);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      return userDoc.data() as UserInfo;
    }
    return null;
  } catch (error: any) {
    console.error("Error getting user info:", error.message);
    throw error;
  }
};

// 사용자 정보 업데이트
export const updateUserInfo = async (
  uid: string,
  userInfo: Partial<UserInfo>,
): Promise<void> => {
  try {
    const userDocRef = doc(firestore, "users", uid);

    // undefined 값을 필터링
    const filteredUserInfo = Object.entries(userInfo).reduce(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = value;
        }
        return acc;
      },
      {} as Record<string, any>,
    );

    await updateDoc(userDocRef, {
      ...filteredUserInfo,
      updatedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("Error updating user info:", error.message);
    throw error;
  }
};

// 새 사용자 정보 생성
export const createUserInfo = async (
  userId: string,
  userInfo: UserInfo,
): Promise<void> => {
  try {
    const userDocRef = doc(firestore, "users", userId);
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

// 소셜 로그인 제공자와 이메일로 사용자 정보 가져오기
export const getUserInfoBySocialIdAndProvider = async (
  email: string,
  socialProvider: string,
): Promise<UserInfo | null> => {
  try {
    const usersRef = collection(firestore, "users");
    const q = query(
      usersRef,
      where("email", "==", email),
      where("socialProvider", "==", socialProvider),
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    return querySnapshot.docs[0].data() as UserInfo;
  } catch (error: any) {
    console.error(
      "Error getting user info by social ID and provider:",
      error.message,
    );
    throw error;
  }
};

export const updateLastLoginAt = async (identifier: string): Promise<void> => {
  try {
    const existingUser = await getUserInfo(identifier);
    if (!existingUser) {
      throw new Error("User not found");
    }

    const userDocRef = doc(firestore, "users", existingUser.uid || identifier);
    await updateDoc(userDocRef, {
      lastLoginAt: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("Error updating last login time:", error.message);
    throw error;
  }
};
