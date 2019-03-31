import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { CountdownComponent } from 'ngx-countdown';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  pushRightClass: string = 'push-right';
  examName: String = '';
  examMinute: number;
@ViewChild(CountdownComponent) counter: CountdownComponent;
  constructor(public router: Router, private apiService: ApiService) {
  }

  ngOnInit() {
    this.apiService
      .getExamData(sessionStorage.getItem('examId'))
      .subscribe((data: any) => {
        console.log(data.data);
        if (data.status === 200 || data.status === '200') {
          this.examMinute = data.data[0].exam_minute * 60;
          console.log(this.examMinute);
        }
      });
    this.examName = sessionStorage.getItem('exam_name');
  }

  onNotify(event: Event) {
    console.log(event);
    this.router.navigate(['/finishexam']);
  }
 
}
