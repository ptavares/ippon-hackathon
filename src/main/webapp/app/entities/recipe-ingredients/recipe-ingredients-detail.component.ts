import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeIngredients } from './recipe-ingredients.model';
import { RecipeIngredientsService } from './recipe-ingredients.service';

@Component({
    selector: 'jhi-recipe-ingredients-detail',
    templateUrl: './recipe-ingredients-detail.component.html'
})
export class RecipeIngredientsDetailComponent implements OnInit, OnDestroy {

    recipeIngredients: RecipeIngredients;
    private subscription: any;

    constructor(
        private recipeIngredientsService: RecipeIngredientsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.recipeIngredientsService.find(id).subscribe(recipeIngredients => {
            this.recipeIngredients = recipeIngredients;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
