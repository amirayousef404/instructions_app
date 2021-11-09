import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from 'src/app/admin/service.service';

@Component({
  selector: 'app-show-single-instruction',
  templateUrl: './show-single-instruction.component.html',
  styleUrls: ['./show-single-instruction.component.scss']
})
export class ShowSingleInstructionComponent implements OnInit {

  singleInstruction: any = []
  result: any = {}
  msgCheck: any = null
  headTitle: string = 'Data of single instruction'
 
  constructor(public _Service: ServiceService, private router: ActivatedRoute, private _router: Router) {
    this.getSingleInstruction()
  }

  ngOnInit(): void {
  }

  getSingleInstruction() {
    let id = this.router.snapshot.paramMap.get('id')
    this._Service.showSingleInstruction(id).subscribe(res => {
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

  deleteByAdmin(id: any) {
    this._Service.deleteSingleInstruction(id).subscribe(res => { },
      () => { },
      () => {
        this._router.navigate(['/instructions'])
      })
  }

}
