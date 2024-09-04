import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useAppDispatch, useAppSelector } from '../../services/hooks/appHooks';
import { loginUser } from '../../services/slices/user/actions';
import { Preloader } from '@ui';
import { getUserError, selectIsFetchUserPending } from '../../services/slices/user/UserSlice';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const errorText = useAppSelector(getUserError);
  const isPending = useAppSelector(selectIsFetchUserPending);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    isPending ? 
    <Preloader /> : 
    <LoginUI
      errorText={errorText?.toString()}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    /> 
  );
};
