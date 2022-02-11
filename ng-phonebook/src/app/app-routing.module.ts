import { RouterModule, Routes } from '@angular/router';

import { ContactSearchComponent } from './components/contact-search/contact-search.component';
import { NgModule } from '@angular/core';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
