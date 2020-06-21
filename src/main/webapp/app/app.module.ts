import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { MudanzaSharedModule } from 'app/shared/shared.module';
import { MudanzaCoreModule } from 'app/core/core.module';
import { MudanzaAppRoutingModule } from './app-routing.module';
import { MudanzaHomeModule } from './home/home.module';
import { MudanzaEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { JhiMainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    MudanzaSharedModule,
    MudanzaCoreModule,
    MudanzaHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    MudanzaEntityModule,
    MudanzaAppRoutingModule,
    FontAwesomeModule
  ],
  declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [JhiMainComponent]
})
export class MudanzaAppModule {}
