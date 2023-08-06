import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../shared/http.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
export interface UserData {
  id: string;
  first_name: string;
  last_name: string;
  avatar: string;
}
@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit ,AfterViewInit {
  dataSource!: MatTableDataSource<UserData>;
  displayedColumns: string[] = ['id', 'first_name', 'last_name', 'avatar'];
  totalRecords = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  currentPage = 0
  pageSize = 5;
  details: any;
  constructor(private http: HttpService) {
  }
  ngOnInit(): void {
    this.searchAllUser(this.currentPage);
  }
  searchAllUser(page: number) {
    this.http.getAllUsers(page,this.pageSize)
      .subscribe((val: any) => {
        console.log(val);
        this.details = val;
        this.totalRecords = val.total
        this.dataSource = new MatTableDataSource(val.data);
        this.paginator.pageIndex = this.currentPage;
        this.paginator.length = val.total;
      })

   
  }
  ngAfterViewInit() {
    this.totalRecords = this.details.total
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
  pageChanged(event: PageEvent) {
    console.log({ event });
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.searchAllUser(this.currentPage);
  }
}
