import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager } from 'ng-jhipster';

import { RecipeIngredients } from './recipe-ingredients.model';
import { RecipeIngredientsPopupService } from './recipe-ingredients-popup.service';
import { RecipeIngredientsService } from './recipe-ingredients.service';

@Component({
    selector: 'jhi-recipe-ingredients-delete-dialog',
    templateUrl: './recipe-ingredients-delete-dialog.component.html'
})
export class RecipeIngredientsDeleteDialogComponent {

    recipeIngredients: RecipeIngredients;

    constructor(
        private recipeIngredientsService: RecipeIngredientsService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.recipeIngredientsService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'recipeIngredientsListModification',
                content: 'Deleted an recipeIngredients'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-recipe-ingredients-delete-popup',
    template: ''
})
export class RecipeIngredientsDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private recipeIngredientsPopupService: RecipeIngredientsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.recipeIngredientsPopupService
                .open(RecipeIngredientsDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
