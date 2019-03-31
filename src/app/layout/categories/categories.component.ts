import { Component, OnInit, ViewChild } from '@angular/core';
import { routerTransition } from '../../router.animations';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatPaginator, MatSort} from '@angular/material';
import { AddCategoriesComponent } from './add-categories/add-categories.component';
import { MatDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { ApiService } from '../../shared/services/api.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss'],
    animations: [routerTransition()]
})
export class CategoriesComponent implements OnInit {
    displayedColumns: string[] = ['id', 'exam_name', 'categ_name', 'total_ques', 'total_marks', 'action'];
    dataSource: MatTableDataSource<ExamData>;
    submitSuccess = null;
    resultsLength = 0;
    isLoadingResults = true;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    constructor(public dialog: MatDialog, private apiService: ApiService, private router: Router) { }

    ngOnInit() {
        this.apiService.getCategoryData('').subscribe((data: any) => {
            console.log(data);
            if (data.status === 200 || data.status === '200') {
                console.log('Data fetched successfully');
                this.dataSource = new MatTableDataSource(data.data);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.resultsLength = data.data.length;
                this.isLoadingResults = false;
                this.submitSuccess = 1;
            } else if (data.status === 401 || data.status === '401') {
                console.log('Token error');
                this.router.navigate(['/login']);
            } else {
                this.isLoadingResults = false;
                this.submitSuccess = 0;
                console.log('request failed');
            }
        });
    }

    applyFilter(filterValue: string) {
        console.log('filter working');
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
      }

    onSubmit() {
    }
    onEdit(id) {
        console.log('inside edit ' + id);
        this.router.navigate(['/categories/edit-categories/', id]);
    }
    openDialog(editId) {
        const dialogRef = this.dialog.open(MatDialogComponent, {
            width: '30%',
            data: { id: editId, confirmMessage: 'Are you sure you want to delete this exam ?' }
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
            if (result === true) {
                this.apiService.deleteCategory(editId).subscribe((data: any) => {
                    console.log(data);
                    if (data.status === 200 || data.status === '200') {
                        console.log('Category delete successfull');
                        this.submitSuccess = 1;
                        this.ngOnInit();
                    } else {
                        this.submitSuccess = 0;
                        console.log('request failed');
                    }
                });
            }
        });
    }
}

export interface ExamData {
    id: string;
    exam_name: string;
    categ_name: string;
    total_ques: number;
    total_marks: number;
  }