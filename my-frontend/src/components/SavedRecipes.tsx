import { Card, CardContent, Typography, Grid, CardMedia, CardActionArea } from '@mui/material';

interface Recipe {
    id: number;
    title: string;
    imageUrl: string;
}

interface SavedRecipesProps {
    recipes: Recipe[];
}

const SavedRecipes = ({ recipes }: SavedRecipesProps) => {
    return (
        <Card sx={{ my: 2 }}>
            <CardContent>
                <Typography variant="h6">Saved Recipes</Typography>
                <Grid container spacing={2}>
                    {recipes.length > 0 ? (
                        recipes.map((recipe) => (
                            <Grid key={recipe.id}>
                                <Card>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={recipe.imageUrl}
                                            alt={recipe.title}
                                        />
                                        <CardContent>
                                            <Typography>{recipe.title}</Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        <Typography>No saved recipes found.</Typography>
                    )}
                </Grid>
            </CardContent>
        </Card>
    );
};

export default SavedRecipes;
