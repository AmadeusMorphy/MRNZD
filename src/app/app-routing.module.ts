import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './pages/header/header.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: "full" },
  { path: 'header', component: HeaderComponent },
  { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
  { path: 'home', loadComponent: () => import('./pages/home/home.component') },
  { path: 'posts', loadComponent: () => import('./pages/posts/posts.component') },
  { path: 'imgs', loadComponent: () => import('./pages/image-loader/image-loader.component').then(m => m.ImageLoaderComponent) },
  { path: 'dms', loadComponent: () => import('./pages/dms/dms.component').then(m => m.DmsComponent) },
  { path: 'add-friend', loadComponent: () => import('./pages/add-friend/add-friend.component').then(m => m.AddFriendComponent) },
  { path: 'my-profile', loadComponent: () => import('./pages/my-profile/my-profile.component').then(m => m.MyProfileComponent) },
  { path: 'friend-req', loadComponent: () => import('./pages/friend-req/friend-req.component').then(m => m.FriendReqComponent) },
  { path: 'friends', loadComponent: () => import('./pages/friends/friends.component').then(m => m.FriendsComponent) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
