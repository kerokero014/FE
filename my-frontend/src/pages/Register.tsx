import { useState } from 'react';
import { Button, TextField, Container, Typography, Card, CardContent } from '@mui/material';
import SnackbarMessage from '../components/SnackMsg';
import { useRegister } from '../hooks/useRegister';
import { registerStyles } from './styles/registerStyles';

export default function Register() {
    const { registerUser, loading, error } = useRegister();
    const [form, setForm] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
    });
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        type: 'info' as 'error' | 'success' | 'info',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await registerUser(form);
        setSnackbar({
            open: true,
            message: success ? 'Registered successfully!' : error || 'Registration failed!',
            type: success ? 'success' : 'error',
        });
    };

    const handleSnackbarClose = () => {
        setSnackbar((prev) => ({ ...prev, open: false }));
    };

    return (
        <Container maxWidth="sm" sx={registerStyles.registerContainer}>
            <Card sx={registerStyles.registerCard}>
                <CardContent>
                    <Typography variant="h4" align="center" gutterBottom>
                        Create an Account
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="First Name"
                            name="firstName"
                            onChange={handleChange}
                            variant="outlined"
                            sx={registerStyles.registerTextField}
                        />
                        <TextField
                            fullWidth
                            label="Last Name"
                            name="lastName"
                            onChange={handleChange}
                            variant="outlined"
                            sx={registerStyles.registerTextField}
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            onChange={handleChange}
                            variant="outlined"
                            sx={registerStyles.registerTextField}
                        />

                        <TextField
                            fullWidth
                            label="Password"
                            name="password"
                            type="password"
                            onChange={handleChange}
                            variant="outlined"
                            sx={registerStyles.registerTextField}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            disabled={loading}
                            sx={registerStyles.registerButton}
                        >
                            {loading ? 'Registering...' : 'Register'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
            <SnackbarMessage
                open={snackbar.open}
                message={snackbar.message}
                type={snackbar.type}
                onClose={handleSnackbarClose}
            />
        </Container>
    );
}
