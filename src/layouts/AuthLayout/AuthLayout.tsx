import React, {useEffect} from 'react';
import {Outlet} from 'react-router-dom';

import Navigation from '../../components/common/Navigation/Navigation';
import logInImage from '../../assets/img/logInImage.png';

import {ContainerDiv} from './Styles';
import {fetchUser} from '../../redux/auth/thunks';
import {useAppDispatch} from '../../redux/store';
import {getAuthTokens} from '../../common/utils';

const AuthLayout = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const token = getAuthTokens();

        if (token) {
            dispatch(fetchUser());
        }
    }, [dispatch]);
    return (
        <>
            <Navigation />
            <ContainerDiv>
                <img src={logInImage} alt={'logInImage'} />
                <Outlet />
            </ContainerDiv>
        </>
    );
};

export default AuthLayout;
