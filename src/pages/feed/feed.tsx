import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/hooks/appHooks';
import { getFeedOrders, selectIsFetchFeedPending } from '../../services/slices/feed/FeedSlice';
import {fetchFeeds} from '../../services/slices/feed/actions';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useAppSelector(getFeedOrders);
  const dispatch = useAppDispatch(); 
  const isPending = useAppSelector(selectIsFetchFeedPending);
  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={() => {dispatch(fetchFeeds())}} isPending={isPending} />;
};
