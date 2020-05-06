import { Component, OnInit, OnDestroy } from '@angular/core';
import { routerTransition } from '../router.animations';
import { ApiService } from '../shared/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-finish-exam',
  templateUrl: './finish-exam.component.html',
  styleUrls: ['./finish-exam.component.scss'],
  animations: [routerTransition()]
})
export class FinishExamComponent implements OnInit {
  resultData = {
    examId: sessionStorage.getItem('examId'),
    totalAnswerCount: 0,
    positiveCount: 0,
    positiveMark: 0,
    negCount: 0,
    negMark: 0,
    finalExamMark: 0
  };

  examData = {
    examName: sessionStorage.getItem('exam_name'),
    examDuration: sessionStorage.getItem('examMinute'),
    totalQues: sessionStorage.getItem('examTotalQues'),
    totalMarks: sessionStorage.getItem('examMarks'),
    name: sessionStorage.getItem('candtName'),
    roll: sessionStorage.getItem('candtRoll'),
    classes: sessionStorage.getItem('classes')
  };
  constructor(
    public router: Router,
    private apiService: ApiService,
    private paramRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.apiService
      .getMarksData(sessionStorage.getItem('examId'))
      .subscribe((data: any) => {
        if (data.status === 200 || data.status === '200') {
          for (const examData of data.data) {
            if (
              JSON.stringify(examData.answered_id) ==
              JSON.stringify(examData.correct_ans_id)
            ) {
              this.resultData.positiveCount++;
              this.resultData.positiveMark = this.resultData.positiveMark + examData.marks;
            } else {
              this.resultData.negCount++;
              this.resultData.negMark = this.resultData.negMark + examData.neg_mark;
            }
          }
          this.resultData.totalAnswerCount = this.resultData.positiveCount + this.resultData.negCount;
          this.resultData.finalExamMark = this.resultData.positiveMark - this.resultData.negMark;
          this.saveResult(this.resultData);
        }
      });
  }

  saveResult(resultData) {
    this.apiService
      .saveResult(resultData)
      .subscribe((data: any) => {
        if (data.status === 200 || data.status === '200') {
          console.log(data.data);
        }
      });
  }
  ngOnDestroy() {
    window.sessionStorage.clear();
    window.localStorage.clear();
  }
}
