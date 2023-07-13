import React from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {useForm, FormProvider} from 'react-hook-form';
import {Grid, Typography} from '@mui/material';
import {yupResolver} from '@hookform/resolvers/yup';
import {useTranslation} from 'react-i18next';

import {validation, defaultValues} from './form';
import {useAppDispatch} from '../../../redux/store';
import {logInUser} from '../../../redux/auth/thunks';
import InputControl from '../../../components/common/form/InputControl';
import Button from '../../../components/common/Button';
import {FORGOT_PATH, SIGN_IN_PATH} from '../../../Routes/constants';
import {authThunkNames} from '../../../redux/auth/constants';
import {selectLoading} from '../../../redux/selectors';
import {ISlicesNames} from '../../../redux/types';
import {ILoginProps} from './types';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {t} = useTranslation();
    const isLoading = useSelector(selectLoading(ISlicesNames.auth, authThunkNames.logInUser));

    const methods = useForm<ILoginProps>({
        resolver: yupResolver(validation),
        defaultValues,
    });
    const {handleSubmit, control} = methods;

    const onSubmit = (data: ILoginProps) => {
        dispatch(logInUser(data)).then((res) => res.meta.requestStatus === 'fulfilled' && navigate('/'));
    };

    const handleRedirect = (path: string) => {
        navigate(path);
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Grid container px={2} spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h2">{t('logIn.title')}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <InputControl control={control} label={t('emailAddress')} name="email" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <InputControl
                            control={control}
                            label={t('password')}
                            type="password"
                            name="password"
                            fullWidth
                        />
                    </Grid>
                    <Grid container item xs={12} justifyContent="space-between">
                        <Button onClick={() => handleRedirect(SIGN_IN_PATH)} color="primary" minWidth={100}>
                            {t('signUp.btn')}
                        </Button>
                        <Button
                            onClick={() => handleRedirect(FORGOT_PATH)}
                            variant="text"
                            color="primary"
                            minWidth={180}>
                            {t('forgotPassword.btn')}
                        </Button>
                        <Button isLoading={isLoading} type="submit" variant="contained" color="primary" minWidth={100}>
                            {t('logIn.btn')}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </FormProvider>
    );
};

export default Login;
