import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})

export class NavbarComponent implements OnInit {
  loginForm: FormGroup;
  isLoggedIn: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private localStorageService: LocalStorageService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.localStorageService.getItem('username');
  }

  onSubmit(): void {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.userService.getUsers().subscribe((users: User[]) => {
      const user = users.find(u => u.email === email && u.password === password);

      if (user) {
        this.localStorageService.setItem('username', `${user.firstName} ${user.lastName}`);
        this.localStorageService.setItem('role', user.role);
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
}
