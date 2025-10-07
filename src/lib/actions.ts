"use server";

import { AuthError } from "next-auth";

import { signIn, signOut } from "@/auth.config";

export async function loginAction(formData: {
  email: string;
  password: string;
  rememberMe: boolean;
}) {
  try {
    await signIn("credentials", {
      ...formData,
      redirect: false,
    });
    return { ok: true };
  } catch (error) {
    const authError = error as AuthError;
    const msg =
      authError?.cause?.err?.message ||
      authError?.message ||
      "Error al iniciar sesión";

    return { ok: false, message: msg };
  }
}

export async function logoutAction() {
  await signOut({ redirect: false });
}
