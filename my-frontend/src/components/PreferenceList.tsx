import { Card, CardContent, Typography, List, ListItem } from '@mui/material';

interface PreferencesListProps {
    preferences: string[];
}

const PreferencesList = ({ preferences }: PreferencesListProps) => {
    return (
        <Card sx={{ my: 2 }}>
            <CardContent>
                <Typography variant="h6">Preferences</Typography>
                <List>
                    {preferences.length > 0 ? (
                        preferences.map((preference, index) => (
                            <ListItem key={index}>{preference}</ListItem>
                        ))
                    ) : (
                        <Typography>No preferences set.</Typography>
                    )}
                </List>
            </CardContent>
        </Card>
    );
};

export default PreferencesList;
