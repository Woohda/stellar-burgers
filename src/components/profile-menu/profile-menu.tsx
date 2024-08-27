import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { Preloader, ProfileMenuUI } from '@ui';
import { useAppDispatch, useAppSelector } from '../../services/hooks/appHooks';
import { logoutUser } from '../../services/slices/user/actions';
import { selectIsFetchUserPending } from '../../services/slices/user/UserSlice';



export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const isPending = useAppSelector(selectIsFetchUserPending);

  const handleLogout = () => {
      dispatch(logoutUser());
  };

  return  <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />

};
