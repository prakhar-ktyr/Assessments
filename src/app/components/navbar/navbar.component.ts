import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { AssessmentService } from '../../services/assessment.service';
import { Assessment } from '../../models/assessment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  loginForm: FormGroup;
  isLoggedIn: boolean = false;
  searchTerm: string = '';
  arrAssessments: Assessment[] = [];
  userRole: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private assessmentService: AssessmentService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.localStorageService.getItem('username');
    this.userRole = this.localStorageService.getItem('role') || '';
    this.assessmentService.getAssessments().subscribe((assessments: Assessment[]) => {
      this.arrAssessments = assessments;
    });
  }

  get isAdmin(): boolean {
    return this.userRole === 'Admin';
  }

  get isFaculty(): boolean {
    return this.userRole === 'Faculty';
  }

  onSubmit(): void {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.userService.getUsers().subscribe((users: User[]) => {
      const user = users.find(u => u.email === email && u.password === password);

      if (user) {
        this.localStorageService.setItem('username', `${user.firstName} ${user.lastName}`);
        this.localStorageService.setItem('role', user.role);
        this.localStorageService.setItem('loggedUserId', user.id);
        this.isLoggedIn = true;
        console.log('Login successful');
      } else {
        console.log('Invalid credentials');
      }
    });
  }

  logout(): void {
    this.localStorageService.clear();
    this.isLoggedIn = false;
    console.log('Logout successful');
  }

  onSearch(): void {
    const filteredAssessments = this.arrAssessments.filter(assessment =>
      assessment.assessmentName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    if (filteredAssessments.length > 0) {
      this.router.navigate([`viewDetails/${filteredAssessments[0].id}`]);
    } else {
      console.log('Assessment not found');
    }
  }
}
