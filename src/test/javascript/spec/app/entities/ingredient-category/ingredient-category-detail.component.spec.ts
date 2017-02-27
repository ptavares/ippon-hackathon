import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils } from 'ng-jhipster';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { IngredientCategoryDetailComponent } from '../../../../../../main/webapp/app/entities/ingredient-category/ingredient-category-detail.component';
import { IngredientCategoryService } from '../../../../../../main/webapp/app/entities/ingredient-category/ingredient-category.service';
import { IngredientCategory } from '../../../../../../main/webapp/app/entities/ingredient-category/ingredient-category.model';

describe('Component Tests', () => {

    describe('IngredientCategory Management Detail Component', () => {
        let comp: IngredientCategoryDetailComponent;
        let fixture: ComponentFixture<IngredientCategoryDetailComponent>;
        let service: IngredientCategoryService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [IngredientCategoryDetailComponent],
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
                    IngredientCategoryService
                ]
            }).overrideComponent(IngredientCategoryDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(IngredientCategoryDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IngredientCategoryService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new IngredientCategory(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.ingredientCategory).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
