import { FC, useState, SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ForgotPasswordUI } from '@ui-pages';
import { useAppDispatch, useAppSelector } from '../../services/hooks/appHooks';
import { selectIsFetchUserPending } from '../../services/slices/user/UserSlice';
import { forgotPassword } from '../../services/slices/user/actions';
import { Preloader } from '@ui';


export const ForgotPassword: FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<Error | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isPending = useAppSelector(selectIsFetchUserPending);
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setError(null);
    dispatch(forgotPassword({ email }))
      .then(() => {
        localStorage.setItem('resetPassword', 'true');
        navigate('/reset-password', { replace: true });
      })
      .catch((err) => setError(err));
  };

  return (
    isPending ? <Preloader /> :
    <ForgotPasswordUI
      errorText={error?.message}
      email={email}
      setEmail={setEmail}
      handleSubmit={handleSubmit}
    />
  );
};
