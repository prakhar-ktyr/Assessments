import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Address } from '../../models/address';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {

  userAddForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.userAddForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required],
      dob: ['', Validators.required],
      role: ['user', Validators.required],
      password: ['', Validators.required],
      address: this.fb.array([this.createAddress()])
    });
  }

  ngOnInit(): void {}

  createAddress(): FormGroup {
    return this.fb.group({
      houseNo: [0, Validators.required],
      street: ['', Validators.required],
      area: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      pincode: ['', Validators.required]
    });
  }

  addAddress(): void {
    (this.userAddForm.get('address') as FormArray).push(this.createAddress());
  }

  get addressControls() {
    return (this.userAddForm.get('address') as FormArray).controls;
  }

  isInvalid(controlName: string): boolean {
    const control = this.userAddForm.get(controlName);
    return control!.invalid && (control!.touched || !control!.pristine);
  }

  isAddressInvalid(index: number, controlName: string): boolean {
    const control = (this.userAddForm.get('address') as FormArray).at(index).get(controlName);
    return control!.invalid && (control!.touched || !control!.pristine);
  }

  onSubmit(frmValue: any): void {
    console.log('Form Value:', frmValue);

    const tempUser: User = {
      id: 0, 
      firstName: frmValue.firstName,
      lastName: frmValue.lastName,
      email: frmValue.email,
      phone: frmValue.mobile,
      dob: frmValue.dob,
      role: frmValue.role,
      password: frmValue.password,
      address: frmValue.address.map((addr: any) => ({
        id: 0, 
        houseNo: addr.houseNo,
        street: addr.street,
        area: addr.area,
        city: addr.city,
        state: addr.state,
        country: addr.country,
        pincode: addr.pincode
      }))
    };

    this.userService.addUser(tempUser).subscribe(
      (response: any) => {
        console.log('User added successfully', response);
      },
      (error: any) => {
        console.error('Error adding user', error);
      }
    );
  }
}
