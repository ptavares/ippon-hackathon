import { IngredientCategory } from '../ingredient-category';
import { RecipeIngredients } from '../recipe-ingredients';
export class Ingredient {
    constructor(
        public id?: number,
        public name?: string,
        public ingredientCategory?: IngredientCategory,
        public included?: RecipeIngredients,
    ) { }
}
