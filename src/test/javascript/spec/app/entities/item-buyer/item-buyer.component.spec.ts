import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MudanzaTestModule } from '../../../test.module';
import { ItemBuyerComponent } from 'app/entities/item-buyer/item-buyer.component';
import { ItemBuyerService } from 'app/entities/item-buyer/item-buyer.service';
import { ItemBuyer } from 'app/shared/model/item-buyer.model';

describe('Component Tests', () => {
  describe('ItemBuyer Management Component', () => {
    let comp: ItemBuyerComponent;
    let fixture: ComponentFixture<ItemBuyerComponent>;
    let service: ItemBuyerService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MudanzaTestModule],
        declarations: [ItemBuyerComponent],
        providers: []
      })
        .overrideTemplate(ItemBuyerComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ItemBuyerComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ItemBuyerService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ItemBuyer(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.itemBuyers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
