import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/utils/rateLimit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/firebase/firebasedb";
import {
  getUserInfo,
  updateUserInfo,
  createUserInfo,
} from "@/firebase/firestore";
import { UserInfo } from "@/types/UserInfo";

export async function POST(req: NextRequest) {
  const { action, id, password, email } = await req.json();

  try {
    // 요청 속도 제한 적용
    const rateLimitResult = await rateLimit(req, 5, 60);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: "너무 많은 요청을 보냈습니다. 잠시 후 다시 시도해주세요." },
        { status: 429 },
      );
    }

    let result;
    switch (action) {
      case "login":
        result = await handleLogin(id, password);
        break;
      case "register":
        result = await handleRegister(id, password, email);
        break;
      default:
        return NextResponse.json(
          { error: "유효하지 않은 작업입니다." },
          { status: 400 },
        );
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("인증 오류:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

async function handleLogin(id: string, password: string) {
  try {
    const userInfo = await getUserInfo(id);
    if (!userInfo || !userInfo.email) {
      throw new Error("사용자를 찾을 수 없습니다.");
    }

    const userCredential = await signInWithEmailAndPassword(
      auth,
      userInfo.email,
      password,
    );
    const user = userCredential.user;

    await updateUserInfo(user.uid, { lastLoginAt: new Date().toISOString() });

    const { password: _, ...safeUserInfo } = userInfo;
    return {
      user: { uid: user.uid, email: user.email },
      userInfo: safeUserInfo,
    };
  } catch (error: any) {
    console.error("로그인 오류:", error);
    throw new Error("로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.");
  }
}

async function handleRegister(id: string, password: string, email: string) {
  try {
    const existingUser = await getUserInfo(id);
    if (existingUser) {
      throw new Error("이미 존재하는 사용자입니다.");
    }

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;

    const newUserInfo: UserInfo = {
      id,
      email,
      uid: user.uid,
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
      registrationCompleted: false,
      watchlist: [],
      userStockCollection: {
        recentSearch: [],
        recentViews: [],
        watchList: [],
      },
    };
    await createUserInfo(user.uid, newUserInfo);

    const { password: _, ...safeUserInfo } = newUserInfo;
    return {
      user: { uid: user.uid, email: user.email },
      userInfo: safeUserInfo,
    };
  } catch (error: any) {
    console.error("회원가입 오류:", error);
    throw new Error("회원가입에 실패했습니다. 다시 시도해주세요.");
  }
}
