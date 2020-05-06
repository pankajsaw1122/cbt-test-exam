import { Component, OnInit, ViewChild } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { MatDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { timeInterval } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  answerForm: FormGroup;
  index = 0;
  questionsId = [];
  btnText = 'Save & Next';
  prevDisable = false;
  nextDisable = false;
  disableFinishBtn = true;
  imagePath = 'http://' + window.location.hostname + ':5000/';
  quesData = {
    categ_marks: 0,
    categ_name: '',
    choiceData: [],
    choice_id: [],
    choiceImage1: '',
    choiceImage2: '',
    choiceImage3: '',
    choiceImage4: '',
    marks: 1,
    neg_mark: 0.25,
    ques_categ_id: 0,
    ques_id: 0,
    ques_text: '',
    ques_image: '',
    ques_type_id: 0,
    ques_type: '',
    total_categ_ques: 0
  };
  choiceId = [];
  ckeConfig: any;
  @ViewChild('editor', { static: false }) ckeditor: any;
  constructor(
    public dialog: MatDialog,
    public router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    if (sessionStorage.getItem('isLoggedIn') !== '1') {
      this.router.navigate(['/']);
    }
    this.ckeConfig = {
      allowedContent: true,
      readOnly: true,
      type: 'inline',
      // enterMode: 2,
      // extraPlugins: 'divarea',
      forcePasteAsPlainText: false,
      height: 'auto',
      toolbarGroups: [
      ],
    };
    this.initializeForm();
    this.apiService.fetchQuestionsList(sessionStorage.getItem('examId')).subscribe((data: any) => {
      this.questionsId = data.data;
      // console.log('Questions list id s');
      // console.log(this.questionsId);
      if (data.status === 200 || data.status === '200') {
        this.fetchQuestion(this.index);
        this.apiService.onQuesLoad.emit(this.questionsId);
      }
    });

    this.apiService.onQuesClicked.subscribe((index: any) => {
      this.index = index;
      if (this.index < this.questionsId.length - 1) {
        this.nextDisable = false;
      }
      if (this.index === this.questionsId.length - 1) {
        this.nextDisable = true;
      }
      if (this.index > 0) {
        this.prevDisable = false;
      }
      if (this.index === 0) {
        this.prevDisable = true;
      }
      this.fetchQuestion(this.index);
    });

    this.apiService.enableFinishBtn.subscribe((value: any) => {
      this.disableFinishBtn = value;
    });
  }

  initializeForm() {
    this.answerForm = new FormGroup({
      exam_id: new FormControl(sessionStorage.getItem('examId')),
      categ_id: new FormControl(''),
      ques_id: new FormControl(''),
      choice_id_radio: new FormControl(''),
      choice_id_checkbox1: new FormControl(false),
      choice_id_checkbox2: new FormControl(false),
      choice_id_checkbox3: new FormControl(false),
      choice_id_checkbox4: new FormControl(false)
    });
  }

  fetchQuestion(index) {
    this.initializeForm();
    // this.answerForm.reset();
    const params = {
      examId: sessionStorage.getItem('examId'),
      quesId: this.questionsId[index].id
    };
    this.apiService.examQuestionsData(params).subscribe((data: any) => {
      this.quesData = data.data[0];
      // console.log('Printing question data');
      console.log(this.quesData);

      if (data.status === 200 || data.status === '200') {
        this.answerForm.get('exam_id').setValue(sessionStorage.getItem('examId'));
        this.answerForm.get('categ_id').setValue(this.quesData.ques_categ_id);
        this.answerForm.get('ques_id').setValue(this.quesData.ques_id);
        this.quesData.ques_image = this.quesData.ques_image === '' ? '' : this.imagePath + this.quesData.ques_image;
        this.quesData.choiceData[0].choiceImage = this.quesData.choiceData[0].choiceImage !== '' ? this.imagePath + this.quesData.choiceData[0].choiceImage : '';
        this.quesData.choiceData[1].choiceImage = this.quesData.choiceData[1].choiceImage !== '' ? this.imagePath + this.quesData.choiceData[1].choiceImage : '';
        this.quesData.choiceData[2].choiceImage = this.quesData.choiceData[2].choiceImage !== '' ? this.imagePath + this.quesData.choiceData[2].choiceImage : '';
        this.quesData.choiceData[3].choiceImage = this.quesData.choiceData[3].choiceImage !== '' ? this.imagePath + this.quesData.choiceData[3].choiceImage : '';

        if (
          this.quesData.ques_type_id === 1 &&
          this.quesData.choice_id !== null
        ) {
          console.log('Inside choice consition');
          if (this.quesData.choice_id.length !== 0 && this.quesData.choice_id[0] !== '') {
            this.answerForm.get('choice_id_radio').setValue(this.quesData.choice_id[0]);
          }
        }
        if (
          this.quesData.ques_type_id === 2 &&
          this.quesData.choice_id !== null
        ) {
          if (this.quesData.choice_id.length !== null) {
            for (let i = 0; i < this.quesData.choiceData.length; i++) {
              for (let j = 0; j < this.quesData.choice_id.length; j++) {
                if (
                  this.quesData.choiceData[i].choiceId ===
                  this.quesData.choice_id[j] &&
                  i === 0
                ) {
                  this.answerForm.get('choice_id_checkbox1').setValue(true);
                }
                if (
                  this.quesData.choiceData[i].choiceId ===
                  this.quesData.choice_id[j] &&
                  i === 1
                ) {
                  this.answerForm.get('choice_id_checkbox2').setValue(true);
                }
                if (
                  this.quesData.choiceData[i].choiceId ===
                  this.quesData.choice_id[j] &&
                  i === 2
                ) {
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
        }
        console.log(this.answerForm.value);
        this.onAttemptSave();
      }
    });
  }

  onPrev() {
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
      this.btnText = 'Save';
    } else {
      this.btnText = 'Save & Next';
    }
  }
  onNext() {
    this.prevDisable = false;
    if (this.index === this.questionsId.length - 2) {
      this.nextDisable = true;
    }
    // this.answerForm.reset();
    if (this.questionsId.length - 1 > this.index) {
      this.index++;
      this.fetchQuestion(this.index);
      this.apiService.onNextOrPrevClick.emit(this.index);

    }
    if (this.questionsId.length - 1 === this.index) {
      this.btnText = 'Save';
    } else {
      this.btnText = 'Save & Next';
    }
  }
  onAttemptSave() {
    let flag = 0;
    if (this.quesData.ques_type_id === 1 && this.answerForm.value.choice_id_radio !== '') {
      flag++;
    }
    if (this.quesData.ques_type_id === 2) {
      if (this.answerForm.value.choice_id_checkbox1 === true) {
        flag++;
      }
      if (this.answerForm.value.choice_id_checkbox2 === true) {
        flag++;
      }
      if (this.answerForm.value.choice_id_checkbox3 === true) {
        flag++;
      }
      if (this.answerForm.value.choice_id_checkbox4 === true) {
        flag++;
      }
    }
    if (flag === 0) {
      this.apiService.saveAttempt(this.answerForm.value).subscribe((data: any) => {
        // console.log('Inside attempt save');
        // console.log(data);
      });
    }
  }

  onWithoutSaveNext() {
    this.apiService.noAnswerSave(this.answerForm.value).subscribe((data: any) => {
      // console.log('Inside attempt save');
      // console.log(data);
      this.prevDisable = false;
      if (this.index === this.questionsId.length - 2) {
        this.nextDisable = true;
      }
      // this.answerForm.reset();
      if (this.questionsId.length - 1 > this.index) {
        this.index++;
        this.fetchQuestion(this.index);
        this.apiService.onWithoutSaveNext.emit(this.index - 1);
      }
      if (this.questionsId.length - 1 === this.index) {
        this.btnText = 'Save';
      } else {
        this.btnText = 'Save & Next';
      }
    });
  }

  onClear() {
    console.log(this.answerForm.value.choice_id_radio);
    this.answerForm.get('choice_id_radio').setValue('');
    this.answerForm.get('choice_id_checkbox1').setValue(false);
    this.answerForm.get('choice_id_checkbox2').setValue(false);
    this.answerForm.get('choice_id_checkbox3').setValue(false);
    this.answerForm.get('choice_id_checkbox3').setValue(false);
    console.log(this.answerForm.value.choice_id_radio);

    this.answerForm.value.choiceId = [];
    this.removeAnswer();
  }
  removeAnswer() {
    this.apiService.removeAnswer(this.answerForm.value).subscribe((data: any) => {
      if (data.status === 200 || data.status === '200') {
        if (this.questionsId.length - 1 > this.index) {
          // this.answerForm.reset();
          this.fetchQuestion(this.index);
          this.apiService.onClear.emit(this.index);
        }
      }
    });
  }

  onSubmit() {
    console.log(this.answerForm.value.choice_id_radio);
    if (this.questionsId.length - 1 === this.index) {
      this.btnText = 'Save';
    } else {
      this.btnText = 'Save & Next';
    }

    this.choiceId = [];
    if (this.quesData.ques_type_id === 1 && this.answerForm.value.choice_id_radio !== '') {
      this.choiceId.push(this.answerForm.value.choice_id_radio);
    }
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

    this.answerForm.value.choiceId = this.choiceId;
    if (this.answerForm.value.choiceId.length !== 0) {
      this.saveAnswer();
    } else {
      this.onWithoutSaveNext();
    }
  }

  saveAnswer() {
    this.apiService.saveAnswer(this.answerForm.value).subscribe((data: any) => {
      if (data.status === 200 || data.status === '200') {
        if (this.questionsId.length - 1 >= this.index) {
          this.apiService.onAnswered.emit(this.index);
        }
        if (this.questionsId.length - 1 > this.index) {
          this.answerForm.reset();
          this.index++;
          this.fetchQuestion(this.index);
        }
      }
    });
  }

  finishExam() {
    const examId = sessionStorage.getItem('examId');
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
          if (data.status === 200 || data.status === '200') {
            this.router.navigate(['/finishexam']);
          }
        });
      }
    });
  }
}
