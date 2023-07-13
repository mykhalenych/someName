import React from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {useForm, FormProvider} from 'react-hook-form';
import {Grid, Typography} from '@mui/material';
import {yupResolver} from '@hookform/resolvers/yup';
import {useTranslation} from 'react-i18next';

import {validation} from './form';
import {CHECK_EMAIL_PATH, LOGIN_PATH} from '../../../Routes/constants';
import {authThunkNames} from '../../../redux/auth/constants';
import {useAppDispatch} from '../../../redux/store';
import {forgotPassword} from '../../../redux/auth/thunks';
import InputControl from '../../../components/common/form/InputControl';
import Button from '../../../components/common/Button';
import {selectLoading} from '../../../redux/selectors';
import {IForgotPassProps} from './types';
import {ISlicesNames} from '../../../redux/types';

const ForgotPassword = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {t} = useTranslation();
    const isLoading = useSelector(selectLoading(ISlicesNames.auth, authThunkNames.forgotPassword));
    const methods = useForm<IForgotPassProps>({
        resolver: yupResolver(validation),
    });

    const {handleSubmit, control} = methods;

    const onSubmit = (data: IForgotPassProps) => {
        dispatch(forgotPassword(data)).then(
            (res) => res.meta.requestStatus === 'fulfilled' && navigate(CHECK_EMAIL_PATH),
        );
    };

    const handleRedirect = () => {
        navigate(LOGIN_PATH);
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Grid container spacing={2} px={2}>
                    <Grid item xs={12}>
                        <Typography variant="h2">{t('forgotPassword.title')}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <InputControl control={control} label={t('emailAddress')} name="email" fullWidth />
                    </Grid>
                    <Grid container item xs={12} justifyContent="space-between">
                        <Button isLoading={isLoading} onClick={handleRedirect} color="primary" minWidth={100}>
                            {t('logIn.btn')}
                        </Button>
                        <Button type="submit" variant="contained" color="primary" minWidth={180}>
                            {t('sendInstructions')}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </FormProvider>
    );
};

export default ForgotPassword;
