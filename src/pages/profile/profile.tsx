import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/hooks/appHooks';
import { getUser, getUserError, selectIsFetchUserPending } from '../../services/slices/user/UserSlice';
import { updateUser } from '../../services/slices/user/actions';

export const Profile: FC = () => {
  /** TODO: взять переменную из стора */
  const user = useAppSelector(getUser)
  const dispatch = useAppDispatch()
  const isPending = useAppSelector(selectIsFetchUserPending)
  const errorText = useAppSelector(getUserError)
  const [formValue, setFormValue] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  });

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(updateUser(formValue));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    if (user)
    setFormValue({
      name: user.name,
      email: user.email,
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
      updateUserError={errorText?.toString()}
      isLoading={isPending}
    />)
};
