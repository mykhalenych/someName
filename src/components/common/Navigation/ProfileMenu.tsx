import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {useTranslation} from 'react-i18next';

import {resetAuthToken} from '../../../common/utils';
import {logoutUser} from '../../../redux/auth/thunks';
import {useAppDispatch} from '../../../redux/store';
import {useNavigate} from 'react-router-dom';
import {PROFILE_PATH} from '../../../Routes/constants';
import {Progress} from '../loader/Progress';

interface IProps {
    anchorEl: HTMLElement | null;
    handleClose: () => void;
}

const ProfileMenu: React.FC<IProps> = ({handleClose, anchorEl}) => {
    const [isLoading, setIsLoading] = React.useState(false);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {t} = useTranslation();

    const handleLogout = () => {
        setIsLoading(true);

        dispatch(logoutUser()).then((res) => {
            if (res.meta.requestStatus === 'fulfilled') {
                resetAuthToken();
                handleClose();
            }
            setIsLoading(false);
        });
    };

    const handleProfile = () => navigate(PROFILE_PATH);

    return (
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}>
            {isLoading && <Progress />}
            <MenuItem onClick={handleProfile}>{t('profileMenu.profile')}</MenuItem>
            <MenuItem onClick={handleClose}>{t('profileMenu.myAccount')}</MenuItem>
            <MenuItem onClick={handleLogout}>{t('profileMenu.logOut')}</MenuItem>
        </Menu>
    );
};

export default ProfileMenu;
