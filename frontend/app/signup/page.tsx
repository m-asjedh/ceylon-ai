"use client";

import { AuthLayout } from "@/components/auth/AuthLayout";
import { SignupForm } from "@/components/auth/SignupForm";
import { useAuthRedirect } from "@/components/auth/useAuthRedirect";

export default function SignupPage() {
  useAuthRedirect();

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start chatting with your private AI assistant."
    >
      <SignupForm />
    </AuthLayout>
  );
}
