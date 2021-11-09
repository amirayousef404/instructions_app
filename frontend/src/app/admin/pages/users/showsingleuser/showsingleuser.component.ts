import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from 'src/app/admin/service.service';

@Component({
  selector: 'app-showsingleuser',
  templateUrl: './showsingleuser.component.html',
  styleUrls: ['./showsingleuser.component.scss']
})
export class ShowsingleuserComponent implements OnInit {

  singleInstruction: any = []
  singleUser: any = []
  singleUserInfo: any = []
  result: any = {}
  msgCheck: any = null
  headTitle: string = 'Data of user'
  id = this.router.snapshot.paramMap.get('id')

  constructor(public _userService: ServiceService, private router: ActivatedRoute, private _router: Router) {
    this.getSingleUser()
    this.getSingleUserInfo()
  }

  ngOnInit(): void {
    this.getSingleInstruction()
  }

  getSingleUser() {
    this._userService.showSingleUser(this.id).subscribe(res => {
      this.result = res
      this.singleUser = this.result.success
    },
      (e) => {
        this.msgCheck = e.error.message
      },
      () => {
        this.msgCheck = this.result.message
      })
  }

  getSingleInstruction() {
    this._userService.showInstructionsUser(this.id).subscribe(res => {
      this.result = res
      this.singleInstruction = this.result.success
    },
      (e) => {
        this.msgCheck = e.error.message
      },
      () => {
        this.msgCheck = this.result.message
      })
  }

  getSingleUserInfo() {
    this._userService.showSingleUserInfo(this.id).subscribe(res => {
      this.result = res
      this.singleUserInfo = this.result.success
    },
      (e) => {
        this.msgCheck = e.error.message
      },
      () => {
        this.msgCheck = this.result.message
      })
  }

  deleteByAdmin(id: any) {
    this._userService.deleteSingleInstruction(id).subscribe(res => { },
      () => { },
      () => {
        this._router.navigate(['/instructions'])
      })
  }


}
