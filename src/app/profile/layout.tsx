'use client';

import { useEffect } from 'react';
import Image from 'next/image';

import {ContainerDiv} from './Styles';
import { fetchUser } from '../redux/auth/thunks';
import logInImage from '@images/logInImage.png';
import { useAppDispatch } from '../redux/store';
import { getAuthTokens } from '../common/utils';


type Props = {
    children: React.ReactNode;
};

const ProfileLayout: React.FC<Props> = ({children}) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const token = getAuthTokens();

        if (token) {
            dispatch(fetchUser());
        }
    }, [dispatch]);
    return (
        <ContainerDiv>
            <Image src={logInImage} alt={`image`} width={1000} height={1000} style={{height: '100%'}} />
            {children}
        </ContainerDiv>
    );
};

export default ProfileLayout;
