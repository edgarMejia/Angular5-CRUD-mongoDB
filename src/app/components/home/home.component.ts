import { Component, AfterViewInit, ViewChild, ChangeDetectorRef, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, PageEvent } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import { of as observableOf } from 'rxjs/observable/of';
import { catchError} from 'rxjs/operators/catchError';
import { map } from 'rxjs/operators/map';
import { take } from 'rxjs/operator/take';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';

import { Person } from '../../models/Person';
import { PersonService } from '../../services/person.service';

import { Router } from '@angular/router';

// DIALOGS
import { MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmComponent } from '../../components/confirm/confirm.component';
import { FormComponent } from '../../components/form/form.component';
import { SnackbarComponent } from '../../components/snackbar/snackbar.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    providers: [ PersonService ]
})
export class HomeComponent implements AfterViewInit {
    displayedColumns = ['firstName','lastName','email', 'department', 'dui', 'lenguages', 'cellphone', 'hireOn', '_id'];
    dataSource = new MatTableDataSource();

    resultsLength = 0;

    pageEvent: PageEvent;
    pageSizeOptions = [5, 10, 25, 100];
    pageSize = 5;
    page = 1;
    isLoading = false;
    isTotalReached = false;
    totalItems = 0;
    search = '';

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private cdr:ChangeDetectorRef,
        private personService: PersonService,
        private router: Router,
        public dialog: MatDialog,
        public snack: MatSnackBar
    ) { }

    ngOnInit() {}

    ngAfterViewInit() {
        this.getData();
    }

    ngAfterViewChecked(){
        this.cdr.detectChanges();
    }

    openSnack(data) {
        this.snack.openFromComponent(SnackbarComponent, {
            data: { data: data },
            duration: 3000
        });
    }

    onPaginateChange(event){
        this.page = event.pageIndex + 1;
        this.pageSize = event.pageSize;
        this.getData();
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.search = filterValue;
        this.getData();
      }

    // GET PERSONS
    getData() {
        merge().pipe(
            startWith({}),
            switchMap(() => {
                this.isLoading = true;
                return this.personService!.getList();
            }),
                map(data => {
                    console.log(data);
                    this.isLoading = false;
                    this.isTotalReached = false;
                    return data.data;
                }),
                catchError(() => {
                    this.isLoading = false;
                    this.isTotalReached = true;
                    return observableOf([]);
                })
        ).subscribe(data => this.dataSource.data = data);
    }

    

    // SAVE PERSONS
    save():void {
        let dialogRef = this.dialog.open(FormComponent, {
            height: '98%',
            width: '600px',
            data: { title: 'AGREGAR REGISTRO', action: 'save'}
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result)
                this.paginator._changePageSize(this.paginator.pageSize);
        });
    }

    // EDIT PERSONS
    view(row:Person):void {
        let dialogRef = this.dialog.open(FormComponent, {
            height: '98%',
            width: '600px',
            data: { title: 'SEE RECORD', action: 'view', data:row}
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result)
                this.paginator._changePageSize(this.paginator.pageSize);
        });
    }

    // EDIT PERSONS
    edit(row:Person):void {
        let dialogRef = this.dialog.open(FormComponent, {
            height: '98%',
            width: '600px',
            data: { title: 'EDIT RECORD', action: 'edit', data:row}
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result)
                this.paginator._changePageSize(this.paginator.pageSize);
        });
    }

    // DELETE PERSONS
    delete(row: Person){
        let dialogRef = this.dialog.open(ConfirmComponent, {
            width: '250px',
            data: { 
                title: 'Confirm the action',
                message: 'Are you sure you want to delete this record?'
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result){
                this.personService.delete(row._id).subscribe((data:any) => {
                    if(data.success){
                        this.paginator._changePageSize(this.paginator.pageSize);
                        this.openSnack(data);
                    }else{
                        this.openSnack(data);
                    }
                });
            }
        });
    }
}
