import { useContext } from 'react';
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { navbarStyles } from './Navstyles';

export default function Navbar() {
    const auth = useContext(AuthContext);

    return (
        <AppBar position="static" sx={navbarStyles.appBar}>
            <Toolbar sx={navbarStyles.toolbar}>
                <Typography variant="h6" component={Link} to="/" sx={navbarStyles.logoButton}>
                    ChefGPT
                </Typography>
                <Box>
                    {auth?.user ? (
                        <>
                            <Button
                                color="inherit"
                                component={Link}
                                to="/profile"
                                sx={navbarStyles.button}
                            >
                                Welcome, {auth.user.firstName}
                            </Button>
                            <Button color="inherit" component={Link} to="/dashboard" sx={{ mx: 1 }}>
                                Dashboard
                            </Button>
                            <Button
                                color="inherit"
                                component={Link}
                                to="/labs"
                                sx={navbarStyles.button}
                            >
                                Labs
                            </Button>

                            <Button
                                color="inherit"
                                variant="outlined"
                                onClick={auth.logout}
                                sx={{ mx: 1 }}
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button color="inherit" component={Link} to="/login" sx={{ mx: 1 }}>
                                Login
                            </Button>
                            <Button
                                color="inherit"
                                component={Link}
                                to="/register"
                                sx={navbarStyles.registerButton}
                            >
                                Register
                            </Button>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}
