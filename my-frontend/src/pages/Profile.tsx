import { useEffect, useState } from 'react';
import {
    Container,
    Typography,
    Box,
    List,
    ListItem,
    ListItemText,
    Grid,
    Paper,
} from '@mui/material';
import UserInfo from '../components/UserInfo';
import WeightGraph from '../components/WeightGraph';
import NutritionalBreakdown from '../components/NutritionalBreakdown';
import { getUserProfile, UserProfile } from '../services/userService';
import useAuth from '../hooks/useAuth';

const MyProfile = () => {
    const { user: authUser } = useAuth();
    const [user, setUser] = useState<UserProfile | null>(null);
    const [error, setError] = useState<string | null>(null);

    const userId = authUser?.id;

    useEffect(() => {
        if (!userId) {
            setError('User ID not found');
            return;
        }

        const fetchUserProfile = async () => {
            try {
                const userData = await getUserProfile(userId);
                setUser(userData);
            } catch (err) {
                setError((err as Error).message);
            }
        };

        fetchUserProfile();
    }, [userId]);

    if (error) return <Typography color="error">{error}</Typography>;
    if (!user) return <Typography>Loading...</Typography>;

    const renderList = (title: string, items: { id: number; name: string }[]) => (
        <Box my={2}>
            <Typography variant="h6">{title}</Typography>
            <List>
                {items.map((item) => (
                    <ListItem key={item.id}>
                        <ListItemText primary={item.name} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>
                My Profile
            </Typography>

            <UserInfo name={user.firstName} email={user.email} />

            <Grid>
                <Grid>
                    <WeightGraph weightHistory={[]} />
                </Grid>
            </Grid>

            <Grid sx={{ mt: 4 }}>
                <NutritionalBreakdown
                    data={{ calories: 3000, protein: 190, carbs: 50, fats: 50 }}
                />
            </Grid>

            <Grid container spacing={4} sx={{ mt: 2 }}>
                <Grid>
                    <Paper elevation={2} sx={{ p: 2, height: '100%', width: '200px' }}>
                        {renderList('Favorite Foods', user.favoriteFoods ?? [])}
                    </Paper>
                </Grid>

                <Grid>
                    <Paper elevation={3} sx={{ p: 2, height: '100%', width: '200px' }}>
                        {renderList('Allergies', user.allergies ?? [])}
                    </Paper>
                </Grid>

                <Grid>
                    <Paper elevation={2} sx={{ p: 2, height: '100%', width: '200px' }}>
                        {renderList('Dislikes', user.dislikes ?? [])}
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default MyProfile;
