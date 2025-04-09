import { useState } from "react";

interface RegisterForm {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const registerUser = async (formData: RegisterForm) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("https://be-m76b.onrender.com/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        setSuccess(true);
        return true;
      } else {
        const errorMessage = "Registration failed! Please try again.";
        throw new Error(errorMessage);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { registerUser, loading, error, success };
}
