import React, { useState, useContext, useEffect } from 'react';
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    Alert,
    Card,
    CardContent,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useLogin from '../hooks/useLogin';
import AuthContext from '../context/AuthContext';
import { loginStyles } from './styles/loginStyles';

const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [formError, setFormError] = useState<string>('');
    const navigate = useNavigate();

    const { login: loginAPI, loading, error } = useLogin();
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error('AuthContext must be used within an AuthProvider');
    }
    const { login: loginContext, user } = authContext;

    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            setFormError('Email and password are required');
            return;
        }
        try {
            const data = await loginAPI({ email, password });
            loginContext(data.user, data.token);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Container maxWidth="sm" sx={loginStyles.loginContainer}>
            <Card sx={loginStyles.loginCard}>
                <CardContent>
                    <Typography variant="h4" component="h1" align="center" gutterBottom>
                        Login
                    </Typography>
                    {formError && <Alert severity="error">{formError}</Alert>}
                    {error && <Alert severity="error">{error}</Alert>}
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            label="Password"
                            variant="outlined"
                            margin="normal"
                            type="password"
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Box mt={2}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                disabled={loading}
                            >
                                {loading ? 'Logging in...' : 'Login'}
                            </Button>
                        </Box>
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
};

export default Login;
