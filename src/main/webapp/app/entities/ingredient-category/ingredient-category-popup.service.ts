import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { IngredientCategory } from './ingredient-category.model';
import { IngredientCategoryService } from './ingredient-category.service';
@Injectable()
export class IngredientCategoryPopupService {
    private isOpen = false;
    constructor (
        private modalService: NgbModal,
        private router: Router,
        private ingredientCategoryService: IngredientCategoryService

    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.ingredientCategoryService.find(id).subscribe(ingredientCategory => {
                this.ingredientCategoryModalRef(component, ingredientCategory);
            });
        } else {
            return this.ingredientCategoryModalRef(component, new IngredientCategory());
        }
    }

    ingredientCategoryModalRef(component: Component, ingredientCategory: IngredientCategory): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.ingredientCategory = ingredientCategory;
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
