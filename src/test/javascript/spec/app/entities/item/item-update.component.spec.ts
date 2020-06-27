import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { MudanzaTestModule } from '../../../test.module';
import { ItemUpdateComponent } from 'app/entities/item/item-update.component';
import { ItemService } from 'app/entities/item/item.service';
import { Item } from 'app/shared/model/item.model';
import { ItemWithPictures } from 'app/shared/model/item-with-pictures.model';

describe('Component Tests', () => {
  describe('Item Management Update Component', () => {
    let comp: ItemUpdateComponent;
    let fixture: ComponentFixture<ItemUpdateComponent>;
    let service: ItemService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MudanzaTestModule],
        declarations: [ItemUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ItemUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ItemUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ItemService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ItemWithPictures();
        entity.item.id = 123;
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
        const entity = new ItemWithPictures();
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
