import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { Recipe } from './recipe.model';
import { RecipePopupService } from './recipe-popup.service';
import { RecipeService } from './recipe.service';
import { RecipeIngredients, RecipeIngredientsService } from '../recipe-ingredients';
@Component({
    selector: 'jhi-recipe-dialog',
    templateUrl: './recipe-dialog.component.html'
})
export class RecipeDialogComponent implements OnInit {

    recipe: Recipe;
    authorities: any[];
    isSaving: boolean;

    recipeingredients: RecipeIngredients[];
    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private recipeService: RecipeService,
        private recipeIngredientsService: RecipeIngredientsService,
        private eventManager: EventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.recipeIngredientsService.query().subscribe(
            (res: Response) => { this.recipeingredients = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.recipe.id !== undefined) {
            this.recipeService.update(this.recipe)
                .subscribe((res: Recipe) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.recipeService.create(this.recipe)
                .subscribe((res: Recipe) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: Recipe) {
        this.eventManager.broadcast({ name: 'recipeListModification', content: 'OK'});
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

    trackRecipeIngredientsById(index: number, item: RecipeIngredients) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-recipe-popup',
    template: ''
})
export class RecipePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private recipePopupService: RecipePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.recipePopupService
                    .open(RecipeDialogComponent, params['id']);
            } else {
                this.modalRef = this.recipePopupService
                    .open(RecipeDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
