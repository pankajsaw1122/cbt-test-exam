import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from 'src/app/router.animations';

@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrls: ['./add-exam.component.scss'],
  animations: [routerTransition()]
})
export class AddExamComponent implements OnInit {
  editId = undefined;
  examForm: FormGroup;
  pageHeading = 'Add Exam';
  btnText = 'Add';
  submitSuccess = null;
  successMsg = '';
  constructor(
    private apiService: ApiService,
    private router: Router,
    private paramRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.editId = this.paramRoute.snapshot.params['id'];
    this.examForm = new FormGroup({
      examName: new FormControl('', [Validators.required]),
      classes: new FormControl('', [Validators.required]),
      examDate: new FormControl('', [Validators.required]),
      examHour: new FormControl('', [Validators.required]),
      examMin: new FormControl('', [Validators.required]),
      totalMinute: new FormControl('', [Validators.required]),
      totalMarks: new FormControl('', [Validators.required])
    });

    if (this.editId !== undefined) {
      this.pageHeading = 'Edit Exam';
      this.btnText = 'Update';
      this.apiService.getExamData(this.editId).subscribe((data: any) => {
        console.log(data);
        if (data.status === 200 || data.status === '200') {
          this.examForm.get('examName').setValue(data.data[0].exam_name);
          this.examForm.get('classes').setValue(data.data[0].classes);
          this.examForm.get('examDate').setValue(data.data[0].exam_date);
          this.examForm
            .get('examHour')
            .setValue(data.data[0].exam_time.split(':')[0]);
          this.examForm
            .get('examMin')
            .setValue(data.data[0].exam_time.split(':')[1]);
          this.examForm.get('totalMinute').setValue(data.data[0].exam_minute);
          this.examForm.get('totalMarks').setValue(data.data[0].total_marks);
        } else {
          this.submitSuccess = 0;
          console.log('request failed');
        }
      });
    }
  }

  onSubmit() {
    this.examForm.value.examTime =
    this.examForm.value.examHour + ':' + this.examForm.value.examMin;
    if (this.editId === undefined) {
      this.apiService.addExam(this.examForm.value).subscribe((data: any) => {
        console.log(data);
        if (data.status === 200 || data.status === '200') {
          setTimeout(() => {
            this.router.navigate(['/exam']);
          }, 3000);
          this.submitSuccess = 1;
          this.successMsg = 'Exam Created Successfully';
        } else {
          this.submitSuccess = 0;
          console.log('request failed');
        }
      });
    } else {
      this.examForm.value.editId = this.editId;
      this.apiService.updateExam(this.examForm.value).subscribe((data: any) => {
        console.log(data);
        if (data.status === 200 || data.status === '200') {
          setTimeout(() => {
            this.router.navigate(['/exam']);
          }, 3000);
          this.submitSuccess = 1;
          this.successMsg = 'Exam Update Successfull';
        } else {
          this.submitSuccess = 0;
          console.log('request failed');
        }
      });
    }
  }
}
