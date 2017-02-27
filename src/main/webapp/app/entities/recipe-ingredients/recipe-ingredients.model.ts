
const enum Unity {
    'QUANTITY',
    'GR',
    'ML'

};
import { Ingredient } from '../ingredient';
import { Recipe } from '../recipe';
export class RecipeIngredients {
    constructor(
        public id?: number,
        public quantity?: number,
        public unity?: Unity,
        public ingredient?: Ingredient,
        public recipe?: Recipe,
    ) { }
}
