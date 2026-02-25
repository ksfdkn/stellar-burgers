import { FC, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import {
  selectIngredients,
  selectIngredientsLoading
} from '../../services/slices/ingredients/ingredientsSlice';
import { NotFound404 } from '@pages';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора done?*/
  const { id } = useParams();
  const ingredients = useSelector(selectIngredients);
  const loading = useSelector(selectIngredientsLoading);

  const ingredientData = useMemo(
    () => ingredients.find((ingredient) => ingredient._id === id),
    [ingredients, id]
  );

  if (loading) {
    return <Preloader />;
  }

  if (!ingredientData) {
    return <NotFound404 />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
