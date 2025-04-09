const API_URL = 'http://localhost:5000';

export const saveRecipe = async (recipeId: number, userId: number) => {
    try {
        const response = await fetch(`${API_URL}/saved-recipes/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ recipeId }),
        });

        if (!response.ok) {
            throw new Error('Failed to save the recipe');
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error saving recipe:', error);
        throw error;
    }
};

export const getSavedRecipes = async (userId: number) => {
    try {
        const response = await fetch(`${API_URL}/saved-recipes/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch saved recipes');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching saved recipes:', error);
        throw error;
    }
};
