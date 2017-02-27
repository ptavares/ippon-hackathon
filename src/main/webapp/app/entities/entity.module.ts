import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CookSmartIngredientModule } from './ingredient/ingredient.module';
import { CookSmartIngredientCategoryModule } from './ingredient-category/ingredient-category.module';
import { CookSmartRecipeModule } from './recipe/recipe.module';
import { CookSmartRecipeIngredientsModule } from './recipe-ingredients/recipe-ingredients.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        CookSmartIngredientModule,
        CookSmartIngredientCategoryModule,
        CookSmartRecipeModule,
        CookSmartRecipeIngredientsModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CookSmartEntityModule {}
