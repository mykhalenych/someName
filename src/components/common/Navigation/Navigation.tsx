import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {Grid, IconButton} from '@mui/material';
import {changeLanguage} from 'i18next';

import {ReactComponent as ProfileIcon} from '../../../assets/icons/profile.svg';
import {ReactComponent as LogoIcon} from '../../../assets/icons/logo.svg';
import {ReactComponent as PlanetIcon} from '../../../assets/icons/planet.svg';
import {ReactComponent as DarkModeIcon} from '../../../assets/icons/darkMode.svg';
import {ReactComponent as LightModeIcon} from '../../../assets/icons/lightMode.svg';
import {useAppDispatch} from '../../../redux/store';
import {selectUser} from '../../../redux/auth/selectors';
import {changeUserLanguage, changeUserTheme} from '../../../redux/auth/thunks';
import {LOGIN_PATH} from '../../../Routes/constants';
import ProfileMenu from './ProfileMenu';
import Select from '../inputs/Select';
import {IThemeNames} from '../../../redux/common/types';

import {BackgroundDiv} from './Styles';

const Navigation = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user = useSelector(selectUser);

    const handleRedirect = (path: string) => {
        navigate(path);
    };

    const handleThemeChange = () => {
        dispatch(changeUserTheme(user.theme === IThemeNames.light ? IThemeNames.dark : IThemeNames.light));
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLanguage = (value: string) => {
        if (value === user.language) return;

        dispatch(changeUserLanguage(value)).then((res) => {
            res.meta.requestStatus === 'fulfilled' && changeLanguage(res.payload as string);
        });
    };

    return (
        <BackgroundDiv>
            <Grid container justifyContent="space-between" px={2}>
                <Grid item display="flex" alignItems="center">
                    {user.id && (
                        <>
                            <IconButton color="primary" onClick={handleThemeChange}>
                                {user.theme === IThemeNames.light ? <DarkModeIcon /> : <LightModeIcon />}
                            </IconButton>
                            <IconButton color="primary" onClick={() => setIsEditing(true)}>
                                <PlanetIcon />
                            </IconButton>
                            {isEditing && (
                                <Select
                                    defaultValue={user.language}
                                    parentOnChange={(value) => handleLanguage(value)}
                                    name="language"
                                    options={[
                                        {id: 'en', displayName: 'English'},
                                        {id: 'ua', displayName: 'Ukrainian'},
                                    ]}
                                    label="Translation"
                                />
                            )}
                        </>
                    )}
                </Grid>
                <IconButton color="primary" onClick={() => handleRedirect('/')}>
                    <LogoIcon />
                </IconButton>
                <Grid item display="flex" alignItems="center">
                    {!user.id ? (
                        <IconButton color="primary" onClick={() => handleRedirect(LOGIN_PATH)}>
                            <ProfileIcon />
                        </IconButton>
                    ) : (
                        <IconButton color="primary" onClick={handleMenuOpen}>
                            <ProfileIcon />
                        </IconButton>
                    )}
                    {anchorEl && <ProfileMenu handleClose={handleClose} anchorEl={anchorEl} />}
                </Grid>
            </Grid>
        </BackgroundDiv>
    );
};

export default Navigation;
