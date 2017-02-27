import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils } from 'ng-jhipster';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { RecipeIngredientsDetailComponent } from '../../../../../../main/webapp/app/entities/recipe-ingredients/recipe-ingredients-detail.component';
import { RecipeIngredientsService } from '../../../../../../main/webapp/app/entities/recipe-ingredients/recipe-ingredients.service';
import { RecipeIngredients } from '../../../../../../main/webapp/app/entities/recipe-ingredients/recipe-ingredients.model';

describe('Component Tests', () => {

    describe('RecipeIngredients Management Detail Component', () => {
        let comp: RecipeIngredientsDetailComponent;
        let fixture: ComponentFixture<RecipeIngredientsDetailComponent>;
        let service: RecipeIngredientsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [RecipeIngredientsDetailComponent],
                providers: [
                    MockBackend,
                    BaseRequestOptions,
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    {
                        provide: Http,
                        useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
                            return new Http(backendInstance, defaultOptions);
                        },
                        deps: [MockBackend, BaseRequestOptions]
                    },
                    RecipeIngredientsService
                ]
            }).overrideComponent(RecipeIngredientsDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RecipeIngredientsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RecipeIngredientsService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new RecipeIngredients(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.recipeIngredients).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
