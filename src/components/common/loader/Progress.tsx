import React, {useEffect} from 'react';
import {CircularProgress} from '@mui/material';

import {BoxLoader} from './Styles';

export const Progress = () => {
    const [level, setLevel] = React.useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setLevel((newLevel) => (newLevel >= 100 ? 0 : newLevel + 10));
        }, 400);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <BoxLoader>
            <CircularProgress variant="determinate" value={level} color="inherit" size={60} thickness={3} />
        </BoxLoader>
    );
};
