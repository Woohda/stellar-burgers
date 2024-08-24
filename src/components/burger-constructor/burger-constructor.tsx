import { FC } from 'react';
import { BurgerConstructorUI } from '@ui';
import { useAppSelector } from '../../services/hooks/appHooks';
import { getTotalPrice, selectIsConstructorItems, selectIsOrderModalData, selectIsPostRequestOrderPending } from '../../services/slices/constuctor/ConstructorSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useAppSelector(selectIsConstructorItems);
  const orderRequest = useAppSelector(selectIsPostRequestOrderPending);
  const orderModalData = useAppSelector(selectIsOrderModalData);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
  };
  const closeOrderModal = () => {};

const price = useAppSelector((state) => getTotalPrice(state));

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
