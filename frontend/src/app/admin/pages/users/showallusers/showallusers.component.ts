import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/admin/service.service';

@Component({
  selector: 'app-showallusers',
  templateUrl: './showallusers.component.html',
  styleUrls: ['./showallusers.component.scss']
})
export class ShowallusersComponent implements OnInit {

  allUsers: any = []
  result: any = {}
  msgCheck: any = null
  headTitle: string = 'Users'

  // users: UserData[]

  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['Name', 'Email', 'Actions'];


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _userService: ServiceService, private _router: Router) {

    // Create 100 users
    // this.users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render

  }

  ngOnInit(): void {
    this.getAllUsers()
  }

  getAllUsers() {
    this._userService.showAllUsers().subscribe(res => {
      this.result = res
      this.allUsers = this.result.success
      this.dataSource = new MatTableDataSource(this.allUsers)
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

    this._userService.deleteUserByAdmin(id).subscribe(res => { },
      () => { },
      () => { this._router.navigate(['/users']) })
  }

}
