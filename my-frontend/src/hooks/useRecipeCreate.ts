import { useState } from 'react';
import type { Recipe } from '../types/recipe.types';

export const useCreateRecipe = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const createRecipe = async (recipeData: Recipe) => {
        setLoading(true);
        setError('');

        try {
            const res = await fetch('http://localhost:5000/recipes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(recipeData),
            });

            if (!res.ok) {
                const errText = await res.text();
                setError(`Failed to create recipe: ${errText}`);
                return;
            }

            return await res.json();
        } catch (err) {
            if (err instanceof Error) {
                setError(`Error creating recipe: ${err.message}`);
            } else if (err instanceof TypeError) {
                setError('Invalid recipe data');
            } else {
                setError('An unknown error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    return { createRecipe, loading, error };
};
