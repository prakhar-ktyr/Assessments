import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { AssessmentService } from '../../services/assessment.service';
import { Assessment } from '../../models/assessment';
import { Address } from '../../models/address';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  isLoggedIn: boolean = false;
  searchTerm: string = '';
  arrAssessments: Assessment[] = [];
  arrUsers: User[] = [];
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

    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      dob: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      address: this.fb.array([this.createAddress()])
    });
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.localStorageService.getItem('username');
    this.userRole = this.localStorageService.getItem('role') || '';
    this.assessmentService.getAssessments().subscribe((assessments: Assessment[]) => {
      this.arrAssessments = assessments;
    });
    this.loadUsers();
  }

  get isAdmin(): boolean {
    return this.userRole === 'Admin';
  }

  get isFaculty(): boolean {
    return this.userRole === 'Faculty';
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.arrUsers = users;
    });
  }

  createAddress(): FormGroup {
    return this.fb.group({
      houseNo: ['', Validators.required],
      street: ['', Validators.required],
      area: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      pincode: ['', Validators.required]
    });
  }

  addAddress(): void {
    (this.registerForm.get('address') as FormArray).push(this.createAddress());
  }

  get addressControls() {
    return (this.registerForm.get('address') as FormArray).controls;
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
        this.userRole = user.role;
        console.log('Login successful');
      } else {
        console.log('Invalid credentials');
      }
    });
  }

  logout(): void {
    this.localStorageService.clear();
    this.isLoggedIn = false;
    this.userRole = '';
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

  getMaxId(users: User[]): number {
    return users.reduce((max, user) => (parseInt(user.id) > max ? parseInt(user.id) : max), 0);
  }

  onRegister(): void {
    if (this.registerForm.invalid) {
      return;
    }

    const newUserId = this.getMaxId(this.arrUsers) + 1;

    const newUser: User = {
      id: newUserId.toString(),
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      email: this.registerForm.value.email,
      phone: this.registerForm.value.phone,
      dob: this.registerForm.value.dob,
      role: 'Trainee',
      password: this.registerForm.value.password,
      address: this.registerForm.value.address.map((addr: any, index: number) => ({
        id: index + 1,
        houseNo: addr.houseNo,
        street: addr.street,
        area: addr.area,
        city: addr.city,
        state: addr.state,
        country: addr.country,
        pincode: addr.pincode
      }))
    };

    this.userService.addUser(newUser).subscribe(
      (data) => {
        console.log('User registered successfully:', data);
        this.loadUsers();
      },
      (err) => {
        console.log('Error registering user:', err);
      }
    );
  }
}
