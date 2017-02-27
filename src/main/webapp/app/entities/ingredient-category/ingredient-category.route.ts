import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { IngredientCategoryComponent } from './ingredient-category.component';
import { IngredientCategoryDetailComponent } from './ingredient-category-detail.component';
import { IngredientCategoryPopupComponent } from './ingredient-category-dialog.component';
import { IngredientCategoryDeletePopupComponent } from './ingredient-category-delete-dialog.component';

import { Principal } from '../../shared';


export const ingredientCategoryRoute: Routes = [
  {
    path: 'ingredient-category',
    component: IngredientCategoryComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'IngredientCategories'
    }
  }, {
    path: 'ingredient-category/:id',
    component: IngredientCategoryDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'IngredientCategories'
    }
  }
];

export const ingredientCategoryPopupRoute: Routes = [
  {
    path: 'ingredient-category-new',
    component: IngredientCategoryPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'IngredientCategories'
    },
    outlet: 'popup'
  },
  {
    path: 'ingredient-category/:id/edit',
    component: IngredientCategoryPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'IngredientCategories'
    },
    outlet: 'popup'
  },
  {
    path: 'ingredient-category/:id/delete',
    component: IngredientCategoryDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'IngredientCategories'
    },
    outlet: 'popup'
  }
];
