import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {User} from '@maorix-contract/types';

const USERS: User[] = [
  {accountId: 'test.net', name: 'Alex', contribution: 10, award: 5.77, socialRating: 90},
  {accountId: 'max.net', name: 'Max', contribution: 10, award: 7.8, socialRating: 105},
  {accountId: 'so.my.net', name: 'Andrii', contribution: 10, award: 56, socialRating: 34},
  {accountId: 'all.ok.net', name: 'Yulia', contribution: 10, award: 42, socialRating: 55},
  {accountId: 'murad.near.net', name: 'Murad', contribution: 10, award: 5, socialRating: 67},
]

@Component({
  selector: 'maorix-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css'],
})
export class UsersTableComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['accountId', 'name', 'award', 'socialRating'];
  dataSource: MatTableDataSource<User> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
  }

  ngOnInit() {
    this.dataSource.data = USERS;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
