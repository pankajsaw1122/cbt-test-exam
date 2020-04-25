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

  constructor(public router: Router, private apiService: ApiService) {}

  ngOnInit() {
    this.apiService
      .getExamData(sessionStorage.getItem("examId"))
      .subscribe((data: any) => {
        if (data.status === 200 || data.status === '200') {
          console.log(data.data[0]);
          this.examData = data.data[0];
          // this.examMinute = data.data[0].exam_minute * 60000
        }
      });

    this.apiService.onQuesLoad.subscribe((list: any) => {
      this.quesList = list;
      let i = 0;
      while (i < this.quesList.length) {
        this.clickedQues.push(false);
        this.answeredQues.push(false);
        this.unAnswered.push(false);
        i++;
      }
    });
    this.apiService.onAnswered.subscribe((index: any) => {
      console.log(index);
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
      this.unAnswered[index] = true;
      this.clickedQues[index + 1] = true;
    });
    this.apiService.onClear.subscribe((index: any) => {
      this.answeredQues[index] = false;
    });
  }

  quesClicked(index) {
    this.clickedQues[index] = true;
    console.log(this.clickedQues);
    this.apiService.onQuesClicked.emit(index);
  }
}
