import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils } from 'ng-jhipster';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { IngredientDetailComponent } from '../../../../../../main/webapp/app/entities/ingredient/ingredient-detail.component';
import { IngredientService } from '../../../../../../main/webapp/app/entities/ingredient/ingredient.service';
import { Ingredient } from '../../../../../../main/webapp/app/entities/ingredient/ingredient.model';

describe('Component Tests', () => {

    describe('Ingredient Management Detail Component', () => {
        let comp: IngredientDetailComponent;
        let fixture: ComponentFixture<IngredientDetailComponent>;
        let service: IngredientService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [IngredientDetailComponent],
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
                    IngredientService
                ]
            }).overrideComponent(IngredientDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(IngredientDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IngredientService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Ingredient(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.ingredient).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
