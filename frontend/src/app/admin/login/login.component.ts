import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  
  hide = true;
  result: any = {}
  msgCheck: any = null
  
  isSubmited: boolean = false
  flag: boolean = false

  constructor(public _userService: ServiceService, private _router: Router) { }
  adminData = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
  })

  

  ngOnInit(): void {
  }

  adminLoginForm() {
    let adminInfo: any = this.adminData.value
    this.isSubmited = true
    if (this.adminData.valid) {
      this._userService.adminLogin(adminInfo).subscribe(
        res => { this.result = res },
        (e) => {
          this.flag = false
          this.msgCheck = e.error.message
        },
        () => {
          if (this.result?.success != "") {
            this.flag = true
            this.msgCheck = this.result.message
            this.adminData.reset()
            this.isSubmited = false

            let token = this.result.success.token
            localStorage.setItem('token', token)
            localStorage.setItem('status', '1')
            let typeUser = this.result.success.user.userType

            typeUser == 'user' ?
              this._router.navigate(['login']) :
              this._router.navigate(['home'])
          }
        }

      )
    }
  }

  get email() {
    return this.adminData.get('email')
  }

  get password() {
    return this.adminData.get('password')
  }
}

