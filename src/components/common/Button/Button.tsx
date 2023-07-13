import React from 'react';
import {CircularProgress, type ButtonProps} from '@mui/material';

import StyledButton from './Styles';
import {CustomButtonProps} from './types';
import {Progress} from '../loader/Progress';

const Button: React.FC<CustomButtonProps & ButtonProps> = ({
    minWidth = 240,

    isLoading = false,
    variant = 'outlined',
    color = 'primary',
    children,
    ...rest
}) => {
    return (
        <StyledButton sx={{minWidth: minWidth}} variant={variant} color={color} {...rest}>
            {isLoading ? <CircularProgress size={35} thickness={5} /> : children}
        </StyledButton>
    );
};

export default Button;
