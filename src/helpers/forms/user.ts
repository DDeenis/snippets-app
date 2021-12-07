import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup/dist/yup';

export interface UserProfileForm {
  firstName: string;
  lastName: string;
  email: string;
}

const userSchema = yup.object({
  firstName: yup.string().max(100).required(),
  lastName: yup.string().max(100).required(),
  email: yup.string().email().required(),
});

export const userResolver = yupResolver(userSchema);
