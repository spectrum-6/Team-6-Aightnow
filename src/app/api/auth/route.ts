import { NextRequest, NextResponse } from "next/server";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { UserInfo } from "@/types/UserInfo";
import { rateLimit } from "@/utils/rateLimit";
import { getUserInfoById } from "@/firebase/firestore";

export async function POST(req: NextRequest) {
  const { action, id, password } = await req.json();

  try {
    // action이 'login'인지 확인합니다.
    if (action !== "login") {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    // 요청 속도를 제한합니다.
    const rateLimitResult = await rateLimit(req, 5, 60);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: "Too many login attempts. Please try again later." },
        { status: 429 },
      );
    }

    const result = await loginUser(id, password);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Auth error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

async function loginUser(id: string, password: string) {
  const auth = getAuth();

  // ID로 사용자 정보를 가져옵니다.
  const userInfo = await getUserInfoById(id);

  if (!userInfo) {
    throw new Error("User not found");
  }

  const email = userInfo.email;

  if (!email) {
    throw new Error("Email not found");
  }

  try {
    // Firebase Authentication으로 로그인을 시도합니다.
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;

    // 민감한 정보를 제거합니다.
    const { password: _, ...safeUserInfo } = userInfo;

    return {
      user: { uid: user.uid, email: user.email },
      userInfo: safeUserInfo,
    };
  } catch (error: any) {
    console.error("Login error:", error);
    if (error.code === "auth/wrong-password") {
      throw new Error("Incorrect password");
    } else if (error.code === "auth/too-many-requests") {
      throw new Error("Too many login attempts. Please try again later.");
    } else {
      throw new Error("로그인을 실패했습니다. 다시 입력해");
    }
  }
}
