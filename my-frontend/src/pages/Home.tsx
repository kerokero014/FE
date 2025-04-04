import { motion } from 'framer-motion';
import { Button, Container, Typography, Box, Grid, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import { homeStyles } from './styles/homeStyles';
import useAuth from '../hooks/useAuth';

const Home = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    return (
        <Box>
            <Box sx={homeStyles.homeBox}>
                <Container>
                    <motion.div
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                    >
                        <Box sx={homeStyles.homeContainer}>
                            <Typography variant="h2" fontWeight="bold" gutterBottom>
                                AI-Powered Recipe Generator
                            </Typography>
                            <Typography variant="h5" sx={{ mb: 4 }}>
                                Personalize your meals and discover new recipes tailored to your
                                taste.
                            </Typography>
                            {user ? (
                                <>
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            sx={homeStyles.loggedinButton}
                                            onClick={() => navigate('/dashboard')}
                                        >
                                            Go to Dashboard
                                        </Button>
                                    </motion.div>
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            sx={homeStyles.secondaryLoggedinButton}
                                            onClick={() => navigate('/labs')}
                                        >
                                            Go to Labs
                                        </Button>
                                    </motion.div>
                                </>
                            ) : (
                                <>
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            sx={{ px: 4, py: 1.2, fontSize: '1rem' }}
                                            onClick={() => navigate('/login')}
                                        >
                                            Log In
                                        </Button>
                                    </motion.div>
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            sx={{ px: 4, py: 1.2, fontSize: '1rem', mt: 2 }}
                                            onClick={() => navigate('/register')}
                                        >
                                            Register
                                        </Button>
                                    </motion.div>
                                </>
                            )}
                        </Box>
                    </motion.div>
                </Container>
            </Box>

            {/* Features Section */}
            <Container sx={{ my: 10 }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                >
                    <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
                        Why Choose Our App?
                    </Typography>
                </motion.div>

                <Grid container spacing={4} sx={{ mt: 3 }}>
                    {[
                        {
                            icon: <RestaurantIcon sx={{ fontSize: 50, color: 'primary.main' }} />,
                            title: 'Personalized Meal Plans',
                            text: 'Get AI-curated meal plans based on your dietary preferences.',
                        },
                        {
                            icon: <FastfoodIcon sx={{ fontSize: 50, color: 'secondary.main' }} />,
                            title: 'Smart Ingredient Suggestions',
                            text: "Enter your ingredients, and we'll suggest the best recipes!",
                        },
                        {
                            icon: <LocalDiningIcon sx={{ fontSize: 50, color: 'success.main' }} />,
                            title: 'Nutritional Breakdown',
                            text: 'Know exactly what’s in your food with detailed nutrition facts.',
                        },
                    ].map((feature, index) => (
                        <Grid key={index}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.7, delay: index * 0.2 }}
                            >
                                <Card sx={homeStyles.featuredCard}>
                                    {feature.icon}
                                    <CardContent>
                                        <Typography variant="h6" fontWeight="bold">
                                            {feature.title}
                                        </Typography>
                                        <Typography variant="body1">{feature.text}</Typography>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* Call to Action Section */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                <Box sx={homeStyles.homeAction}>
                    <Container>
                        <Typography variant="h4" fontWeight="bold">
                            Ready to Get Started?
                        </Typography>
                        <Typography variant="h6" sx={{ mb: 3 }}>
                            Sign up now and let AI craft your perfect meal plan!
                        </Typography>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                                variant="contained"
                                color="secondary"
                                sx={{ px: 4, py: 1.2, fontSize: '1rem' }}
                                onClick={() => navigate('/register')}
                            >
                                Join Now
                            </Button>
                        </motion.div>
                    </Container>
                </Box>
            </motion.div>
        </Box>
    );
};

export default Home;
