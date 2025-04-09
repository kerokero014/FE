import React, { useState } from 'react';
import { TextField, Button, Box, CircularProgress, Typography, Divider } from '@mui/material';
import useGenerateRecipe from '../hooks/useGenerate';
import SnackbarMessage from './SnackMsg';
import { GenStyles } from './generteStyles';
import useAuth from '../hooks/useAuth';
import { saveRecipe } from '../services/recipeService';

const GenerateRecipe: React.FC = () => {
    const { user } = useAuth(); // Move useAuth to the top level
    const [craving, setCraving] = useState('');
    const { generateRecipe, loading, error, recipe } = useGenerateRecipe();
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await generateRecipe(craving);
        setSnackbarOpen(true);
    };

    const handleSaveRecipe = async (recipeId: number) => {
        if (!user?.id) {
            console.error('User not logged in');
            return;
        }

        try {
            await saveRecipe(recipeId, Number(user.id));
            console.log('Recipe saved successfully');
        } catch (error) {
            console.error('Failed to save recipe:', error);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={GenStyles.Box}>
            <TextField
                label="What are you craving?"
                fullWidth
                value={craving}
                onChange={(e) => setCraving(e.target.value)}
                required
                sx={GenStyles.TextField}
            />

            <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={GenStyles.submitButton}
            >
                Generate Recipe
            </Button>

            {loading && <CircularProgress sx={{ mt: 2 }} />}

            <SnackbarMessage
                open={snackbarOpen}
                message={error ?? 'Recipe generated successfully!'}
                type={error ? 'error' : 'success'}
                onClose={() => setSnackbarOpen(false)}
            />

            {recipe && (
                <Box sx={GenStyles.recipeBox}>
                    <Typography variant="h5" component="h2" gutterBottom>
                        {recipe.title}
                    </Typography>
                    <Typography variant="body1" paragraph>
                        {recipe.description}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        <strong>Nutritional Value:</strong> {recipe.nutritionalValue}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h6" gutterBottom>
                        Instructions
                    </Typography>
                    <Typography variant="body2" paragraph>
                        {recipe.instructions}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Steps
                    </Typography>
                    <ol style={{ paddingLeft: '1.5rem' }}>
                        {recipe.steps
                            .sort((a, b) => a.order - b.order)
                            .map((step) => (
                                <li key={step.order}>
                                    <Typography variant="body2" paragraph>
                                        {step.step}
                                    </Typography>
                                </li>
                            ))}
                    </ol>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleSaveRecipe(Number(recipe.id))} // Ensure recipe.id is a number
                    >
                        Save Recipe
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default GenerateRecipe;
