import { Container, Typography, Grid, Box } from '@mui/material';
import { labsStyles } from './styles/LabsStyles';
import RecipeForm from '../components/recipeForm';
import GenerateRecipe from '../components/GenerateRecipe';

const Labs = () => {
    return (
        <Container sx={labsStyles.container}>
            <Typography sx={labsStyles.title} variant="h1">
                Labs
            </Typography>
            <Grid container spacing={4} justifyContent="center">
                <Grid>
                    <Box sx={labsStyles.formContainer}>
                        <RecipeForm />
                    </Box>
                    <Box sx={labsStyles.recipeContainer}>
                        <GenerateRecipe />
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Labs;
