import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { MudanzaTestModule } from '../../../test.module';
import { ItemPictureUpdateComponent } from 'app/entities/item-picture/item-picture-update.component';
import { ItemPictureService } from 'app/entities/item-picture/item-picture.service';
import { ItemPicture } from 'app/shared/model/item-picture.model';

describe('Component Tests', () => {
  describe('ItemPicture Management Update Component', () => {
    let comp: ItemPictureUpdateComponent;
    let fixture: ComponentFixture<ItemPictureUpdateComponent>;
    let service: ItemPictureService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MudanzaTestModule],
        declarations: [ItemPictureUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ItemPictureUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ItemPictureUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ItemPictureService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ItemPicture(123);
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
        const entity = new ItemPicture();
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
