import { useState } from 'react';
import { Container, Typography, Button, TextField, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { usePreferences } from '../hooks/usePreferences';
import { motion } from 'framer-motion';
import { preferenceStyles } from './styles/preferenceStyles';
import useAuth from '../hooks/useAuth';

const Preferences = () => {
    const { savePreferences } = usePreferences();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [step, setStep] = useState(0);
    const [preferences, setPreferences] = useState({
        allergies: [] as string[],
        dislikes: [] as string[],
        favorites: [] as string[],
    });
    const [inputValue, setInputValue] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleAdd = () => {
        const key = steps[step].name as keyof typeof preferences;

        // Prevent adding duplicates
        if (!preferences[key].includes(inputValue) && inputValue.trim() !== '') {
            setPreferences((prevState) => ({
                ...prevState,
                [key]: [...prevState[key], inputValue],
            }));
        }

        setInputValue('');
    };

    const handleNext = async () => {
        if (step < 2) {
            setStep(step + 1);
        } else {
            try {
                if (!user?.id) {
                    throw new Error('User ID is missing');
                }

                await savePreferences({ ...preferences, userId: user.id });
                navigate('/dashboard');
            } catch (error) {
                console.error('Error saving preferences:', error);
            }
        }
    };

    const steps = [
        {
            title: 'Allergies',
            name: 'allergies',
            placeholder: 'Enter an allergy and press Add',
        },
        {
            title: 'Dislikes',
            name: 'dislikes',
            placeholder: 'Enter a dislike and press Add',
        },
        {
            title: 'Favorite Foods',
            name: 'favorites',
            placeholder: 'Enter a favorite food and press Add',
        },
    ];

    if (!user) {
        return (
            <Typography variant="h6" color="error">
                You must be logged in to set your preferences.
            </Typography>
        );
    }

    return (
        <Container maxWidth="sm" sx={preferenceStyles.preferenceContainer}>
            <Card sx={preferenceStyles.preferenceCard}>
                <motion.div
                    key={step}
                    initial={{ x: 300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -300, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <CardContent>
                        <Typography variant="h4" gutterBottom>
                            {steps[step].title}
                        </Typography>
                        <TextField
                            fullWidth
                            placeholder={steps[step].placeholder}
                            value={inputValue}
                            onChange={handleChange}
                            sx={{ mb: 3 }}
                        />
                        <Button variant="outlined" onClick={handleAdd} sx={{ mb: 2 }}>
                            Add
                        </Button>
                        <Typography variant="body1" gutterBottom>
                            Current {steps[step].title}:{' '}
                            {preferences[steps[step].name as keyof typeof preferences].join(', ')}
                        </Typography>
                        <Button variant="contained" onClick={handleNext}>
                            {step < 2 ? 'Next' : 'Save and Continue'}
                        </Button>
                    </CardContent>
                </motion.div>
            </Card>
        </Container>
    );
};

export default Preferences;
