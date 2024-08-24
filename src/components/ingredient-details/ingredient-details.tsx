import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useAppSelector } from '../../services/hooks/appHooks';
import { getIngredients } from '../../services/slices/ingredients/IngredientsSlice';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const ingredients = useAppSelector(getIngredients)
  const { id } = useParams();
  const ingredientData = ingredients?.find((ingredient) => {
    if (ingredient._id === id) {
      return ingredient;
    }
  });

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
