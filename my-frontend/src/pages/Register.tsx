import { useState } from 'react';
import { Button, TextField, Container, Typography, Card, CardContent } from '@mui/material';
import SnackbarMessage from '../components/SnackMsg';
import { useRegister } from '../hooks/useRegister';
import { registerStyles } from './styles/registerStyles';
import { useNavigate } from 'react-router-dom';
import useLogin from '../hooks/useLogin';
import useAuth from '../hooks/useAuth';

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
    const navigate = useNavigate();
    const { login } = useLogin(); // Use the correct function from useLogin
    const { login: loginContext } = useAuth(); // Use the login function from AuthContext

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

        if (success) {
            // Automatically log in the user after registration
            const loginResponse = await login({ email: form.email, password: form.password }); // Use login here
            if (loginResponse) {
                loginContext(loginResponse.user, loginResponse.token); // Set user and token in AuthContext
                navigate('/preferences'); // Navigate to preferences
            }
        } else {
            setSnackbar({
                open: true,
                message: error || 'Registration failed!',
                type: 'error',
            });
        }
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
