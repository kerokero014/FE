import React, { useState } from 'react';
import { TextField, Button, Box, CircularProgress } from '@mui/material';
import useGenerateRecipe from '../hooks/useGenerate';
import SnackbarMessage from './SnackMsg';
import useAuth from '../hooks/useAuth'; // Adjust the import path as necessary
import { GenStyles } from './generteStyles';

const GenerateRecipe = () => {
    const [craving, setCraving] = useState('');
    const { generateRecipe, loading, error, recipe } = useGenerateRecipe();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const { user } = useAuth(); // Access the authenticated user

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (user && user.id) {
            await generateRecipe(craving, user.id); // Use the dynamic userId
            setSnackbarOpen(true);
        } else {
            // Handle the case where user or user.id is not available
            console.error('User is not authenticated');
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={GenStyles.Box}>
            <TextField
                label="What are you craving?"
                variant="outlined"
                fullWidth
                value={craving}
                onChange={(e) => setCraving(e.target.value)}
                required
                sx={GenStyles.TextField}
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={GenStyles.submitButton}
                disabled={loading}
            >
                Generate Recipe
            </Button>

            {loading && <CircularProgress sx={{ mt: 2 }} />}

            <SnackbarMessage
                open={snackbarOpen}
                message={error ? error : 'Recipe generated successfully!'}
                type={error ? 'error' : 'success'}
                onClose={handleCloseSnackbar}
            />

            {recipe && (
                <Box sx={GenStyles.recipeBox}>
                    <h2>{recipe.title}</h2>
                    <p>{recipe.description}</p>
                    <p>
                        <strong>Nutritional Value:</strong> {recipe.nutritionalValue}
                    </p>
                    <h3>Instructions:</h3>
                    <p>{recipe.instructions}</p>
                    <h3>Steps:</h3>
                    <ol>
                        {recipe.steps.map((step, index) => (
                            <li key={index}>{step.step}</li>
                        ))}
                    </ol>
                </Box>
            )}
        </Box>
    );
};

export default GenerateRecipe;
