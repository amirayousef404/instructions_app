import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  IsLoggedIn() {
    // console.log(!!localStorage.getItem('token'))// return true
    return !!localStorage.getItem('token')
  }

}
