import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resetPasswordApi } from '../../services/api/user/user';
import { ResetPasswordUI } from '@ui-pages';
import { Preloader } from '@ui';
import { selectIsFetchUserPending } from '../../services/slices/user/UserSlice';
import { useAppDispatch, useAppSelector } from '../../services/hooks/appHooks';
import { resetPassword } from '../../services/slices/user/actions';

export const ResetPassword: FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState<Error | null>(null);
  const isPending = useAppSelector(selectIsFetchUserPending);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setError(null);
    dispatch(resetPassword({ password, token }))
      .then(() => {
        localStorage.removeItem('resetPassword');
        navigate('/login');
      })
      .catch((err) => setError(err));
  };

  useEffect(() => {
    if (!localStorage.getItem('resetPassword')) {
      navigate('/forgot-password', { replace: true });
    }
  }, [navigate]);

  return (
    isPending ?
    <Preloader /> :
    <ResetPasswordUI
      errorText={error?.message}
      password={password}
      token={token}
      setPassword={setPassword}
      setToken={setToken}
      handleSubmit={handleSubmit}
    />
  );
};
