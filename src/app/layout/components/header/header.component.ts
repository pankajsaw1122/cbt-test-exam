import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { CountdownComponent } from 'ngx-countdown';
import { MatDialog } from '@angular/material';
import { MatInfoDialogComponent } from 'src/app/shared/info-dialog/info-dialog.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  pushRightClass: string = 'push-right';
  examName: string = '';
  examMinute: number;
  notifyArray = [];
  @ViewChild(CountdownComponent, { static: true }) counter: CountdownComponent;
  constructor(public router: Router, private apiService: ApiService, public dialog: MatDialog) {
  }
  ngOnInit() {
    const params = {
      examId: sessionStorage.getItem('examId'),
      candtId: sessionStorage.getItem('candtId')
    };
    this.apiService
      .getExamData(params)
      .subscribe((data: any) => {
        if (data.status === 200 || data.status === '200') {
          this.examMinute = data.data[0].exam_minute * 60;
          if (data.data[0].left_minute !== 0) {
            this.examMinute = data.data[0].left_minute;
          }

          let totalMinuteIntrval = this.examMinute;
          while (totalMinuteIntrval > 60) {
            totalMinuteIntrval = totalMinuteIntrval - 60;
            this.notifyArray.push(totalMinuteIntrval);
          }
          this.notifyArray.push(1);
        }
      });
    this.examName = sessionStorage.getItem('exam_name');
  }

  onNotify(event) {
    const params = {
      candtId: sessionStorage.getItem('candtId'),
      left_minute: event / 1000
    };
    this.apiService.updateLeftMinute(params).subscribe((data: any) => {
      // console.log(data);
    });
    if (event === 900000 || event === 600000) {
      const dialogRef = this.dialog.open(MatInfoDialogComponent, {
        width: '30%',
        data: {
          id: '',
          confirmMessage: `Info: Only ${event === 900000 ? '15' : '10'} minutes left`
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        this.apiService.enableFinishBtn.emit(false);
      });
    } else if (event === 1000) {
      this.apiService.finishExam(sessionStorage.getItem('examId')).subscribe((data: any) => {
        if (data.status === 200 || data.status === '200') {
          this.router.navigate(['/finishexam']);
        } else {
        }
      });
    }
  }
}
