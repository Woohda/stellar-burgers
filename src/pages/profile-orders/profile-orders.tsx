import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/hooks/appHooks';
import { getUserOrders, selectIsFetchUserPending } from '../../services/slices/user/UserSlice';
import { fetchUserOrders } from '../../services/slices/user/actions';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useAppDispatch();
  const userOrders: TOrder[] = useAppSelector(getUserOrders);
  const isPending = useAppSelector(selectIsFetchUserPending);
  
  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={userOrders} isLoading={isPending}/>
};
