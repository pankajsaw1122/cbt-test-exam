import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { ApiService } from '../shared/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-instructions',
    templateUrl: './instructions.component.html',
    styleUrls: ['./instructions.component.scss'],
    animations: [routerTransition()]
})
export class InstructionsComponent implements OnInit {
    userId = '';
    userData = {
        name : '',
        class: '',
        roll: '',
    };
    errorMessage = 0;
    errorText = '';
    constructor(public router: Router, private apiService: ApiService, private paramRoute: ActivatedRoute) {}

    ngOnInit() {
    this.userId = this.paramRoute.snapshot.params['id'];

    this.apiService.setLoggedIn(this.userId).subscribe((data: any) => {
        console.log(data);
        if (data.status === 200 || data.status === '200') {
            sessionStorage.setItem('isLoggedIn', '1');

        } else if (data.status === 401) {
            this.router.navigate(['/']);
        } else {
            this.router.navigate(['/']);
        }
      });

    this.apiService.fetchCandidateDetails(this.userId).subscribe((data: any) => {
        // console.log(data.data);
        if (data.status === 200 || data.status === '200') {
            this.userData.name = data.data[0].fname + ' ' + data.data[0].lname;
            this.userData.class = data.data[0].classes;
            this.userData.roll = data.data[0].roll_no;

        } else if (data.status === 401) {
            this.router.navigate(['/']);
        } else {
            this.router.navigate(['/']);
        }
      });

    }

    startExam() {
            console.log('logged in worked');
            this.apiService.checkStartExam(this.userId).subscribe((data: any) => {
                console.log(data.data);
                if (data.status === 200 || data.status === '200') {
                  if (data.data[0].allow_exam === 1) {
                    this.router.navigate(['/dashboard']);
                  }
                } else {
                    this.errorMessage = 1;
                    this.errorText = data.message;
                }
              });
    }
}
