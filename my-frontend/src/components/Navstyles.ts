export const navbarStyles = {
    appBar: {
        bgcolor: 'primary.main',
        boxShadow: 2,
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    title: {
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    button: {
        mx: 1,
        fontWeight: 'bold',
    },
    registerButton: {
        mx: 1,
        border: '1px solid white',
        borderRadius: 2,
    },
    logoButton: {
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 1,
        textDecoration: 'none',
        color: 'inherit',
        '&:visited': {
            color: 'inherit',
        },
    },
};
