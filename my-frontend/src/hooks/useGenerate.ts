// hooks/useGenerateRecipe.ts
import { useState } from 'react';
import { Recipe } from '../types/recipe.types';
import useAuth from './useAuth';

type UseGenerateRecipe = {
    generateRecipe: (craving: string) => Promise<void>;
    loading: boolean;
    error: string | null;
    recipe: Recipe | null;
};

const useGenerateRecipe = (): UseGenerateRecipe => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const { user, token } = useAuth();

    const generateRecipe = async (craving: string) => {
        if (!user?.id || !token) {
            setError('You must be logged in to generate a recipe.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const res = await fetch('http://localhost:5000/labs-recipe/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    craving,
                    userId: user.id, // now guaranteed to be a number
                }),
            });

            if (!res.ok) {
                throw new Error(`Error ${res.status}: ${res.statusText}`);
            }

            const data: Recipe = await res.json();
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
