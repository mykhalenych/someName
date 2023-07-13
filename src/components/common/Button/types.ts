import React from 'react';

export interface CustomButtonProps {
    isLoading?: boolean;
    minWidth?: number;
    children: React.ReactNode;
    color: 'primary' | 'inherit' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
}
