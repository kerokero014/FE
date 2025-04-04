import { Card, CardContent, Typography, Box } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface NutritionalBreakdownProps {
    data: {
        calories: number;
        protein: number;
        carbs: number;
        fats: number;
    };
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

const NutritionalBreakdown = ({ data }: NutritionalBreakdownProps) => {
    const pieData = [
        { name: 'Protein', value: data.protein },
        { name: 'Carbs', value: data.carbs },
        { name: 'Fats', value: data.fats },
    ];

    return (
        <Card sx={{ my: 2 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Nutritional Breakdown
                </Typography>
                <Typography>Calories: {data.calories} kcal</Typography>

                <Box sx={{ height: 250, mt: 2 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={pieData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                fill="#8884d8"
                                label
                            >
                                {pieData.map((__, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </Box>
            </CardContent>
        </Card>
    );
};

export default NutritionalBreakdown;
