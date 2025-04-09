import { useEffect, useState } from 'react';

interface UserPreferences {
    allergies: string[];
    dislikes: string[];
    favorites: string[];
}

const useUserPreferences = (userId: string | null) => {
    const [preferences, setPreferences] = useState<UserPreferences | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!userId) {
            setError('User ID is missing');
            setLoading(false);
            return;
        }

        const fetchPreferences = async () => {
            try {
                const token = localStorage.getItem('token'); // Retrieve the token from localStorage
                if (!token) {
                    throw new Error('Authorization token is missing');
                }

                const endpoints = [
                    `https://be-m76b.onrender.com/allergies/${userId}`,
                    `https://be-m76b.onrender.com/dislikes/${userId}`,
                    `https://be-m76b.onrender.com/favorites/${userId}`,
                ];

                const responses = await Promise.all(
                    endpoints.map(async (url) => {
                        const response = await fetch(url, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                                'Content-Type': 'application/json',
                            },
                        });
                        const contentType = response.headers.get('Content-Type');
                        if (!response.ok) {
                            throw new Error(`Failed to fetch: ${url} - ${response.statusText}`);
                        }
                        if (contentType && contentType.includes('application/json')) {
                            return response.json();
                        } else {
                            throw new Error(`Unexpected response format from: ${url}`);
                        }
                    }),
                );

                setPreferences({
                    allergies: responses[0] || [],
                    dislikes: responses[1] || [],
                    favorites: responses[2] || [],
                });
            } catch (error) {
                if (error instanceof Error) {
                    setError(`Failed to load user preferences: ${error.message}`);
                } else {
                    setError('Failed to load user preferences due to an unknown error');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchPreferences();
    }, [userId]);

    return { preferences, loading, error };
};

export default useUserPreferences;
