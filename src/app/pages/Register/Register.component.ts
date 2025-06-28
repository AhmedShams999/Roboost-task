import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { IrouteBack } from '../../models/routeBack/IrouteBack';
import { CommonModule, NgStyle } from '@angular/common';
import { RouteBackComponent } from '../../components/route-back/route-back.component';
import { Router, RouterLink } from '@angular/router';
import { IRegisterUser } from '../../models/auth/auth';
import { AuthService } from '../../services/auth/auth.service';
import { LoadingComponent } from "../../components/loading/loading.component";

@Component({
  selector: 'app-Register',
  templateUrl: './Register.component.html',
  imports: [CommonModule, ReactiveFormsModule, RouteBackComponent, LoadingComponent,RouterLink],
  styleUrls: ['./Register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup; // Define FormGroup for the registration form
  isSubmitting: boolean = false;
  submitError: string | null = null;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false; // Separate toggle for confirm password

  routeBack : IrouteBack[] = [
    {
      routeLink: '/register',
      routeName: $localize`Register`
    }
  ];

  constructor(
    @Inject(LOCALE_ID)
    public locale: string,
    private authService: AuthService,
    private fb: FormBuilder, // Inject FormBuilder
    private router: Router // Inject Router
  ) { }

  ngOnInit() {
    // Initialize the registerForm with FormBuilder
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      // Add custom validator for password matching at the FormGroup level
      validators: this.passwordMatchValidator
    });
  }

  /**
   * Custom validator to check if password and confirm password match.
   * Applied at the FormGroup level.
   * @param control The FormGroup to validate.
   * @returns A ValidationErrors object if passwords do not match, otherwise null.
   */
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    // Return null if controls are not yet initialized or password is not dirty/touched
    if (!password || !confirmPassword || !password.value || !confirmPassword.value) {
      return null;
    }

    // Set error on confirmPassword if passwords don't match
    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true }); // Set error on confirmPassword control
      return { passwordMismatch: true }; // Also return error at the form group level
    } else {
      // Clear error on confirmPassword if they match (if it was previously set)
      if (confirmPassword.hasError('passwordMismatch')) {
        confirmPassword.setErrors(null);
      }
      return null;
    }
  }

  /**
   * Toggles the visibility of the password field.
   */
  togglePasswordVisibility(field: 'password' | 'confirmPassword') {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  /**
   * Handles the form submission.
   * If the form is valid, it simulates a registration API call and redirects on success.
   * Otherwise, it marks all fields as touched to show validation errors.
   */
  onSubmit() {
    // Check if the form is valid
    if (this.registerForm.valid) {
      this.isSubmitting = true;
      this.submitError = null; // Clear any previous errors

      // Get form values
      const  registerUser:IRegisterUser = {
        email:this.registerForm.value.email,
        username: this.registerForm.value.username,
        password:this.registerForm.value.password
      };
      console.log('Registration Form Submitted!', registerUser);
      this.authService.register(registerUser).subscribe({
        next:res=>{
           this.router.navigate(['/login']);
        },
        error:(error) => {
          this.isSubmitting = false;
          console.log(error.error);
          this.submitError = error.error?.message || 'Invalid email or password';
        }
      })
      
    } else {
      // If the form is invalid, mark all controls as touched to display validation errors
      this.registerForm.markAllAsTouched();
      // Specifically check for password mismatch error at form group level
      if (this.registerForm.hasError('passwordMismatch')) {
        this.submitError = 'Passwords do not match.';
      } else {
        this.submitError = 'Please correct the highlighted errors.';
      }
      console.log('Form is invalid. Please check fields.');
    }
  }

  /**
   * Helper method to get a form control.
   * @param controlName The name of the form control.
   * @returns The form control.
   */
  getFormControl(controlName: string) {
    return this.registerForm.get(controlName);
  }
}
