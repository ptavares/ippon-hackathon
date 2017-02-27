import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager} from 'ng-jhipster';

import { Account, LoginModalService, Principal } from '../shared';
import { IngredientService } from '../entities/ingredient/ingredient.service';
import { Ingredient } from '../entities/ingredient/ingredient.model';
import { Response } from '@angular/http';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.css'
    ]

})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    ingredients : Array<Ingredient>;

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: EventManager,
        private ingredientService: IngredientService
    ) {
        }

    ngOnInit() {
        this.ingredientService.query().subscribe((response: Response) => {
                console.debug("response",response.json());
                this.ingredients = response.json();
            }, error => console.debug("error"),
                () => console.log('complete'));

        this.principal.identity().then((account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
            });
        });
    }

    public changeIngredient(ingredientId) {
        console.debug('changeIngredient', ingredientId);
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }
}
