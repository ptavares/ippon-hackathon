import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils } from 'ng-jhipster';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { RecipeDetailComponent } from '../../../../../../main/webapp/app/entities/recipe/recipe-detail.component';
import { RecipeService } from '../../../../../../main/webapp/app/entities/recipe/recipe.service';
import { Recipe } from '../../../../../../main/webapp/app/entities/recipe/recipe.model';

describe('Component Tests', () => {

    describe('Recipe Management Detail Component', () => {
        let comp: RecipeDetailComponent;
        let fixture: ComponentFixture<RecipeDetailComponent>;
        let service: RecipeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [RecipeDetailComponent],
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
                    RecipeService
                ]
            }).overrideComponent(RecipeDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RecipeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RecipeService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Recipe(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.recipe).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
