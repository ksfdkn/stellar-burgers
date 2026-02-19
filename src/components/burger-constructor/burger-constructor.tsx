import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import {
  selectBurgerConstructor,
  clearBurgerConstructor
} from '../../services/slices/burgerConstructor/burgerConstructorSlice';
import {
  selectLoading as selectOrderLoading,
  selectOrderModalData,
  selectIsOrderLoading as selectIsOrderCreating,
  clearOrder
} from '../../services/slices/order/orderSlice';
import { createOrder } from '../../services/slices/order/thunks/createOrder';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  /*const constructorItems = {
    bun: {
      price: 0
    },
    ingredients: []
  };*/
  const { bun, ingredients } = useSelector(selectBurgerConstructor);
  const orderRequest = useSelector(selectIsOrderCreating); //туду слайс
  const orderModalData = useSelector(selectOrderModalData); // туду слайс

  const dispatch = useDispatch();

  const onOrderClick = () => {
    if (!bun || orderRequest) return; //туду слайс

    const ingredientsIds = [
      bun._id,
      ...ingredients.map((ingredient) => ingredient._id),
      bun._id
    ];

    dispatch(createOrder(ingredientsIds));
  };

  const closeOrderModal = () => {
    dispatch(clearBurgerConstructor());
    dispatch(clearOrder());
  };

  /* const price = useMemo(
     () =>
       (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
       constructorItems.ingredients.reduce(
         (s: number, v: TConstructorIngredient) => s + v.price,
         0
       ),
     [constructorItems]
   );*/
  const price = useMemo(() => {
    const bunPrice = bun ? bun.price * 2 : 0;
    const ingredientsPrice = ingredients.reduce(
      (sum: number, ingredient: TConstructorIngredient): number =>
        sum + ingredient.price,
      0
    );

    return bunPrice + ingredientsPrice;
  }, [bun, ingredients]);

  const constructorItems = {
    bun,
    ingredients
  };

  //return null;

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
