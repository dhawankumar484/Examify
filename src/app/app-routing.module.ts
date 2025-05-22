import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateQuestionsComponent } from './create-questions/create-questions.component';
import { FinalizePdfComponent } from './create-questions/finalize-pdf/finalize-pdf.component';
import { HeadingComponent } from './create-questions/heading/heading.component';

const routes: Routes = [
  { path:"", pathMatch:"full", component: HomeComponent},
  { path:"start", pathMatch:"full", component: CreateQuestionsComponent},
  { path:'start/heading', pathMatch:"full", component:HeadingComponent},
  { path:'start/heading/finalize', pathMatch:"full", component:FinalizePdfComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
