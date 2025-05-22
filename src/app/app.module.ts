import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CreateQuestionsComponent } from './create-questions/create-questions.component';
import { HeaderComponent } from './header/header.component';
import { FinalizePdfComponent } from './create-questions/finalize-pdf/finalize-pdf.component';
import { HeadingComponent } from './create-questions/heading/heading.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateQuestionsComponent,
    HeaderComponent,
    FinalizePdfComponent,
    HeadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
