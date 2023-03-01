import { createAsyncThunk } from '@reduxjs/toolkit';
import { GlobalError, LoginMutation, RegisterMutation, RegisterResponse, User, ValidationError } from '../../types';
import axiosApi from '../../axiosApi';
import { isAxiosError } from 'axios';
import { RootState } from '../../app/store';

export const register = createAsyncThunk<User, RegisterMutation, {rejectValue: ValidationError}>(
  'users/register',
  async (registerMutation, {rejectWithValue}) => {
  try {
    const response = await axiosApi.post<RegisterResponse>('/users', registerMutation);
    return response.data.user;
  } catch (e) {
    if(isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as ValidationError);
    }
    throw e;
  }
  }
);

export const login = createAsyncThunk<User, LoginMutation, {rejectValue: GlobalError}>(
  'users/login',
  async (loginMutation, {rejectWithValue}) => {
    try {
      const response = await axiosApi.post<RegisterResponse>('/users/sessions', loginMutation);
      return response.data.user;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as GlobalError);
      }
      throw e;
    }
  }
);

export const secret = createAsyncThunk<void, void, {state: RootState}> (
  'users/secret',
  async (_, {getState}) => {
    const user = getState().users.user;

    if(user) {
      return axiosApi.post('users/secret', null, {headers: {'Authorization': user.token}});
    }
  }
);