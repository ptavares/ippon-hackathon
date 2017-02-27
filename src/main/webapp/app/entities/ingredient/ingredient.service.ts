import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, BaseRequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Ingredient } from './ingredient.model';
import { Recipe } from '../recipe/recipe.model';
@Injectable()
export class IngredientService {

    private resourceUrl = 'api/ingredients';

    constructor(private http: Http) { }

    create(ingredient: Ingredient): Observable<Ingredient> {
        let copy: Ingredient = Object.assign({}, ingredient);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(ingredient: Ingredient): Observable<Ingredient> {
        let copy: Ingredient = Object.assign({}, ingredient);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Ingredient> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();
        });
    }

    query(req?: any): Observable<Response> {
        let options = this.createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
        ;
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    postIngredients(ingredients: Array<Ingredient>): Observable<Recipe> {
        //let copy: Array<Ingredient> = Object.assign({}, ingredients);
        return this.http.post('api/search-recipe', ingredients).map((res: Response) => {
            return res.json();
        });
    }

    private createRequestOption(req?: any): BaseRequestOptions {
        let options: BaseRequestOptions = new BaseRequestOptions();
        if (req) {
            let params: URLSearchParams = new URLSearchParams();
            params.set('page', req.page);
            params.set('size', req.size);
            if (req.sort) {
                params.paramsMap.set('sort', req.sort);
            }
            params.set('query', req.query);

            options.search = params;
        }
        return options;
    }
}
