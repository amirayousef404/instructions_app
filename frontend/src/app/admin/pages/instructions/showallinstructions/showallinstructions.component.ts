import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/admin/service.service';

@Component({
  selector: 'app-showallinstructions',
  templateUrl: './showallinstructions.component.html',
  styleUrls: ['./showallinstructions.component.scss']
})
export class ShowallinstructionsComponent implements OnInit {

  allInstructions: any = []
  result: any = {}
  msgCheck: any = null
  headTitle: string = 'Instructions'

  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['Title', 'Description', 'FileName', 'Actions'];


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _Service: ServiceService, private _router: Router) {

  }

  ngOnInit(): void {
    this.getAllInstructions()
  }

  getAllInstructions() {
    this._Service.showInstructions().subscribe(res => {
      this.result = res
      this.allInstructions = this.result.success
      this.dataSource = new MatTableDataSource(this.allInstructions)
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
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
      () => { this._router.navigate(['/instructions']) })
  }


}
