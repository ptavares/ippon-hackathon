import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CookSmartSharedModule } from '../../shared';

import {
    IngredientService,
    IngredientPopupService,
    IngredientComponent,
    IngredientDetailComponent,
    IngredientDialogComponent,
    IngredientPopupComponent,
    IngredientDeletePopupComponent,
    IngredientDeleteDialogComponent,
    ingredientRoute,
    ingredientPopupRoute,
} from './';

let ENTITY_STATES = [
    ...ingredientRoute,
    ...ingredientPopupRoute,
];

@NgModule({
    imports: [
        CookSmartSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        IngredientComponent,
        IngredientDetailComponent,
        IngredientDialogComponent,
        IngredientDeleteDialogComponent,
        IngredientPopupComponent,
        IngredientDeletePopupComponent,
    ],
    entryComponents: [
        IngredientComponent,
        IngredientDialogComponent,
        IngredientPopupComponent,
        IngredientDeleteDialogComponent,
        IngredientDeletePopupComponent,
    ],
    providers: [
        IngredientService,
        IngredientPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CookSmartIngredientModule {}
