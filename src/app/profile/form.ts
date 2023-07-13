import {object, string} from 'yup';
import { validatePasswordConfirmation } from '../common/yupValidationsUtils/validatePasswordConfirmation';

export const defaultNameValue = {
    newName: '',
};

export const defaultPasswordValue = {
    password: '',
    newPassword: '',
    passwordConfirmation: '',
};

export const nameValidation = object().shape({
    newName: string().required('New name is required'),
});

export const passwordValidation = object().shape({
    password: string().required(),
    newPassword: string().required(),
    passwordConfirmation: validatePasswordConfirmation('newPassword'),
});