import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent  implements OnInit {
    pushRightClass: string = 'push-right';
    examData = {
        exam_name: '',
        exam_minute: '',
        total_marks: '',
        total_ques: ''
    };

    constructor(public router: Router, private apiService: ApiService) {
    }
  
    ngOnInit() {
      this.apiService
        .getExamData(sessionStorage.getItem('examId'))
        .subscribe((data: any) => {
          console.log(data.data);
          if (data.status === 200 || data.status === '200') {
            this.examData = data.data[0];
            // this.examMinute = data.data[0].exam_minute * 60000
          }
        });
    }
   
  }