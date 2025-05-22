import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateQuestionsComponent } from './create-questions/create-questions.component';

const routes: Routes = [
  { path:"", pathMatch:"full", component: HomeComponent},
  { path:"start", component: CreateQuestionsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
