import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, AlertService } from 'ng-jhipster';

import { RecipeIngredients } from './recipe-ingredients.model';
import { RecipeIngredientsService } from './recipe-ingredients.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-recipe-ingredients',
    templateUrl: './recipe-ingredients.component.html'
})
export class RecipeIngredientsComponent implements OnInit, OnDestroy {
recipeIngredients: RecipeIngredients[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private recipeIngredientsService: RecipeIngredientsService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.recipeIngredientsService.query().subscribe(
            (res: Response) => {
                this.recipeIngredients = res.json();
            },
            (res: Response) => this.onError(res.json())
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInRecipeIngredients();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId (index: number, item: RecipeIngredients) {
        return item.id;
    }



    registerChangeInRecipeIngredients() {
        this.eventSubscriber = this.eventManager.subscribe('recipeIngredientsListModification', (response) => this.loadAll());
    }


    private onError (error) {
        this.alertService.error(error.message, null, null);
    }
}
