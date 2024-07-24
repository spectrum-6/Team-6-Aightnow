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
import { IUserStockCollection, UserInfo } from "@/types/UserInfo";
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

// 사용자 정보 업데이트 또는 생성
export const updateUserInfo = async (
  userId: string,
  userInfo: Partial<UserInfo>,
): Promise<void> => {
  try {
    const userDocRef = doc(firestore, "users", userId);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      // 문서가 존재하면 업데이트
      await updateDoc(userDocRef, {
        ...userInfo,
        updatedAt: new Date().toISOString(),
      });
    } else {
      // 문서가 존재하지 않으면 새로 생성
      await setDoc(userDocRef, {
        ...userInfo,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
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
      userStockCollection: userInfo.userStockCollection || {
        recentSearch: [],
        recentViews: [],
        watchList: [],
      },
      phoneNumber: userInfo.phoneNumber || null, // 전화번호 필드(아이디 찾기 떄문에)
      username: userInfo.username || null, // 사용자이름 필드(kakao)
    });
    // userStock 컬렉션에 빈 watchList 생성
    // await createUserStock(userId);
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

export const createUserStock = async (
  userId: string,
  watchList: string[] = [],
): Promise<void> => {
  try {
    const userStockDocRef = doc(firestore, "userStock", userId);
    const userStockData: IUserStockCollection = {
      recentSearch: [],
      recentViews: [],
      watchList: watchList,
    };
    await setDoc(userStockDocRef, userStockData);
  } catch (error: any) {
    console.error("Error creating user stock:", error.message);
    throw error;
  }
};

//관심종목 리스트
// export const updateUserWatchList = async (
//   userUID: string,
//   watchList: string[],
// ): Promise<void> => {
//   try {
//     await fetch(`/api/userStock/${userUID}/watchList`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ watchList: watchList }),
//     });
//   } catch (error: any) {
//     console.error("Error updating user watch list:", error.message);
//     throw error;
//   }
// };

export const getUserWatchList = async (userId: string): Promise<string[]> => {
  try {
    const userStockDocRef = doc(firestore, "userStock", userId);
    const userStockDoc = await getDoc(userStockDocRef);
    if (userStockDoc.exists()) {
      const userData = userStockDoc.data() as IUserStockCollection;
      return userData.watchList;
    }
    return [];
  } catch (error: any) {
    console.error("Error getting user watch list:", error.message);
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
