import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { RecipeIngredients } from './recipe-ingredients.model';
import { RecipeIngredientsPopupService } from './recipe-ingredients-popup.service';
import { RecipeIngredientsService } from './recipe-ingredients.service';
import { Ingredient, IngredientService } from '../ingredient';
import { Recipe, RecipeService } from '../recipe';
@Component({
    selector: 'jhi-recipe-ingredients-dialog',
    templateUrl: './recipe-ingredients-dialog.component.html'
})
export class RecipeIngredientsDialogComponent implements OnInit {

    recipeIngredients: RecipeIngredients;
    authorities: any[];
    isSaving: boolean;

    ingredients: Ingredient[];

    recipes: Recipe[];
    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private recipeIngredientsService: RecipeIngredientsService,
        private ingredientService: IngredientService,
        private recipeService: RecipeService,
        private eventManager: EventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.ingredientService.query().subscribe(
            (res: Response) => { this.ingredients = res.json(); }, (res: Response) => this.onError(res.json()));
        this.recipeService.query().subscribe(
            (res: Response) => { this.recipes = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.recipeIngredients.id !== undefined) {
            this.recipeIngredientsService.update(this.recipeIngredients)
                .subscribe((res: RecipeIngredients) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.recipeIngredientsService.create(this.recipeIngredients)
                .subscribe((res: RecipeIngredients) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: RecipeIngredients) {
        this.eventManager.broadcast({ name: 'recipeIngredientsListModification', content: 'OK'});
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

    trackIngredientById(index: number, item: Ingredient) {
        return item.id;
    }

    trackRecipeById(index: number, item: Recipe) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-recipe-ingredients-popup',
    template: ''
})
export class RecipeIngredientsPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private recipeIngredientsPopupService: RecipeIngredientsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.recipeIngredientsPopupService
                    .open(RecipeIngredientsDialogComponent, params['id']);
            } else {
                this.modalRef = this.recipeIngredientsPopupService
                    .open(RecipeIngredientsDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
