import { computed, Injectable, signal } from '@angular/core';
import { AuthState, ILoginRes, ILoginUser, IRegisterUser } from '../../models/auth/auth';
import { catchError, delay, Observable, of, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private api = 'https://dummyjson.com/auth';

  // Manage the user state with signals

  private authState = signal<AuthState>({
    user:null,
    token:null
  })

  public readonly user = computed(()=> this.authState().user)
  public readonly token = computed(() => this.authState().token);

  public readonly isAuthenticated = computed(()=> {
    const token = this.authState().token
    if(!token) return false

    try {
      const tokenData = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      console.log(tokenData.exp);
      console.log(tokenData.exp > currentTime);
      return tokenData.exp > currentTime;
    } catch (error) {
      console.log(error);
      this.authState.set({
      user:null,
      token:null
    }); 
      return false;
    }
  });

  constructor(private http: HttpClient,private router: Router) {
    this.initializeAuthState();

    console.log(this.authState());
  }

  private initializeAuthState(): void{
    try {
      const userData = localStorage.getItem('userData');
      const authToken = localStorage.getItem('authToken');

      if(userData && authToken){
        this.authState.set({
          user: JSON.parse(userData),
          token:authToken
        })
      }

    } catch (error) {
      console.error('Failed to load auth state from localStorage:', error);
      this.clearLocalStorage();
    }
  }

  private clearLocalStorage(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    console.log('Auth localStorage cleared.');
  }

  login(loginUser: ILoginUser): Observable<ILoginRes> {
    return this.http
      .post<ILoginRes>(`${this.api}/login`, {
        username: loginUser.email,
        password: loginUser.password,
      })
      .pipe(
        tap((res) => {
          if (res.accessToken) {
            localStorage.setItem('authToken', res.accessToken);
            localStorage.setItem('userData', JSON.stringify(res));
            this.authState.set({
              user: res,
              token: res.accessToken
            })
          }else{
            this.clearLocalStorage();
            throw new Error('Login response invalid.');
          }
        }),
        catchError((error:HttpErrorResponse)=>{
          console.error('Login API error:', error);
          this.clearAuthState()

          let errorMessage = 'An unknown error occurred. Please try again later.';
          if (error.error instanceof ErrorEvent) {
  
            errorMessage = `Network Error: ${error.error.message}`;
          } else {

            if (error.status === 401) {
              errorMessage = 'Invalid username or password.';
            } else if (error.status === 403) {
              errorMessage = 'Access forbidden. Please check your credentials.';
            } else if (error.status >= 400 && error.status < 500) {

              errorMessage = `Error: ${error.error.message || error.message}`;
            } else if (error.status >= 500) {

              errorMessage = 'Server error. Please try again later.';
            }
          }
          return throwError(() => new Error(errorMessage));
        })
      );
  }

  register(registerUser:IRegisterUser):Observable<any>{
    return of({ success: true }).pipe(
      delay(1000) // Simulate network delay
    );
  }

  logout(): void {
    this.clearAuthState(); 
    console.log('User logged out. Signal reset.');
    this.router.navigate(['/login']);
  }

  getUserData(): ILoginRes|null {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }

  clearAuthState():void{
      this.authState.set({
        user:null,
        token:null
      }); 
      this.clearLocalStorage();
  }
}
