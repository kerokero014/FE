import { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import UserInfo from '../components/UserInfo';
import WeightGraph from '../components/WeightGraph';
import NutritionalBreakdown from '../components/NutritionalBreakdown';
import PreferencesList from '../components/PreferenceList';
import SavedRecipes from '../components/SavedRecipes';

interface UserProfile {
    name: string;
    email: string;
    preferences: string[];
    weightHistory: { date: string; weight: number }[];
    nutritionalBreakdown: { calories: number; protein: number; carbs: number; fats: number };
}

interface Recipe {
    id: number;
    title: string;
    imageUrl: string;
}

const MyProfile = () => {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
        fetch('/api/user-profile')
            .then((res) => res.json())
            .then(setUser);

        fetch('/api/saved-recipes')
            .then((res) => res.json())
            .then(setRecipes);
    }, []);

    if (!user) return <Typography>Loading...</Typography>;

    return (
        <Container>
            <Typography variant="h4">My Profile</Typography>
            <UserInfo name={user.name} email={user.email} />
            <WeightGraph weightHistory={user.weightHistory} />
            <NutritionalBreakdown data={user.nutritionalBreakdown} />
            <PreferencesList preferences={user.preferences} />
            <SavedRecipes recipes={recipes} />
        </Container>
    );
};

export default MyProfile;
