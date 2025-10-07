import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useAuth } from "@/hooks/api";
import { handleApiError } from "@/lib/api";
import { RegisterRequest } from "@/models/requests";

export const useRegister = () => {
  const { registerAsync, isRegistering, registerError } = useAuth();

  const router = useRouter();

  const handleRegister = async (registerData: RegisterRequest) => {
    try {
      await registerAsync(registerData);

      toast.success(
        "Registro exitoso. Revisa tu email para el código de verificación"
      );

      router.push(
        `/auth/verify-email?email=${encodeURIComponent(registerData.email)}`
      );
    } catch (error) {}
  };

  const handleErrors = () => {
    const apiError = handleApiError(registerError).details;

    if (apiError?.includes("You can only send")) {
      return "Sólo puedes registrar cuentas con el correo utilizado para el servicio de Resend.";
    }

    return apiError;
  };

  return {
    handleRegister,
    isLoading: isRegistering,
    error: handleErrors(),
  };
};
