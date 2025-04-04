import { Card, CardContent, Typography } from "@mui/material";

interface UserInfoProps {
  name: string;
  lastName?: string; // Optional field for last name
  email: string;
}

const UserInfo = ({ name, email, lastName }: UserInfoProps) => {
  return (
    <Card sx={{ my: 2 }}>
      <CardContent>
        <Typography variant="h6">User Information</Typography>
        <Typography>Name: {name}</Typography>
        <Typography>Last Name:{lastName}</Typography>
        <Typography>Email: {email}</Typography>
      </CardContent>
    </Card>
  );
};

export default UserInfo;
