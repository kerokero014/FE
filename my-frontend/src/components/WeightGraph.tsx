import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, Typography } from '@mui/material';

interface WeightGraphProps {
    weightHistory: { date: string; weight: number }[];
}

const WeightGraph = ({ weightHistory }: WeightGraphProps) => {
    return (
        <Card sx={{ my: 2 }}>
            <CardContent>
                <Typography variant="h6">Weight Progress</Typography>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={weightHistory}>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="weight" stroke="#8884d8" />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};

export default WeightGraph;
