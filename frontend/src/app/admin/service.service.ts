import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private commonURL = `http://localhost:3000/api/user/`
  private commonAdminURL = `http://localhost:3000/api/admin/`
  singleInstruction: any;
  constructor(private _http: HttpClient) { }

  showAllUsers(): Observable<any> {
    return this._http.post(`${this.commonAdminURL}all`, null)
  }

  showSingleUser(id: any): Observable<any> {
    return this._http.get(`${this.commonAdminURL}single/${id}`)
  }

  deleteUserByAdmin(id: any): Observable<any> {
    return this._http.delete(`${this.commonAdminURL}delUser/${id}`)
  }

  adminLogin(adminData: any): Observable<any> {
    return this._http.post(`${this.commonURL}login`, adminData)
  }

  adminLogout(): Observable<any> {
    return this._http.post(`${this.commonURL}logout`, null)
  }

  adminLogoutAll(): Observable<any> {
    return this._http.post(`${this.commonURL}logoutAll`, null)
  }


  //-- Services to instructions --//
  addInstruction(data: any): Observable<any> {
    return this._http.post(`${this.commonAdminURL}addInstruction`, data)
  }

  showInstructions(): Observable<any> {
    return this._http.post(`${this.commonAdminURL}showInstructions`, null)
  }

  showSingleInstruction(id: any): Observable<any> {
    return this._http.get(`${this.commonAdminURL}showSingleInstruction/${id}`)
  }

  showInstructionsUser(id: any): Observable<any> {
    return this._http.get(`${this.commonAdminURL}showInstructionsUser/${id}`)
  }

  editSingleInstruction(id: any, data: any): Observable<any> {
    return this._http.patch(`${this.commonAdminURL}editSingleInstruction/${id}`, data)
  }

  deleteSingleInstruction(id: any): Observable<any> {
    return this._http.delete(`${this.commonAdminURL}deleteSingleInstruction/${id}`)
  }

  //-- Services to user info --//

  showSingleUserInfo(id: any): Observable<any> {
    return this._http.get(`${this.commonAdminURL}showAllUserInfoByAdmin/${id}`)
  }

}
