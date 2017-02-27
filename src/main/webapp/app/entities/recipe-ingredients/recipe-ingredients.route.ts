import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { RecipeIngredientsComponent } from './recipe-ingredients.component';
import { RecipeIngredientsDetailComponent } from './recipe-ingredients-detail.component';
import { RecipeIngredientsPopupComponent } from './recipe-ingredients-dialog.component';
import { RecipeIngredientsDeletePopupComponent } from './recipe-ingredients-delete-dialog.component';

import { Principal } from '../../shared';


export const recipeIngredientsRoute: Routes = [
  {
    path: 'recipe-ingredients',
    component: RecipeIngredientsComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'RecipeIngredients'
    }
  }, {
    path: 'recipe-ingredients/:id',
    component: RecipeIngredientsDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'RecipeIngredients'
    }
  }
];

export const recipeIngredientsPopupRoute: Routes = [
  {
    path: 'recipe-ingredients-new',
    component: RecipeIngredientsPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'RecipeIngredients'
    },
    outlet: 'popup'
  },
  {
    path: 'recipe-ingredients/:id/edit',
    component: RecipeIngredientsPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'RecipeIngredients'
    },
    outlet: 'popup'
  },
  {
    path: 'recipe-ingredients/:id/delete',
    component: RecipeIngredientsDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'RecipeIngredients'
    },
    outlet: 'popup'
  }
];
