import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CookSmartSharedModule } from '../../shared';

import {
    IngredientCategoryService,
    IngredientCategoryPopupService,
    IngredientCategoryComponent,
    IngredientCategoryDetailComponent,
    IngredientCategoryDialogComponent,
    IngredientCategoryPopupComponent,
    IngredientCategoryDeletePopupComponent,
    IngredientCategoryDeleteDialogComponent,
    ingredientCategoryRoute,
    ingredientCategoryPopupRoute,
} from './';

let ENTITY_STATES = [
    ...ingredientCategoryRoute,
    ...ingredientCategoryPopupRoute,
];

@NgModule({
    imports: [
        CookSmartSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        IngredientCategoryComponent,
        IngredientCategoryDetailComponent,
        IngredientCategoryDialogComponent,
        IngredientCategoryDeleteDialogComponent,
        IngredientCategoryPopupComponent,
        IngredientCategoryDeletePopupComponent,
    ],
    entryComponents: [
        IngredientCategoryComponent,
        IngredientCategoryDialogComponent,
        IngredientCategoryPopupComponent,
        IngredientCategoryDeleteDialogComponent,
        IngredientCategoryDeletePopupComponent,
    ],
    providers: [
        IngredientCategoryService,
        IngredientCategoryPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CookSmartIngredientCategoryModule {}
