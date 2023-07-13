import React from 'react';
import {useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import {Grid, Typography} from '@mui/material';
import {useForm, FormProvider} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useTranslation} from 'react-i18next';

import {useAppDispatch} from '../../../redux/store';
import {newPassword} from '../../../redux/auth/thunks';
import InputControl from '../../../components/common/form/InputControl';
import {defaultValues, validation} from './form';
import Button from '../../../components/common/Button';
import {LOGIN_PATH} from '../../../Routes/constants';
import {authThunkNames} from '../../../redux/auth/constants';
import {selectLoading} from '../../../redux/selectors';
import {ISlicesNames} from '../../../redux/types';
import {PasswordProps} from './types';

const RecoveryPassword = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {resetToken} = useParams();
    const {t} = useTranslation();
    const isLoading = useSelector(
        selectLoading(ISlicesNames.auth, [authThunkNames.changePassword, authThunkNames.forgotPassword]),
    );
    const methods = useForm<PasswordProps>({
        resolver: yupResolver(validation),
        defaultValues,
    });
    const {handleSubmit, control} = methods;

    const handleRedirect = (path: string) => {
        navigate(path);
    };

    const onSubmit = (data: PasswordProps) => {
        if (resetToken) {
            const dataWithToken = {...data, resetToken};

            dispatch(newPassword(dataWithToken)).then(
                (res) => res.meta.requestStatus === 'fulfilled' && navigate(LOGIN_PATH),
            );
        }
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container px={2} spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h2">{t('recoveryPassword.title')}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <InputControl
                            control={control}
                            label={t('recoveryPassword.newPassword')}
                            type="password"
                            name="newPassword"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <InputControl
                            control={control}
                            label={t('recoveryPassword.confirmPassword')}
                            type="password"
                            name="passwordConfirmation"
                            fullWidth
                        />
                    </Grid>
                    <Grid container item xs={12} justifyContent="space-between">
                        <Button isLoading={isLoading} type="submit" variant="contained" color="primary" minWidth={100}>
                            {t('recoveryPassword.btnSave')}
                        </Button>
                        <Button
                            isLoading={isLoading}
                            onClick={() => handleRedirect('/')}
                            color="primary"
                            minWidth={100}>
                            {t('recoveryPassword.btnCancel')}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </FormProvider>
    );
};

export default RecoveryPassword;
