import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { HomeComponent } from './components/home/home.component';
import { AssessmentsComponent } from './components/assessments/assessments.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminGuard } from './guards/adminguard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'assessments', component: AssessmentsComponent },
  { path: 'contactus', component: ContactusComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
