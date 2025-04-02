import { Card, CardContent, Typography } from '@mui/material';

interface NutritionalBreakdownProps {
    data: {
        calories: number;
        protein: number;
        carbs: number;
        fats: number;
    };
}

const NutritionalBreakdown = ({ data }: NutritionalBreakdownProps) => {
    return (
        <Card sx={{ my: 2 }}>
            <CardContent>
                <Typography variant="h6">Nutritional Breakdown</Typography>
                <Typography>Calories: {data.calories} kcal</Typography>
                <Typography>Protein: {data.protein} g</Typography>
                <Typography>Carbs: {data.carbs} g</Typography>
                <Typography>Fats: {data.fats} g</Typography>
            </CardContent>
        </Card>
    );
};

export default NutritionalBreakdown;
