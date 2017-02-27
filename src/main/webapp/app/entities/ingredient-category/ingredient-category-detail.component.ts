import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IngredientCategory } from './ingredient-category.model';
import { IngredientCategoryService } from './ingredient-category.service';

@Component({
    selector: 'jhi-ingredient-category-detail',
    templateUrl: './ingredient-category-detail.component.html'
})
export class IngredientCategoryDetailComponent implements OnInit, OnDestroy {

    ingredientCategory: IngredientCategory;
    private subscription: any;

    constructor(
        private ingredientCategoryService: IngredientCategoryService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.ingredientCategoryService.find(id).subscribe(ingredientCategory => {
            this.ingredientCategory = ingredientCategory;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
