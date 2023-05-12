import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useForm, FormProvider} from 'react-hook-form';
import {Grid, Typography} from '@mui/material';
import {yupResolver} from '@hookform/resolvers/yup';

import {validation, defaultValues} from './form';
import {ILoginProps} from './types';
import {logInUser} from '../../../redux/auth/thunks';
import InputControl from '../../../components/common/form/InputControl';
import Button from '../../../components/common/Button';
import {FORGOT_PATH, SIGN_IN_PATH} from '../../../Routes/constants';
import {useAppDispatch} from '../../../redux/store';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

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
                        <Typography variant="h2">Log In</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <InputControl control={control} label="Email adress" name="email" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <InputControl control={control} label="Password" type="password" name="password" fullWidth />
                    </Grid>
                    <Grid container item xs={12} justifyContent="space-between">
                        <Button onClick={() => handleRedirect(SIGN_IN_PATH)} color="primary" minWidth={100}>
                            Sign In
                        </Button>
                        <Button
                            onClick={() => handleRedirect(FORGOT_PATH)}
                            variant="text"
                            color="primary"
                            minWidth={180}>
                            Forgot password
                        </Button>
                        <Button type="submit" variant="contained" color="primary" minWidth={100}>
                            Login
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </FormProvider>
    );
};

export default Login;
