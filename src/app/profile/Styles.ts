import {styled} from '@mui/material/styles';

export const ContainerDiv = styled('div')(({theme}) => ({
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.paper,
    height: 'calc(100vh - 80px)',

    '& img': {
        width: '50%',
        [theme.breakpoints.down(theme.breakpoints.values.md)]: {
            display: 'none',
        },
    },
    '& > form': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        width: '50%',
        [theme.breakpoints.down(theme.breakpoints.values.md)]: {
            width: '100%',
        },
    },
    '& > div': {
        width: '50%',
        [theme.breakpoints.down(theme.breakpoints.values.md)]: {
            width: '100%',
        },
    },
}));
