// hooks/useGenerateRecipe.js
import { useState } from 'react';
import { Recipe } from '../types/recipe.types'; // Adjust the import path as necessary

const useGenerateRecipe = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [recipe, setRecipe] = useState<Recipe | null>(null);

    const generateRecipe = async (craving: string, userId: string) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:3000/labs-recipe/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ craving, userId }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch recipe');
            }

            const data: Recipe = await response.json(); // Ensure it matches the `Recipe` interface
            setRecipe(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setLoading(false);
        }
    };

    return { generateRecipe, loading, error, recipe };
};

export default useGenerateRecipe;
