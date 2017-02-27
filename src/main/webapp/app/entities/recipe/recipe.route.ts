import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { RecipeComponent } from './recipe.component';
import { RecipeDetailComponent } from './recipe-detail.component';
import { RecipePopupComponent } from './recipe-dialog.component';
import { RecipeDeletePopupComponent } from './recipe-delete-dialog.component';

import { Principal } from '../../shared';


export const recipeRoute: Routes = [
  {
    path: 'recipe',
    component: RecipeComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Recipes'
    }
  }, {
    path: 'recipe/:id',
    component: RecipeDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Recipes'
    }
  }
];

export const recipePopupRoute: Routes = [
  {
    path: 'recipe-new',
    component: RecipePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Recipes'
    },
    outlet: 'popup'
  },
  {
    path: 'recipe/:id/edit',
    component: RecipePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Recipes'
    },
    outlet: 'popup'
  },
  {
    path: 'recipe/:id/delete',
    component: RecipeDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Recipes'
    },
    outlet: 'popup'
  }
];
