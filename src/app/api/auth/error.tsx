import { useRouter } from "next/router";
import { useEffect } from "react";

export default function CustomErrorPage() {
  const router = useRouter();
  const { error } = router.query;

  useEffect(() => {
    const errorMessage = Array.isArray(error) ? error[0] : error;
    if (errorMessage && !router.asPath.includes("/api/auth/error")) {
      router.replace(`/login?error=${encodeURIComponent(errorMessage)}`);
    }
  }, [error, router]);

  const errorMessage = Array.isArray(error) ? error[0] : error;

  return (
    <div>
      <h1>Authentication Error</h1>
      <p>{errorMessage || "An error occurred"}</p>
    </div>
  );
}
