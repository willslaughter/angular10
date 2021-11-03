import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MovieComponent } from './movie/movie.component'
import { ShowMovComponent } from './movie/show-mov/show-mov.component'

const routes: Routes = [
  {path:'movie',component:MovieComponent},
  {path:'showMovie/:MovieId/:MovieName/:MovieDirector',component:ShowMovComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [MovieComponent,ShowMovComponent]
