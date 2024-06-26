import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentComponent } from './components/content/content.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { AssessmentsComponent } from './components/assessments/assessments.component';
import { AdminComponent } from './components/admin/admin.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { LocalStorageService } from './services/local-storage.service';
import { CreateAssessmentComponent } from './components/create-assessment/create-assessment.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbar } from '@angular/material/toolbar';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { UpdateCourseComponent } from './components/update-course/update-course.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CartComponent } from './components/cart/cart.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ViewDetailsComponent } from './components/view-details/view-details.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { AttemptAssessmentComponent } from './components/attempt-assessment/attempt-assessment.component';

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    FooterComponent,
    HomeComponent,
    AboutusComponent,
    AssessmentsComponent,
    AdminComponent,
    ContactusComponent,
    AddUserComponent,
    UpdateUserComponent,
    AddCourseComponent,
    CreateAssessmentComponent,
    ViewUserComponent,
    UpdateCourseComponent,
    NavbarComponent,
    CartComponent,
    DashboardComponent,
    ViewDetailsComponent,
    TruncatePipe,
    AttemptAssessmentComponent,
    SearchPipe
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatToolbar,
    MatOptionModule,
    MatIconModule,
    MatSelectModule,
    HttpClientModule,
    MatRadioModule
  ],
  providers: [
    provideClientHydration(),
    LocalStorageService,
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
