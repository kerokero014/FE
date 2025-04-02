import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  userId: string;
}

export const getUserIdFromToken = (): string | null => {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  try {
    const decoded: DecodedToken = jwtDecode(token);
    return decoded.userId || null;
  } catch (error) {
    console.error("Error decoding token", error);
    return null;
  }
};
