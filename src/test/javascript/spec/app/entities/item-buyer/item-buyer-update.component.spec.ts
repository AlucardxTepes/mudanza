import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { MudanzaTestModule } from '../../../test.module';
import { ItemBuyerUpdateComponent } from 'app/entities/item-buyer/item-buyer-update.component';
import { ItemBuyerService } from 'app/entities/item-buyer/item-buyer.service';
import { ItemBuyer } from 'app/shared/model/item-buyer.model';

describe('Component Tests', () => {
  describe('ItemBuyer Management Update Component', () => {
    let comp: ItemBuyerUpdateComponent;
    let fixture: ComponentFixture<ItemBuyerUpdateComponent>;
    let service: ItemBuyerService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MudanzaTestModule],
        declarations: [ItemBuyerUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ItemBuyerUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ItemBuyerUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ItemBuyerService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ItemBuyer(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new ItemBuyer();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
