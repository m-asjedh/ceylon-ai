"use client";

import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoginForm } from "@/components/auth/LoginForm";
import { useAuthRedirect } from "@/components/auth/useAuthRedirect";

export default function LoginPage() {
  useAuthRedirect();

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue your conversations."
    >
      <LoginForm />
    </AuthLayout>
  );
}
