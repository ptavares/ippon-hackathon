import { RecipeIngredients } from '../recipe-ingredients';
export class Recipe {
    constructor(
        public id?: number,
        public name?: string,
        public contains?: RecipeIngredients,
    ) { }
}
