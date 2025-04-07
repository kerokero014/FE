//Page where the user can create recipes obtained from ChatGPT API, prompt in a search bar cravings,
// ChatGPT will know in the same propmt their allergies, dislikes and favorite foods, and will return a recipe.
import { Container, Typography } from '@mui/material';
import { labsStyles } from './styles/LabsStyles';
import RecipeForm from '../components/recipeForm';

const Labs = () => {
    return (
        <Container maxWidth="lg" sx={labsStyles.container}>
            <Typography sx={labsStyles.title} variant="h1" component="h2">
                <h1>Labs</h1>
            </Typography>

            <RecipeForm />
        </Container>
    );
};

export default Labs;
