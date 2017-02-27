import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager } from 'ng-jhipster';

import { IngredientCategory } from './ingredient-category.model';
import { IngredientCategoryPopupService } from './ingredient-category-popup.service';
import { IngredientCategoryService } from './ingredient-category.service';

@Component({
    selector: 'jhi-ingredient-category-delete-dialog',
    templateUrl: './ingredient-category-delete-dialog.component.html'
})
export class IngredientCategoryDeleteDialogComponent {

    ingredientCategory: IngredientCategory;

    constructor(
        private ingredientCategoryService: IngredientCategoryService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.ingredientCategoryService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'ingredientCategoryListModification',
                content: 'Deleted an ingredientCategory'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-ingredient-category-delete-popup',
    template: ''
})
export class IngredientCategoryDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private ingredientCategoryPopupService: IngredientCategoryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.ingredientCategoryPopupService
                .open(IngredientCategoryDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
