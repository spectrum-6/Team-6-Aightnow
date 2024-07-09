import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/utils/rateLimit";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebasedb";
import {
  getUserInfo,
  updateUserInfo,
  createUserInfo,
} from "@/firebase/firestore";
import { UserInfo } from "@/types/UserInfo";

export async function POST(req: NextRequest) {
  // 요청 본문에서 action, id, password 등의 정보를 추출
  const { action, id, password, provider, email, userInfo } = await req.json();

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
        // 일반 로그인 처리
        result = await handleLogin(id, password);
        break;
      case "register":
        // 회원가입 처리
        result = await handleRegister(id, password, email, userInfo);
        break;
      case "socialLogin":
        // 소셜 로그인 처리
        result = await handleSocialLogin(provider, email, userInfo);
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

// 일반 로그인 처리 함수
async function handleLogin(id: string, password: string) {
  try {
    // 사용자 정보 조회
    const userInfo = await getUserInfo(id);
    if (!userInfo || !userInfo.email) {
      throw new Error("사용자를 찾을 수 없습니다.");
    }

    // Firebase Authentication을 사용한 로그인
    const userCredential = await signInWithEmailAndPassword(
      auth,
      userInfo.email,
      password,
    );
    const user = userCredential.user;

    // 로그인 시간 업데이트
    await updateUserInfo(user.uid, { lastLoginAt: new Date().toISOString() });

    // 민감한 정보 제거
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

// 회원가입 처리 함수
async function handleRegister(
  id: string,
  password: string,
  email: string,
  userInfo: Partial<UserInfo>,
) {
  try {
    // 이미 존재하는 사용자인지 확인
    const existingUser = await getUserInfo(id);
    if (existingUser) {
      throw new Error("이미 존재하는 사용자입니다.");
    }

    // Firebase Authentication을 사용한 사용자 생성
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;

    // Firestore에 사용자 정보 저장
    const newUserInfo: UserInfo = {
      ...userInfo,
      id,
      email,
      uid: user.uid,
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
      registrationCompleted: true,
    };
    await createUserInfo(user.uid, newUserInfo);

    // 민감한 정보 제거
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

// 소셜 로그인 처리 함수
async function handleSocialLogin(
  provider: string,
  email: string,
  userInfo: Partial<UserInfo>,
) {
  try {
    // 기존 사용자 정보 조회
    let existingUser = await getUserInfo(email);

    if (!existingUser) {
      // 신규 사용자인 경우, 사용자 정보 생성
      const newUserInfo: UserInfo = {
        ...userInfo,
        email,
        socialProvider: provider,
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
        registrationCompleted: false, // 추가 정보 입력 필요
      };
      await createUserInfo(email, newUserInfo);
      existingUser = newUserInfo;
    } else {
      // 기존 사용자인 경우, 로그인 시간 업데이트
      await updateUserInfo(existingUser.uid!, {
        lastLoginAt: new Date().toISOString(),
      });
    }

    return { userInfo: existingUser };
  } catch (error: any) {
    console.error("소셜 로그인 오류:", error);
    throw new Error("소셜 로그인에 실패했습니다. 다시 시도해주세요.");
  }
}
