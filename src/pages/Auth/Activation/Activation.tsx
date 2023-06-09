import React, {useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Grid, Typography} from '@mui/material';
import {useTranslation} from 'react-i18next';

import {useAppDispatch} from '../../../redux/store';
import {activateUser} from '../../../redux/auth/thunks';

const Activation = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {activationToken} = useParams();
    const {t} = useTranslation();

    useEffect(() => {
        if (activationToken) {
            dispatch(activateUser(activationToken)).then(
                (res) => res.meta.requestStatus === 'fulfilled' && navigate('/'),
            );
        }
    }, [activationToken, dispatch, navigate]);

    return (
        <Grid container spacing={2} px={2} justifyContent="center" alignItems="center">
            <Grid item xs={12}>
                <Typography variant="h3">{t('welcomeToUseeSvit')}</Typography>
            </Grid>
        </Grid>
    );
};

export default Activation;
