import { Ingredient } from '../ingredient';
export class IngredientCategory {
    constructor(
        public id?: number,
        public name?: string,
        public contains?: Ingredient,
    ) { }
}
