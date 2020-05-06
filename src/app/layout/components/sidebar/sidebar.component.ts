import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  pushRightClass: string = 'push-right';
  // index = 1;
  quesList = [];
  clickedQues = [true];
  answeredQues = [];
  unAnswered = [];

  // currentQues = [];
  candidateData = {
    name: sessionStorage.getItem('candtName'),
    roll: sessionStorage.getItem('candtRoll'),
    classes: sessionStorage.getItem('classes')
  };
  examData = {
    exam_name: '',
    exam_minute: '',
    total_marks: '',
    total_ques: ''
  };

  constructor(public router: Router, private apiService: ApiService) { }

  ngOnInit() {
    this.apiService
      .getExamData(sessionStorage.getItem("examId"))
      .subscribe((data: any) => {
        if (data.status === 200 || data.status === '200') {
          this.examData = data.data[0];
          // this.examMinute = data.data[0].exam_minute * 60000
        }
      });



    this.apiService.onQuesLoad.subscribe((list: any) => {
      this.quesList = list;
      // console.log('queslist in sidebar');
      // console.log(this.quesList);

      let order = 'FIELD (id, ';

      let i = 0;
      while (i < this.quesList.length) {
        if (i === this.quesList.length - 1) {
          order = order + this.quesList[i].id;
        } else {
          order = order + this.quesList[i].id + ', ';
        }

        this.clickedQues.push(false);
        this.answeredQues.push(false);
        this.unAnswered.push(false);
        i++;
      }
      order = order + ')';
      this.saveQuestionOrder(order);
      this.checkAnswerList();
    });
    this.apiService.onAnswered.subscribe((index: any) => {
      this.answeredQues[index] = true;
      // this.clickedQues[index] = false;
      if (index < this.clickedQues.length) {
        this.clickedQues[index + 1] = true;
      }
    });
    this.apiService.onNextOrPrevClick.subscribe((index: any) => {
      this.clickedQues[index] = true;
    });
    this.apiService.onClear.subscribe((index: any) => {
      this.unAnswered[index] = false;
      this.answeredQues[index] = false;
    });
    this.apiService.onWithoutSaveNext.subscribe((index: any) => {
      // this.answeredQues[index] = false;
      this.unAnswered[index] = true;
      this.clickedQues[index + 1] = true;
    });
    this.apiService.onClear.subscribe((index: any) => {
      this.answeredQues[index] = false;
    });
  }

  checkAnswerList() {
    this.apiService.answerList(sessionStorage.getItem("examId")).subscribe((list: any) => {
      // this.quesList = list;
      // console.log('question list is here');
      // console.log(this.quesList);

      // console.log('answerlist in sidebar');
      // console.log(list);
      let i = 0;
      for (const ques of this.quesList) {
        for (const ans of list.data) {

          console.log(ques.id + ' --------------' + ans.ques_id);
          if (ques.id === ans.ques_id) {
            if (ans.attempted) {
              // console.log('Inside attempted');
              this.clickedQues[i] = true;
              // this.answeredQues[i] = false;
              // this.unAnswered[i] = false;
            } else if (ans.unanswerd) {
              // console.log('Inside unanswered *************');

              // this.clickedQues[i] = false;
              // this.answeredQues[i] = false;
              this.unAnswered[i] = true;
            } else if (ans.answered) {
              // this.clickedQues[i] = false;
              this.answeredQues[i] = true;
              // this.unAnswered[i] = false;
            } else {
              // this.clickedQues[i] = false;
              this.answeredQues[i] = false;
              this.unAnswered[i] = false;
            }
          }
        }
        i++;
      }
      // let i = 0;
      // while (i < this.quesList.length) {
      //   this.clickedQues.push(false);
      //   this.answeredQues.push(false);
      //   this.unAnswered.push(false);
      //   i++;
      // }
    });
  }
  saveQuestionOrder(order) {
    const param = {
      examId: sessionStorage.getItem("examId"),
      quesOrder: order
    };
    this.apiService
      .saveQuestionOrder(param)
      .subscribe((data: any) => {
        if (data.status === 200 || data.status === '200') {
          console.log('Question order saved');
          // this.examMinute = data.data[0].exam_minute * 60000
        }
      });
  }

  quesClicked(index) {
    this.clickedQues[index] = true;
    this.apiService.onQuesClicked.emit(index);
  }
}
