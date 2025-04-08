import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Typography } from "@mui/material";
import useAuth from "../hooks/useAuth";
import useUserProfile from "../hooks/useUserProfile";

const Dashboard = () => {
  const { user, logout } = useAuth(); // Get the user from context (AuthProvider)
  const navigate = useNavigate();

  const { userData, loading, error } = useUserProfile(user?.id);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (loading) return <Typography>Loading...</Typography>;

  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Welcome, {userData?.firstName}!
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Here, you can manage your dietary profile and generate AI-powered
        recipes.
      </Typography>
      <Button variant="contained" color="secondary" onClick={logout}>
        Logout
      </Button>
    </Container>
  );
};

export default Dashboard;

// TODO: Improve the UI and add more features to the dashboard.