'use client';

import React from 'react';
import {Grid, Typography} from '@mui/material';
// import {useNavigate} from 'react-router-dom';
import { useTranslation } from "react-i18next";
import Button from '../../common/Button';
import {useRouter} from 'next/navigation';

// import {PLAN_PATH} from '../../Routes/constants';

const Main = () => {
    const router = useRouter();
      const { t } = useTranslation();

    const handleRedirect = () => {
        router.push('/');
    };

    return (
        <Grid container alignItems="center" height="100%" flexDirection="column" py={2}>
            <Grid item xs={6}>
                <Typography variant="h2">{t("planYourTrip")}</Typography>
            </Grid>
            <Grid item xs={6}>
                <Button onClick={handleRedirect} color="primary">
                    {t("planYourTrip")}
                </Button>
            </Grid>
        </Grid>
    );
};

export default Main;
