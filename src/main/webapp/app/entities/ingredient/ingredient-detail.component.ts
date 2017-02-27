import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ingredient } from './ingredient.model';
import { IngredientService } from './ingredient.service';

@Component({
    selector: 'jhi-ingredient-detail',
    templateUrl: './ingredient-detail.component.html'
})
export class IngredientDetailComponent implements OnInit, OnDestroy {

    ingredient: Ingredient;
    private subscription: any;

    constructor(
        private ingredientService: IngredientService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.ingredientService.find(id).subscribe(ingredient => {
            this.ingredient = ingredient;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
