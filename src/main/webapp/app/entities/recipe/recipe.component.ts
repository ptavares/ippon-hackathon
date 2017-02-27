import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, AlertService } from 'ng-jhipster';

import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-recipe',
    templateUrl: './recipe.component.html'
})
export class RecipeComponent implements OnInit, OnDestroy {
recipes: Recipe[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private recipeService: RecipeService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.recipeService.query().subscribe(
            (res: Response) => {
                this.recipes = res.json();
            },
            (res: Response) => this.onError(res.json())
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInRecipes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId (index: number, item: Recipe) {
        return item.id;
    }



    registerChangeInRecipes() {
        this.eventSubscriber = this.eventManager.subscribe('recipeListModification', (response) => this.loadAll());
    }


    private onError (error) {
        this.alertService.error(error.message, null, null);
    }
}
