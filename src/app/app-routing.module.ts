import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './pages/header/header.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: "full" },
  { path: 'header', component: HeaderComponent},
  { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
  { path: 'home', loadComponent: () => import('./pages/home/home.component') },
  { path: 'posts', loadComponent: () => import('./pages/posts/posts.component') },
  { path: 'imgs', loadComponent: () => import('./pages/image-loader/image-loader.component').then(m => m.ImageLoaderComponent) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
