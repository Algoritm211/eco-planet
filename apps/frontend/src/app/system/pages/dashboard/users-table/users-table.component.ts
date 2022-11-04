import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {User} from '@maorix-contract/types';
import {ContractService} from "../../../../shared/contract/contract.service";
import {BehaviorSubject, finalize, Subject, takeUntil} from "rxjs";

@Component({
  selector: 'maorix-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css'],
})
export class UsersTableComponent implements AfterViewInit, OnInit, OnDestroy {
  displayedColumns: string[] = ['accountId', 'name', 'award', 'socialRating'];
  dataSource: MatTableDataSource<User> = new MatTableDataSource();
  unsubscribe$ = new Subject<void>();
  loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private contractService: ContractService
  ) {
  }

  ngOnInit() {
    this.loading$.next(true);

    this.contractService.getAllUsers()
      .pipe(
        finalize(() => this.loading$.next(false)),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((users) => {
          this.dataSource.data = users;
        }
      )
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

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
