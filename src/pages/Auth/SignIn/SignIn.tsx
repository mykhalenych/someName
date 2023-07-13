import React from 'react';
import {useSelector} from 'react-redux';
import {useForm, FormProvider} from 'react-hook-form';
import {Grid, Typography} from '@mui/material';
import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

import {validation, defaultValues} from './form';
import InputControl from '../../../components/common/form/InputControl';
import Button from '../../../components/common/Button';
import {signInUser} from '../../../redux/auth/thunks';
import {useAppDispatch} from '../../../redux/store';
import {CHECK_EMAIL_PATH, LOGIN_PATH} from '../../../Routes/constants';
import {authThunkNames} from '../../../redux/auth/constants';
import {selectLoading} from '../../../redux/selectors';
import {ISlicesNames} from '../../../redux/types';
import {ISignInProps} from './types';

const SignIn = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {t} = useTranslation();
    const isLoadingLogIn = useSelector(selectLoading(ISlicesNames.auth, authThunkNames.logInUser));
    const isLoadingSignInUser = useSelector(selectLoading(ISlicesNames.auth, authThunkNames.signInUser));

    const methods = useForm<ISignInProps>({
        resolver: yupResolver(validation),
        defaultValues,
    });
    const {handleSubmit, control} = methods;

    const onSubmit = (data: ISignInProps) => {
        dispatch(signInUser(data)).then((res) => res.meta.requestStatus === 'fulfilled' && navigate(CHECK_EMAIL_PATH));
    };

    const handleRedirect = () => {
        navigate(LOGIN_PATH);
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2} px={2}>
                    <Grid item xs={12}>
                        <Typography variant="h2">{t('signUp.title')}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <InputControl control={control} label={t('yourName')} name="name" fullWidth />
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
                        <Button isLoading={isLoadingLogIn} onClick={handleRedirect} color="primary" minWidth={120}>
                            {t('logIn.btn')}
                        </Button>
                        <Button
                            isLoading={isLoadingSignInUser}
                            type="submit"
                            variant="contained"
                            color="primary"
                            minWidth={120}>
                            {t('signUp.btn')}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </FormProvider>
    );
};

export default SignIn;
