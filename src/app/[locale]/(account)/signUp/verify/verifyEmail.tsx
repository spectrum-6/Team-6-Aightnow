// src/app/[locale]/(account)/signUp/verify/auth/verifyEmail.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { verifyEmail } from "@/firebase/fireauth";

const VerifyEmail = () => {
  const [message, setMessage] = useState("");
  const router = useRouter();
  const searchParams = new URLSearchParams(window.location.search);
  const oobCode = searchParams.get("oobCode");

  useEffect(() => {
    const verifyEmailAction = async () => {
      if (oobCode) {
        try {
          await verifyEmail(oobCode);
          setMessage(
            "Your email has been successfully verified. Redirecting to the registration page...",
          );
          setTimeout(() => {
            router.push("/signUp/register");
          }, 3000);
        } catch (error) {
          console.error("Email verification failed.", error);
          setMessage("Email verification failed. Please try again.");
        }
      }
    };

    verifyEmailAction();
  }, [oobCode, router]);

  return (
    <div>
      <h1>Email Verification</h1>
      <p>{message}</p>
    </div>
  );
};

export default VerifyEmail;
