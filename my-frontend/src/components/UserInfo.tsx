import { Card, CardContent, Typography } from "@mui/material";

interface UserInfoProps {
  name: string;
  email: string;
}

const UserInfo = ({ name, email }: UserInfoProps) => {
  return (
    <Card sx={{ my: 2 }}>
      <CardContent>
        <Typography variant="h6">User Information</Typography>
        <Typography>Name: {name}</Typography>
        <Typography>Email: {email}</Typography>
      </CardContent>
    </Card>
  );
};

export default UserInfo;
