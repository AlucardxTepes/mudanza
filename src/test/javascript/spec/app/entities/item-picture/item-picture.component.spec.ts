import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { MudanzaTestModule } from '../../../test.module';
import { ItemPictureComponent } from 'app/entities/item-picture/item-picture.component';
import { ItemPictureService } from 'app/entities/item-picture/item-picture.service';
import { ItemPicture } from 'app/shared/model/item-picture.model';

describe('Component Tests', () => {
  describe('ItemPicture Management Component', () => {
    let comp: ItemPictureComponent;
    let fixture: ComponentFixture<ItemPictureComponent>;
    let service: ItemPictureService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MudanzaTestModule],
        declarations: [ItemPictureComponent],
        providers: []
      })
        .overrideTemplate(ItemPictureComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ItemPictureComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ItemPictureService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ItemPicture(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.itemPictures[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
