import { FC } from 'react';
import { BurgerConstructorUI } from '@ui';
import { useAppDispatch, useAppSelector } from '../../services/hooks/appHooks';
import { 
  getFormatedUserOrder,
  getTotalPrice, 
  resetOrderModal, 
  selectIsConstructorItems, 
  selectIsOrderModalData, 
  selectIsPostRequestOrderPending } from '../../services/slices/constuctor/ConstructorSlice';
import { getUser } from '../../services/slices/user/UserSlice';
import postRequestOrder from '../../services/slices/constuctor/actions';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const user = useAppSelector(getUser);
  const userOrder= useAppSelector(getFormatedUserOrder);
  const price = useAppSelector((state) => getTotalPrice(state));
  const constructorItems = useAppSelector(selectIsConstructorItems);
  const orderRequest = useAppSelector(selectIsPostRequestOrderPending);
  const orderModalData = useAppSelector(selectIsOrderModalData);

  const onOrderClick = () => {
    if (constructorItems.bun && user) {
      dispatch(postRequestOrder(userOrder))
    }
    if (!user) {
      navigate('/login');
    }
  };

  const closeOrderModal = () => {
    dispatch(resetOrderModal());
  };

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
