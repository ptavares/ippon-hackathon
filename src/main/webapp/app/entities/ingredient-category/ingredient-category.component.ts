import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, AlertService } from 'ng-jhipster';

import { IngredientCategory } from './ingredient-category.model';
import { IngredientCategoryService } from './ingredient-category.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-ingredient-category',
    templateUrl: './ingredient-category.component.html'
})
export class IngredientCategoryComponent implements OnInit, OnDestroy {
ingredientCategories: IngredientCategory[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private ingredientCategoryService: IngredientCategoryService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.ingredientCategoryService.query().subscribe(
            (res: Response) => {
                this.ingredientCategories = res.json();
            },
            (res: Response) => this.onError(res.json())
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInIngredientCategories();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId (index: number, item: IngredientCategory) {
        return item.id;
    }



    registerChangeInIngredientCategories() {
        this.eventSubscriber = this.eventManager.subscribe('ingredientCategoryListModification', (response) => this.loadAll());
    }


    private onError (error) {
        this.alertService.error(error.message, null, null);
    }
}
