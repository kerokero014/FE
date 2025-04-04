// hooks/useUserProfile.ts
import { useEffect, useState } from "react";
import { getUserProfile, UserProfile } from "../services/userService";
import { getUserIdFromToken } from "../utils/jwtUtil";

const useUserProfile = (userId?: string) => {
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const id = userId || getUserIdFromToken();
    if (!id) {
      setLoading(false);
      return;
    }

        const fetchUser = async () => {
            try {
                setLoading(true);
                const profile = await getUserProfile(id);
                setUserData(profile);
            } catch (err) {
                setError('Failed to fetch user data.');
                console.error('Error fetching user:', err);
            } finally {
                setLoading(false);
            }
        };

    fetchUser();
  }, [userId]);

  return { userData, loading, error };
};

export default useUserProfile;
