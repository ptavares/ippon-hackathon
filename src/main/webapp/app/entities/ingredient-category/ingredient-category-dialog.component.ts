import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { IngredientCategory } from './ingredient-category.model';
import { IngredientCategoryPopupService } from './ingredient-category-popup.service';
import { IngredientCategoryService } from './ingredient-category.service';
import { Ingredient, IngredientService } from '../ingredient';
@Component({
    selector: 'jhi-ingredient-category-dialog',
    templateUrl: './ingredient-category-dialog.component.html'
})
export class IngredientCategoryDialogComponent implements OnInit {

    ingredientCategory: IngredientCategory;
    authorities: any[];
    isSaving: boolean;

    ingredients: Ingredient[];
    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private ingredientCategoryService: IngredientCategoryService,
        private ingredientService: IngredientService,
        private eventManager: EventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.ingredientService.query().subscribe(
            (res: Response) => { this.ingredients = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.ingredientCategory.id !== undefined) {
            this.ingredientCategoryService.update(this.ingredientCategory)
                .subscribe((res: IngredientCategory) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.ingredientCategoryService.create(this.ingredientCategory)
                .subscribe((res: IngredientCategory) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: IngredientCategory) {
        this.eventManager.broadcast({ name: 'ingredientCategoryListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-ingredient-category-popup',
    template: ''
})
export class IngredientCategoryPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private ingredientCategoryPopupService: IngredientCategoryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.ingredientCategoryPopupService
                    .open(IngredientCategoryDialogComponent, params['id']);
            } else {
                this.modalRef = this.ingredientCategoryPopupService
                    .open(IngredientCategoryDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
