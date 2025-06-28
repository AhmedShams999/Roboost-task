import { NgStyle, Location, CommonModule } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouteBackComponent } from '../../components/route-back/route-back.component';
import { IrouteBack } from '../../models/routeBack/IrouteBack';
import { Router, RouterLink } from '@angular/router';
import { ILoginUser } from '../../models/auth/auth';
import { AuthService } from '../../services/auth/auth.service';
import { LoadingComponent } from "../../components/loading/loading.component";

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouteBackComponent, RouterLink, LoadingComponent],
  styleUrls: ['./Login.component.css'],
})
export class LoginComponent implements OnInit {
  // Define a FormGroup for the login form
  loginForm!: FormGroup;
  isSubmitting: boolean = false;
  submitError: string | null = null; // Use a string to hold error messages
  showPassword: boolean = false;

  routeBack: IrouteBack[] = [
    {
      routeLink: '/login',
      routeName: $localize`Login`,
    },
  ];

  constructor(
    @Inject(LOCALE_ID)
    public locale: string,
    private fb: FormBuilder, // Inject FormBuilder
    private authService: AuthService,
    private router: Router // Inject Router
  ) {}

  ngOnInit() {
    // Initialize the loginForm with FormBuilder
    this.loginForm = this.fb.group({
      // Define form controls and their initial values and validators
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]], // Added minLength for password
      rememberMe: [false], // Initial value for rememberMe checkbox
    });

    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      this.loginForm.patchValue({ email: rememberedEmail, rememberMe: true });
    }
  }

  /**
   * Toggles the visibility of the password field.
   */
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  /**
   * Handles the form submission.
   * If the form is valid, it simulates a login API call and redirects on success.
   * Otherwise, it marks all fields as touched to show validation errors.
   */
  onSubmit() {
    // Check if the form is valid
    if (this.loginForm.valid) {
      this.isSubmitting = true;
      this.submitError = null; // Clear any previous errors

      // Get form values
      const loginUser: ILoginUser = {
        email: this.loginForm.value.email, // Changed from username to email
        password: this.loginForm.value.password,
        rememberMe: this.loginForm.value.rememberMe,
      };
      
      
      this.authService.login(loginUser).subscribe({
        next: () => {
          this.isSubmitting = false;
          if (loginUser.rememberMe) {
            localStorage.setItem('rememberedEmail', loginUser.email);
          } else {
            localStorage.removeItem('rememberedEmail');
          }
          console.log('Form Submitted!', loginUser);
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.isSubmitting = false;
          console.log(error.error);
          this.submitError = error.error?.message || 'Invalid email or password';
        }
      });
    }else{
       this.loginForm.markAllAsTouched();
    }

  }
  /**
   * Helper method to get a form control.
   * @param controlName The name of the form control.
   * @returns The form control.
   */
  getFormControl(controlName: string) {
    return this.loginForm.get(controlName);
  }
}
