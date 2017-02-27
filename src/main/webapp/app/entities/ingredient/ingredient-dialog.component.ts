import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { Ingredient } from './ingredient.model';
import { IngredientPopupService } from './ingredient-popup.service';
import { IngredientService } from './ingredient.service';
import { IngredientCategory, IngredientCategoryService } from '../ingredient-category';
import { RecipeIngredients, RecipeIngredientsService } from '../recipe-ingredients';
@Component({
    selector: 'jhi-ingredient-dialog',
    templateUrl: './ingredient-dialog.component.html'
})
export class IngredientDialogComponent implements OnInit {

    ingredient: Ingredient;
    authorities: any[];
    isSaving: boolean;

    ingredientcategories: IngredientCategory[];

    recipeingredients: RecipeIngredients[];
    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private ingredientService: IngredientService,
        private ingredientCategoryService: IngredientCategoryService,
        private recipeIngredientsService: RecipeIngredientsService,
        private eventManager: EventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.ingredientCategoryService.query().subscribe(
            (res: Response) => { this.ingredientcategories = res.json(); }, (res: Response) => this.onError(res.json()));
        this.recipeIngredientsService.query().subscribe(
            (res: Response) => { this.recipeingredients = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.ingredient.id !== undefined) {
            this.ingredientService.update(this.ingredient)
                .subscribe((res: Ingredient) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.ingredientService.create(this.ingredient)
                .subscribe((res: Ingredient) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: Ingredient) {
        this.eventManager.broadcast({ name: 'ingredientListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError (error) {
        this.isSaving = false;
        this.onError(error);
    }

    private onError (error) {
        this.alertService.error(error.message, null, null);
    }

    trackIngredientCategoryById(index: number, item: IngredientCategory) {
        return item.id;
    }

    trackRecipeIngredientsById(index: number, item: RecipeIngredients) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-ingredient-popup',
    template: ''
})
export class IngredientPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private ingredientPopupService: IngredientPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.ingredientPopupService
                    .open(IngredientDialogComponent, params['id']);
            } else {
                this.modalRef = this.ingredientPopupService
                    .open(IngredientDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
