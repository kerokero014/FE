export const apiClient = async (url: string, options: RequestInit = {}) => {
    const token = localStorage.getItem('token');

    const response = await fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : '',
            ...(options.headers || {}),
        },
    });

    // Read the response as text first
    const text = await response.text();
    const data = text ? JSON.parse(text) : {};

    if (!response.ok) {
        // Include the status code and any response data in the error message
        throw new Error(data.message || `An error occurred. Status: ${response.status}`);
    }

    return data;
};
