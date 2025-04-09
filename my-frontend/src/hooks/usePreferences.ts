import { Preferences } from '../types/preference.types';
import useAuth from './useAuth';

export const usePreferences = () => {
    const { token } = useAuth(); // Get token directly from context

    const savePreferences = async (preferences: Preferences & { userId: string }) => {
        try {
            const response = await fetch('https://be-m76b.onrender.com/preferences', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                body: JSON.stringify(preferences),
            });

            if (!response.ok) {
                throw new Error(`Failed to save preferences: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error saving preferences:', error);
            return { error: 'Failed to save preferences' };
        }
    };

    return { savePreferences };
};
