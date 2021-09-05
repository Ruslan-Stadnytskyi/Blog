import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, Subject, throwError} from "rxjs";
import {environment} from "../../environments/environment";
import {catchError, tap} from "rxjs/operators";
import {FbAuthResponse, User} from "../interfaces";


@Injectable()

export class AuthService {
  public error$: Subject<string> = new Subject<string>()

  constructor(private http: HttpClient) {

  }

  get token() {
    // @ts-ignore
    const expDate: any = new Date(localStorage.getItem('token-exp'))
    if (new Date() > expDate) {
      this.logout()
      return null
    }
    return localStorage.getItem('token')
  }

  registr(user: User) {
    return this.http.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`,
      user)
  }

  login(user: User): Observable<any> {
    user.returnSecureToken = true;
// @ts-ignore
    return this.http.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,
      user)
      .pipe(
        tap(this.setToken),// @ts-ignore
        catchError(this.handleError.bind(this))
      )
  }

  handleError(error: HttpErrorResponse) {
    const message = error?.error?.error
    console.log(message.message)

    switch (message.message) {
      case 'INVALID_EMAIL':
        this.error$.next('Невірний email')
        break
      case 'INVALID_PASSWORD':
        this.error$.next('Невірний пароль')
        console.log(this.error$)
        break
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Такого email не існує')
        break
    }
    return throwError(error)
  }

  logout() {
    this.setToken(null)
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  private setToken(res: FbAuthResponse | null): any {
    if (res) {
      // @ts-ignore
      const expDate = new Date(new Date().getTime() + +res.expiresIn * 1000)
      localStorage.setItem('token-exp', expDate.toString())
      // @ts-ignore
      localStorage.setItem('token', res.expiresIn)
    } else {
      localStorage.clear()
    }

  }
}
