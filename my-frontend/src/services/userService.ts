// services/userService.ts
export interface UserProfile {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
}

export const getUserProfile = async (userId: string): Promise<UserProfile> => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('User not authenticated');
    }

    const response = await fetch(`http://localhost:5000/users/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`, // Ensure to send the token in the headers
        },
    });

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
        const textResponse = await response.text();
        throw new Error(`Unexpected response format: ${textResponse}`);
    }

    if (!response.ok) {
        throw new Error('Failed to fetch user data');
    }

    return response.json();
};
