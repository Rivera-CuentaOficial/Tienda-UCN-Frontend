import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { signIn, signOut } from "next-auth/react";
import { toast } from "sonner";

import { extractUserFromJwt, handleApiError } from "@/lib";
import {
  LoginRequest,
  RegisterRequest,
  ResendVerificationCodeRequest,
  VerifyEmailRequest,
} from "@/models/requests";
import { queryClient } from "@/providers";
import { authService } from "@/services";

export const useLoginMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      try {
        const response = await authService.login({
          email: data.email,
          password: data.password,
          rememberMe: data.rememberMe,
        });

        const result = await signIn("credentials", {
          email: data.email,
          token: response.data.data,
          redirect: false,
        });

        if (!result?.ok) {
          throw new Error("Error al crear la sesión");
        }

        const userInfo = extractUserFromJwt(response.data.data);
        return { result, role: userInfo.role };
      } catch (error) {
        const apiError = handleApiError(error);
        throw new Error(apiError.details);
      }
    },
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });

      const userRole = data.role.toLowerCase();
      if (userRole === "admin") {
        router.replace("/admin/products");
      } else {
        router.replace("/products");
      }
    },
  });
};

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: async (data: RegisterRequest) => {
      await authService.register(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });
};

export const useVerifyEmailMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: VerifyEmailRequest) => {
      await authService.verifyEmail(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      router.push("/auth/login");
    },
  });
};

export const useResendCodeMutation = () => {
  return useMutation({
    mutationFn: async (data: ResendVerificationCodeRequest) => {
      await authService.resendVerificationCode(data);
    },
  });
};

export const useLogoutMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      await signOut({ redirect: false });
      queryClient.clear();
    },
    onSuccess: () => {
      toast.success("Sesión cerrada correctamente");
      router.refresh();
    },
  });
};
