import { Component, OnInit } from '@angular/core';
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

  constructor(
    public router: Router,
    private apiService: ApiService,
    private paramRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.apiService
      .getMarksData(sessionStorage.getItem('examId'))
      .subscribe((data: any) => {
        console.log(data);
        if (data.status === 200 || data.status === '200') {
          console.log(data.data);
          for (let examData of data.data) {
            console.log(examData);
            if (
              JSON.stringify(examData.answered_id) ==
              JSON.stringify(examData.correct_ans_id)
            ) {
              console.log('anser matched');
              this.resultData.positiveCount++;
              this.resultData.positiveMark = this.resultData.positiveMark + examData.marks;
            } else {
              this.resultData.negCount++;
              this.resultData.negMark = this.resultData.negMark + examData.neg_mark;
            }
          }
          this.resultData.totalAnswerCount = this.resultData.positiveCount + this.resultData.negCount;
          this.resultData.finalExamMark = this.resultData.positiveMark - this.resultData.negMark;
          console.log('total finalExamMark mark = ' + this.resultData.finalExamMark);
          this.saveResult(this.resultData);
        }
      });
  }

  saveResult(resultData) {
    this.apiService
      .saveResult(resultData)
      .subscribe((data: any) => {
        console.log(data);
        if (data.status === 200 || data.status === '200') {
          console.log(data.data);
        }
      });
  }
}
