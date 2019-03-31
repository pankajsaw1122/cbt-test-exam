import { NgModule, Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ApiService } from '../../../shared/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from 'src/app/router.animations';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.scss'],
  animations: [routerTransition()]
})
export class AddCategoriesComponent implements OnInit {
  editId = undefined;
  categForm: FormGroup;
  examData = [];
  selected = 4;
  pageHeading = 'Add Category';
  btnText = 'Add';
  submitSuccess = null;
  successMsg = '';
  constructor(
    private apiService: ApiService,
    private router: Router,
    private paramRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.categForm = new FormGroup({
      examId: new FormControl('', [Validators.required]),
      totalQues: new FormControl('', [Validators.required]),
      categName: new FormControl('', [Validators.required]),
      totalMarks: new FormControl('', [Validators.required])
    });
    this.categForm.value.examId = 6;
    this.apiService.getExamData('').subscribe((data: any) => {
      console.log(data);
      if (data.status === 200 || data.status === '200') {
        console.log('Data fetched successfully');
        this.examData = data.data;
        console.log(this.examData);
      } else {
        console.log('request failed');
      }
    });
    this.editId = this.paramRoute.snapshot.params['id'];

    if (this.editId !== undefined) {
      this.pageHeading = 'Edit Category';
      this.btnText = 'Update';
      this.apiService.getCategoryData(this.editId).subscribe((data: any) => {
        console.log(data);
        if (data.status === 200 || data.status === '200') {
          // this.examData = data.data[0];
          this.categForm.get('examId').setValue(data.data[0].exam_id);
          this.categForm.get('categName').setValue(data.data[0].categ_name);
          this.categForm.get('totalQues').setValue(data.data[0].total_ques);
          this.categForm.get('totalMarks').setValue(data.data[0].total_marks);
          console.log(this.categForm.value.examId);
        } else {
          this.submitSuccess = 0;
          console.log('request failed');
        }
      });
    }
  }

  onSubmit() {
    if (this.editId === undefined) {
      this.apiService
        .addCategory(this.categForm.value)
        .subscribe((data: any) => {
          console.log(data);
          if (data.status === 200 || data.status === '200') {
            setTimeout(() => {
              this.router.navigate(['/categories']);
            }, 3000);
            this.submitSuccess = 1;
            this.successMsg = 'Category Created Successfully';
          } else {
            this.submitSuccess = 0;
            console.log('request failed');
          }
        });
    } else {
      this.categForm.value.editId = this.editId;
      this.apiService
        .updateCategory(this.categForm.value)
        .subscribe((data: any) => {
          console.log(data);
          if (data.status === 200 || data.status === '200') {
            setTimeout(() => {
              this.router.navigate(['/categories']);
            }, 3000);
            this.submitSuccess = 1;
            this.successMsg = 'Category Update Successfull';
          } else {
            this.submitSuccess = 0;
            console.log('request failed');
          }
        });
    }
  }
}
