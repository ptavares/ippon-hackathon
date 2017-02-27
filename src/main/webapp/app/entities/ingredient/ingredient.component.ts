import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, AlertService } from 'ng-jhipster';

import { Ingredient } from './ingredient.model';
import { IngredientService } from './ingredient.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-ingredient',
    templateUrl: './ingredient.component.html'
})
export class IngredientComponent implements OnInit, OnDestroy {
ingredients: Ingredient[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private ingredientService: IngredientService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.ingredientService.query().subscribe(
            (res: Response) => {
                this.ingredients = res.json();
            },
            (res: Response) => this.onError(res.json())
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInIngredients();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId (index: number, item: Ingredient) {
        return item.id;
    }



    registerChangeInIngredients() {
        this.eventSubscriber = this.eventManager.subscribe('ingredientListModification', (response) => this.loadAll());
    }


    private onError (error) {
        this.alertService.error(error.message, null, null);
    }
}
