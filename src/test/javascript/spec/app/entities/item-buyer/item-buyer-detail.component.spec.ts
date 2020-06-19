import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MudanzaTestModule } from '../../../test.module';
import { ItemBuyerDetailComponent } from 'app/entities/item-buyer/item-buyer-detail.component';
import { ItemBuyer } from 'app/shared/model/item-buyer.model';

describe('Component Tests', () => {
  describe('ItemBuyer Management Detail Component', () => {
    let comp: ItemBuyerDetailComponent;
    let fixture: ComponentFixture<ItemBuyerDetailComponent>;
    const route = ({ data: of({ itemBuyer: new ItemBuyer(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MudanzaTestModule],
        declarations: [ItemBuyerDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ItemBuyerDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ItemBuyerDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.itemBuyer).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
