import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { RecipeIngredients } from './recipe-ingredients.model';
import { RecipeIngredientsService } from './recipe-ingredients.service';
@Injectable()
export class RecipeIngredientsPopupService {
    private isOpen = false;
    constructor (
        private modalService: NgbModal,
        private router: Router,
        private recipeIngredientsService: RecipeIngredientsService

    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.recipeIngredientsService.find(id).subscribe(recipeIngredients => {
                this.recipeIngredientsModalRef(component, recipeIngredients);
            });
        } else {
            return this.recipeIngredientsModalRef(component, new RecipeIngredients());
        }
    }

    recipeIngredientsModalRef(component: Component, recipeIngredients: RecipeIngredients): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.recipeIngredients = recipeIngredients;
        modalRef.result.then(result => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        });
        return modalRef;
    }
}
