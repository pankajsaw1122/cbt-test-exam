import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from 'src/app/router.animations';
import { ReturnStatement } from '@angular/compiler';

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.scss'],
  animations: [routerTransition()]
})
export class AddQuestionsComponent implements OnInit {
  editId = undefined;
  quesForm: FormGroup;
  examData: [];
  categData: [];
  quesTypeData: [];
  pageHeading = 'Add Questions';
  btnText = 'Add';
  submitSuccess = null;
  successMsg = '';
  errorText = '';
  typeId = 1;
  quesData = {
    option_id: []
  };
  constructor(
    private apiService: ApiService,
    private router: Router,
    private paramRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.editId = this.paramRoute.snapshot.params['id'];
    this.quesForm = new FormGroup({
      examId: new FormControl('', [Validators.required]),
      categId: new FormControl('', [Validators.required]),
      quesText: new FormControl('', [Validators.required]),
      marks: new FormControl(1, [Validators.required]),
      negMark: new FormControl(0.25, [Validators.required]),
      choiceType: new FormControl(1, [Validators.required]),
      choice1: new FormControl('', [Validators.required]),
      choice2: new FormControl('', [Validators.required]),
      choice3: new FormControl('', [Validators.required]),
      choice4: new FormControl('', [Validators.required]),
      choiceA: new FormControl(false),
      choiceB: new FormControl(false),
      choiceC: new FormControl(false),
      choiceD: new FormControl(false)
    });
    this.apiService.getExamData('').subscribe((data: any) => {
      // console.log(data);
      if (data.status === 200 || data.status === '200') {
        // console.log('Data fetched successfully');
        this.examData = data.data;
        console.log(this.examData);
      } else {
        console.log('request failed');
      }
    });

    this.apiService.getQuesType().subscribe((data: any) => {
      // console.log(data);
      if (data.status === 200 || data.status === '200') {
        // console.log('Data fetched successfully');
        this.quesTypeData = data.data;
      } else {
        console.log('request failed');
      }
    });

    if (this.editId !== undefined) {
      this.pageHeading = 'Edit Question';
      this.btnText = 'Update';
      this.apiService.getQuesData(this.editId).subscribe((data: any) => {
        console.log(data);
        if (data.status === 200 || data.status === '200') {
          this.quesData = data.data[0];
          this.quesForm.get('examId').setValue(data.data[0].exam_id);
          this.quesForm.get('categId').setValue(data.data[0].ques_categ_id);
          this.quesForm.get('quesText').setValue(data.data[0].ques_text);
          this.quesForm.get('marks').setValue(data.data[0].marks);
          this.quesForm.get('negMark').setValue(data.data[0].neg_mark);
          this.quesForm.get('choiceType').setValue(data.data[0].ques_type_id);
          this.quesForm.get('choice1').setValue(data.data[0].choice_text[0]);
          this.quesForm.get('choice2').setValue(data.data[0].choice_text[1]);
          this.quesForm.get('choice3').setValue(data.data[0].choice_text[2]);
          this.quesForm.get('choice4').setValue(data.data[0].choice_text[3]);
          this.quesForm.get('choiceA').setValue(data.data[0].choice_id[0]);
          this.quesForm.get('choiceB').setValue(data.data[0].choice_id[1]);
          this.quesForm.get('choiceC').setValue(data.data[0].choice_id[2]);
          this.quesForm.get('choiceD').setValue(data.data[0].choice_id[3]);
        } else {
          this.submitSuccess = 0;
          console.log('request failed');
        }
      });
    }
  }
  showCategoryList(id) {
    console.log('change method called');
    this.apiService.getCategoryData(id).subscribe((data: any) => {
      console.log(data);
      if (data.status === 200 || data.status === '200') {
        // console.log('Data fetched successfully');
        this.categData = data.data;
      } else if (data.status === 401 || data.status === '401') {
        console.log('Token error');
        this.router.navigate(['/login']);
      } else {
        console.log('request failed');
      }
    });
  }
  setChoiceType(id) {
    let count = 0;
    this.errorText = '';
    if (id === 1) {
      console.log('Inside id 1');
      console.log(this.quesForm.value.choiceA);
      if (this.quesForm.value.choiceA) {
        console.log(this.quesForm.value.choiceA);
        count++;
      }
      if (this.quesForm.value.choiceB) {
        console.log(this.quesForm.value.choiceB);
        count++;
      }
      if (this.quesForm.value.choiceC) {
        console.log(this.quesForm.value.choiceC);
        count++;
      }
      if (this.quesForm.value.choiceD) {
        console.log(this.quesForm.value.choiceD);
        count++;
      }
      if (count === 0) {
        this.errorText = 'Please tick on correct answer option box';
      } else if (count > 1) {
        this.errorText = 'Please remove multiple selection';
      } else {
        console.log('inside else in id 1');
        count = 0;
        this.errorText = '';
      }
    } else if (id === 2) {
      console.log('count = ' + count);
      if (
        this.quesForm.value.choiceA ||
        this.quesForm.value.choiceB ||
        this.quesForm.value.choiceC ||
        this.quesForm.value.choiceD
      ) {
        count++;
      }
      if (count === 0) {
        this.errorText = 'Please select atleast one correct answer';
      } else {
        console.log('inside else in id 1');
        count = 0;
        this.errorText = '';
      }
    }
    console.log(
      'print = ' +
        id +
        'count == ' +
        count +
        ' errorText = ' +
        this.errorText.length
    );
  }

  onSubmit() {
    console.log(this.quesForm);
    console.log(this.quesForm.value);
    console.log('print errorText = ' + this.errorText.length);

    this.setChoiceType(this.quesForm.value.choiceType);
    if (!this.quesForm.valid || this.errorText.length !== 0) {
      return;
    }
    if (this.editId === undefined) {
      this.apiService
        .addQuestion(this.quesForm.value)
        .subscribe((data: any) => {
          console.log(data);
          if (data.status === 200 || data.status === '200') {
            setTimeout(() => {
              this.successMsg = '';
              this.submitSuccess = null;
              this.router
                .navigateByUrl('/questions', { skipLocationChange: true })
                .then(() => this.router.navigate(['/questions/add-questions']));
            }, 1500);
            this.submitSuccess = 1;
            this.successMsg = 'Question added Successfully';
          } else {
            this.submitSuccess = 0;
            console.log('request failed');
          }
        });
    } else {
      this.quesForm.value.editId = this.editId;
      this.quesForm.value.optionId1 = this.quesData.option_id[0];
      this.quesForm.value.optionId2 = this.quesData.option_id[1];
      this.quesForm.value.optionId3 = this.quesData.option_id[2];
      this.quesForm.value.optionId4 = this.quesData.option_id[3];

      this.apiService
        .updateQuestion(this.quesForm.value)
        .subscribe((data: any) => {
          console.log(data);
          if (data.status === 200 || data.status === '200') {
            setTimeout(() => {
              this.router.navigate(['/questions']);
            }, 3000);
            this.submitSuccess = 1;
            this.successMsg = 'Question Update Successfull';
          } else {
            this.submitSuccess = 0;
            console.log('request failed');
          }
        });
    }
  }
}
