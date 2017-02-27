import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CookSmartSharedModule } from '../../shared';

import {
    RecipeIngredientsService,
    RecipeIngredientsPopupService,
    RecipeIngredientsComponent,
    RecipeIngredientsDetailComponent,
    RecipeIngredientsDialogComponent,
    RecipeIngredientsPopupComponent,
    RecipeIngredientsDeletePopupComponent,
    RecipeIngredientsDeleteDialogComponent,
    recipeIngredientsRoute,
    recipeIngredientsPopupRoute,
} from './';

let ENTITY_STATES = [
    ...recipeIngredientsRoute,
    ...recipeIngredientsPopupRoute,
];

@NgModule({
    imports: [
        CookSmartSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        RecipeIngredientsComponent,
        RecipeIngredientsDetailComponent,
        RecipeIngredientsDialogComponent,
        RecipeIngredientsDeleteDialogComponent,
        RecipeIngredientsPopupComponent,
        RecipeIngredientsDeletePopupComponent,
    ],
    entryComponents: [
        RecipeIngredientsComponent,
        RecipeIngredientsDialogComponent,
        RecipeIngredientsPopupComponent,
        RecipeIngredientsDeleteDialogComponent,
        RecipeIngredientsDeletePopupComponent,
    ],
    providers: [
        RecipeIngredientsService,
        RecipeIngredientsPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CookSmartRecipeIngredientsModule {}
