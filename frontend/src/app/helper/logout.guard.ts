import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutGuard implements CanActivate {
  constructor(private _auth: AuthService, private _router: Router) { }

  canActivate() {
    if (!this._auth.IsLoggedIn()) {
      return true
    }

    this._router.navigate(['home'])
    return false
  }

}
