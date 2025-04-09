import { useEffect, useState } from 'react';
import {
    Typography,
    List,
    ListItemButton,
    ListItemText,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
} from '@mui/material';
import { getSavedRecipes } from '../services/recipeService';
import useAuth from '../hooks/useAuth';
import { savedStyles } from './savedStyles';
interface Recipe {
    id: number;
    title: string;
    description: string;
    nutritionalValue: string;
    instructions: string;
    steps: { step: string; order: number }[];
    imageUrl?: string;
}

const SavedRecipes = () => {
    const { user } = useAuth();
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRecipes = async () => {
            if (!user?.id) {
                setError('User not logged in');
                return;
            }

            try {
                const savedRecipes = await getSavedRecipes(Number(user.id));
                const extractedRecipes = savedRecipes.map(
                    (item: { recipe: Recipe }) => item.recipe,
                );
                setRecipes(extractedRecipes);
            } catch (err) {
                if (err instanceof Error) {
                    setError('Failed to fetch saved recipes');
                }
            }
        };

        fetchRecipes();
    }, [user]);

    const handleOpen = (recipe: Recipe) => setSelectedRecipe(recipe);
    const handleClose = () => setSelectedRecipe(null);

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    if (recipes.length === 0) {
        return <Typography>No saved recipes found.</Typography>;
    }

    return (
        <Box sx={savedStyles.container}>
            <Typography variant="h5" gutterBottom>
                Saved Recipes
            </Typography>
            <List>
                {recipes.map((recipe) => (
                    <ListItemButton
                        key={recipe.id}
                        sx={savedStyles.listItem}
                        onClick={() => handleOpen(recipe)}
                    >
                        <ListItemText
                            primary={recipe.title}
                            primaryTypographyProps={{ sx: savedStyles.listText }}
                        />
                    </ListItemButton>
                ))}
            </List>

            <Dialog open={Boolean(selectedRecipe)} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle sx={savedStyles.dialogTitle}>{selectedRecipe?.title}</DialogTitle>
                <DialogContent dividers>
                    <Box sx={savedStyles.section}>
                        <Typography variant="subtitle1" gutterBottom>
                            Description:
                        </Typography>
                        <Typography>{selectedRecipe?.description}</Typography>
                    </Box>

                    <Box sx={savedStyles.section}>
                        <Typography variant="subtitle1" gutterBottom>
                            Nutritional Value:
                        </Typography>
                        <Typography>{selectedRecipe?.nutritionalValue}</Typography>
                    </Box>

                    <Box sx={savedStyles.section}>
                        <Typography variant="subtitle1" gutterBottom>
                            Instructions:
                        </Typography>
                        <Typography>
                            {selectedRecipe?.instructions || 'No instructions provided.'}
                        </Typography>
                    </Box>

                    <Box>
                        <Typography variant="subtitle1" gutterBottom>
                            Steps:
                        </Typography>
                        {selectedRecipe?.steps?.length ? (
                            <ol style={savedStyles.ol}>
                                {selectedRecipe.steps
                                    .sort((a, b) => a.order - b.order)
                                    .map((step) => (
                                        <li key={step.order}>
                                            <Typography>{step.step}</Typography>
                                        </li>
                                    ))}
                            </ol>
                        ) : (
                            <Typography>No steps available.</Typography>
                        )}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="contained">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default SavedRecipes;
