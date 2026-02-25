import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import { clearBurgerConstructor } from '../../services/slices/burgerConstructor/burgerConstructorSlice';
import { selectBurgerConstructor } from '../../services/slices/burgerConstructor/selectors';
import { clearOrder } from '../../services/slices/order/orderSlice';
import {
  selectOrderModalData,
  selectIsOrderLoading as selectIsOrderCreating
} from '../../services/slices/order/selectors';
import { createOrder } from '../../services/slices/order/thunks/createOrder';
import { selectIsAuth } from '../../services/slices/user/selectors';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора done */
  const { bun, ingredients } = useSelector(selectBurgerConstructor);

  const orderRequest = useSelector(selectIsOrderCreating);
  const orderModalData = useSelector(selectOrderModalData);
  const isAuth = useSelector(selectIsAuth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onOrderClick = () => {
    if (!isAuth) {
      navigate('/login', {
        state: { from: '/' }
      });
      return;
    }

    if (!bun || orderRequest) return;

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
