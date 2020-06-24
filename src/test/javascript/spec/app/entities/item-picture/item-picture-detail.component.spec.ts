import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MudanzaTestModule } from '../../../test.module';
import { ItemPictureDetailComponent } from 'app/entities/item-picture/item-picture-detail.component';
import { ItemPicture } from 'app/shared/model/item-picture.model';

describe('Component Tests', () => {
  describe('ItemPicture Management Detail Component', () => {
    let comp: ItemPictureDetailComponent;
    let fixture: ComponentFixture<ItemPictureDetailComponent>;
    const route = ({ data: of({ itemPicture: new ItemPicture(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MudanzaTestModule],
        declarations: [ItemPictureDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ItemPictureDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ItemPictureDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.itemPicture).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
