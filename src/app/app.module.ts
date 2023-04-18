import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ReportChartareaComponent } from './components/report-chartarea/report-chartarea.component';
import { ReportConfigareaComponent } from './components/report-configarea/report-configarea.component';
import { ReportDatamodelareaComponent } from './components/report-datamodelarea/report-datamodelarea.component';
import { ReportUseractionsareaComponent } from './components/report-useractionsarea/report-useractionsarea.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ReportChartareaComponent,
    ReportConfigareaComponent,
    ReportDatamodelareaComponent,
    ReportUseractionsareaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
