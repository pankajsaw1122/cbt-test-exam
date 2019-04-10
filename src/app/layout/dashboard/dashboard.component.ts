import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { MatDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
  answerForm: FormGroup;
  index = 0;
  questionsId = [];
  btnText = 'Save & Next';
  prevDisable = false;
  nextDisable = false;
  quesData = {
    categ_marks: 0,
    categ_name: '',
    choiceData: [],
    choice_id: [],
    marks: 1,
    neg_mark: 0.25,
    ques_categ_id: 0,
    ques_id: 0,
    ques_text: '',
    ques_type_id: 0,
    ques_type: '',
    total_categ_ques: 0
  };
  choiceId = [];

  constructor(
    public dialog: MatDialog,
    public router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.apiService
      .fetchQuestionsList(sessionStorage.getItem('examId'))
      .subscribe((data: any) => {
        this.questionsId = data.data;
        if (data.status === 200 || data.status === '200') {
          this.fetchQuestion(this.index);
          this.apiService.onQuesLoad.emit(this.questionsId);
        }
      });

    this.apiService.onQuesClicked.subscribe((index: any) => {
      this.index = index;
      this.fetchQuestion(this.index);
    });
  }

  initializeForm() {
    console.log('Initialize form called');
    this.answerForm = new FormGroup({
      exam_id: new FormControl(sessionStorage.getItem('examId')),
      categ_id: new FormControl(''),
      ques_id: new FormControl(''),
      choice_id_radio: new FormControl(),
      choice_id_checkbox1: new FormControl(false),
      choice_id_checkbox2: new FormControl(false),
      choice_id_checkbox3: new FormControl(false),
      choice_id_checkbox4: new FormControl(false)
    });
  }

  fetchQuestion(index) {
    console.log('fetch question called');
    this.initializeForm();
    // this.answerForm.reset();
    let data = {
      examId: sessionStorage.getItem('examId'),
      quesId: this.questionsId[index].id
    };
    this.apiService.examQuestionsData(data).subscribe((data: any) => {
      console.log('question data fetched');
      this.quesData = data.data[0];
      console.log(this.quesData);
      if (data.status === 200 || data.status === '200') {
        this.answerForm
          .get('exam_id')
          .setValue(sessionStorage.getItem('examId'));
        this.answerForm.get('categ_id').setValue(this.quesData.ques_categ_id);
        this.answerForm.get('ques_id').setValue(this.quesData.ques_id);
        console.log(this.answerForm.value);
        if (
          this.quesData.ques_type_id === 1 &&
          this.quesData.choice_id !== null
        ) {
          if (this.quesData.choice_id[0] !== '') {
            console.log('question is radio typed');
            this.answerForm
              .get('choice_id_radio')
              .setValue(this.quesData.choice_id[0]);
          }
        }
        console.log(this.answerForm.value);
        if (
          this.quesData.ques_type_id === 2 &&
          this.quesData.choice_id !== null
        ) {
          if (this.quesData.choice_id.length !== null) {
            console.log('Condition is true');
            for (let i = 0; i < this.quesData.choiceData.length; i++) {
              for (let j = 0; j < this.quesData.choice_id.length; j++) {
                console.log('question is checkbox typed');
                if (this.quesData.choiceData[i].choiceId === this.quesData.choice_id[j] && i === 0) {
                  this.answerForm.get('choice_id_checkbox1').setValue(true);
                }
                if (this.quesData.choiceData[i].choiceId === this.quesData.choice_id[j] && i === 1) {
                  this.answerForm.get('choice_id_checkbox2').setValue(true);
                }
                if (this.quesData.choiceData[i].choiceId === this.quesData.choice_id[j] && i === 2) {
                  this.answerForm.get('choice_id_checkbox3').setValue(true);
                }
                if (
                  this.quesData.choiceData[i].choiceId ===
                    this.quesData.choice_id[j] &&
                  i === 3
                ) {
                  this.answerForm.get('choice_id_checkbox4').setValue(true);
                }
              }
            }
          }
          console.log(this.answerForm.value);
        }
      }
    });
  }

  onPrev() {
    console.log('Previous button called');
    this.nextDisable = false;
    // this.answerForm.reset();
    if (this.index !== 0) {
      this.index--;
      this.fetchQuestion(this.index);
      this.apiService.onNextOrPrevClick.emit(this.index);
    }
    if (this.index === 0) {
      this.prevDisable = true;
    }
    if (this.questionsId.length - 1 === this.index) {
      this.btnText = 'Finish Exam';
    } else {
      this.btnText = 'Save & Next';
    }
  }
  onNext() {
    console.log('next button called');
    this.prevDisable = false;
    if (this.index === this.questionsId.length - 2) {
      this.nextDisable = true;
    }
    // this.answerForm.reset();
    if (this.questionsId.length - 1 > this.index) {
      console.log('from next button fetch question called');
      this.index++;
      this.fetchQuestion(this.index);
      this.apiService.onNextOrPrevClick.emit(this.index);
    }
    if (this.questionsId.length - 1 === this.index) {
      this.btnText = 'Finish Exam';
    } else {
      this.btnText = 'Save & Next';
    }
  }
  onClear() {
    this.answerForm.get('choice_id_radio').setValue('');
    this.answerForm.get('choice_id_checkbox1').setValue(false);
    this.answerForm.get('choice_id_checkbox2').setValue(false);
    this.answerForm.get('choice_id_checkbox3').setValue(false);
    this.answerForm.get('choice_id_checkbox3').setValue(false);
    this.answerForm.value.choiceId = [];
    this.removeAnswer();
  }
  removeAnswer() {
    this.apiService
      .removeAnswer(this.answerForm.value)
      .subscribe((data: any) => {
        if (data.status === 200 || data.status === '200') {
          if (this.questionsId.length - 1 > this.index) {
            this.answerForm.reset();
            this.fetchQuestion(this.index);
            this.apiService.onClear.emit(this.index);
          }
        }
      });
  }

  onSubmit() {
    if (this.questionsId.length - 1 === this.index) {
      this.btnText = 'Finish Exam';
    } else {
      this.btnText = 'Save & Next';
    }

    this.choiceId = [];
    console.log(this.choiceId);
    if (
      this.quesData.ques_type_id === 1 &&
      this.answerForm.value.choice_id_radio !== null
    ) {
      console.log(this.answerForm.value.choice_id_radio);
      this.choiceId.push(this.answerForm.value.choice_id_radio);
    }
    console.log(this.choiceId);
    if (this.quesData.ques_type_id === 2) {
      if (this.answerForm.value.choice_id_checkbox1 === true) {
        this.choiceId.push(this.quesData.choiceData[0].choiceId);
      }
      if (this.answerForm.value.choice_id_checkbox2 === true) {
        this.choiceId.push(this.quesData.choiceData[1].choiceId);
      }
      if (this.answerForm.value.choice_id_checkbox3 === true) {
        this.choiceId.push(this.quesData.choiceData[2].choiceId);
      }
      if (this.answerForm.value.choice_id_checkbox4 === true) {
        this.choiceId.push(this.quesData.choiceData[3].choiceId);
      }
    }
    console.log(this.choiceId);

    this.answerForm.value.choiceId = this.choiceId;
    if (this.answerForm.value.choiceId.length !== 0) {
      console.log(this.answerForm.value.choiceId);
      console.log('choice id length = ' + this.answerForm.value.choiceId.length);
      this.saveAnswer();
    } else {
      this.onNext();
    }
  }

  saveAnswer() {
    this.apiService.onAnswered.emit(this.index);
    this.apiService.saveAnswer(this.answerForm.value).subscribe((data: any) => {
      if (data.status === 200 || data.status === '200') {
        if (this.questionsId.length - 1 > this.index) {
          this.answerForm.reset();
          this.index++;
          this.fetchQuestion(this.index);
        }
      }
    });
  }

  finishExam() {
    let examId = sessionStorage.getItem('examId');
    const dialogRef = this.dialog.open(MatDialogComponent, {
      width: '30%',
      data: {
        id: examId,
        confirmMessage: 'Are you sure you want to Finish this Exam ?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.apiService.finishExam(examId).subscribe((data: any) => {
          console.log(data);
          if (data.status === 200 || data.status === '200') {
            this.router.navigate(['/finishexam']);
          } else {
          }
        });
      }
    });
  }
}
