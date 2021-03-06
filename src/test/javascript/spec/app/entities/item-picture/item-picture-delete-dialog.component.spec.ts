import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { MudanzaTestModule } from '../../../test.module';
import { ItemPictureDeleteDialogComponent } from 'app/entities/item-picture/item-picture-delete-dialog.component';
import { ItemPictureService } from 'app/entities/item-picture/item-picture.service';

describe('Component Tests', () => {
  describe('ItemPicture Management Delete Component', () => {
    let comp: ItemPictureDeleteDialogComponent;
    let fixture: ComponentFixture<ItemPictureDeleteDialogComponent>;
    let service: ItemPictureService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MudanzaTestModule],
        declarations: [ItemPictureDeleteDialogComponent]
      })
        .overrideTemplate(ItemPictureDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ItemPictureDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ItemPictureService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
