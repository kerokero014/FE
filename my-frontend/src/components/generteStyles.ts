export const GenStyles = {
    Box: {
        mt: 2,
        p: 3,
        maxWidth: '500px',
        mx: 'auto',
        bgcolor: 'background.paper',
        boxShadow: 3,
        borderRadius: 2,
    },
    TextField: {
        mb: 2,
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'primary.main',
            },
            '&:hover fieldset': {
                borderColor: 'primary.dark',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'secondary.main',
            },
        },
        '& .MuiInputLabel-outlined': {
            color: 'text.secondary',
        },
        '&:hover .MuiInputLabel-outlined': {
            color: 'text.primary',
        },
        '& .MuiInputLabel-outlined.Mui-focused': {
            color: 'secondary.main',
        },
    },
    submitButton: {
        mt: 2,
        py: 1.5,
        px: 4,
        width: '100%',
        bgcolor: 'secondary.main',
        color: 'secondary.contrastText',
        borderRadius: 1,
        '&:hover': {
            bgcolor: 'secondary.dark',
        },
    },
    recipeBox: {
        mt: 3,
        p: 3,
        bgcolor: 'background.default',
        borderRadius: 2,
        boxShadow: 1,
    },
};
