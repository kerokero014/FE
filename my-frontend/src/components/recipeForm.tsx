import { useState } from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Typography,
    CircularProgress,
} from '@mui/material';
import { useCreateRecipe } from '../hooks/useRecipeCreate';
import SnackbarMessage from './SnackMsg';

const RecipeForm = () => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [instructions, setInstructions] = useState('');
    const [nutritionalValue, setNutritionalValue] = useState('');
    const [steps, setSteps] = useState([{ step: '', order: 1 }]);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', type: 'info' });

    const { createRecipe, loading, error } = useCreateRecipe();

    const handleAddStep = () => {
        setSteps([...steps, { step: '', order: steps.length + 1 }]);
    };

    const handleStepChange = (index: number, value: string) => {
        const updatedSteps = [...steps];
        updatedSteps[index].step = value;
        setSteps(updatedSteps);
    };

    const handleSubmit = async () => {
        const payload = {
            title,
            description,
            instructions,
            nutritionalValue,
            steps,
        };

        try {
            await createRecipe(payload);
            setSnackbar({ open: true, message: 'Recipe created successfully!', type: 'success' });
            setOpen(false);
        } catch (err) {
            if (err instanceof Error) {
                setSnackbar({
                    open: true,
                    message: error || 'Error creating recipe',
                    type: 'error',
                });
            }
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <div>
            <Button variant="contained" onClick={() => setOpen(true)}>
                Create Recipe
            </Button>

            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Create a New Recipe</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Instructions"
                        multiline
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Nutritional Value"
                        value={nutritionalValue}
                        onChange={(e) => setNutritionalValue(e.target.value)}
                        margin="normal"
                    />

                    <Typography variant="subtitle1" mt={2}>
                        Steps
                    </Typography>
                    {steps.map((s, index) => (
                        <TextField
                            key={index}
                            fullWidth
                            label={`Step ${index + 1}`}
                            value={s.step}
                            onChange={(e) => handleStepChange(index, e.target.value)}
                            margin="dense"
                        />
                    ))}
                    <Button onClick={handleAddStep} size="small">
                        + Add Step
                    </Button>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        disabled={loading}
                        startIcon={loading && <CircularProgress size={18} />}
                    >
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>

            <SnackbarMessage
                open={snackbar.open}
                message={snackbar.message}
                type={snackbar.type as 'error' | 'success' | 'info'}
                onClose={handleCloseSnackbar}
            />
        </div>
    );
};

export default RecipeForm;
