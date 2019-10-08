import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ApiService } from '../shared/services/api.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  successMsg: boolean = false;
  successMsgDisplay: string = '';
  errorMsg: boolean = false;
  errorMsgDisplay: string = '';
  error: Error;
  elem;
  constructor(public router: Router, private apiService: ApiService, @Inject(DOCUMENT) private document: any) { }

  ngOnInit() {
    this.elem = document.documentElement;
    this.loginForm = new FormGroup({
      rollNo: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  onLoggedin() {
    console.log('logged in worked');
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }
    // this.router.navigate(['/dashboard']);
    this.apiService
      .loginCandidate(this.loginForm.value)
      .subscribe((data: any) => {
        console.log(data.data.userData);
        if (data.status === 200 || data.status === '200') {
          if (data.data.userData.allow_login === 1) {
            sessionStorage.setItem('authToken', data.data.token);
            sessionStorage.setItem('exam_name', data.data.userData.exam_name);
            sessionStorage.setItem('examId', data.data.userData.examId);
            sessionStorage.setItem('examMinute', data.data.userData.exam_minute);
            let id = data.data.userData.id;
            this.router.navigate(['/instructions/', id]);
          }
        } else {
          this.errorMessage(data.message);
        }
      });
  }
  successMessage(message) {
    this.successMsg = true;
    this.successMsgDisplay = message;

    setTimeout(() => {
      this.successMsg = false;
      this.successMsgDisplay = '';
    }, 3000);
  }

  errorMessage(message) {
    this.errorMsg = true;
    this.errorMsgDisplay = message;

    setTimeout(() => {
      this.errorMsg = false;
      this.errorMsgDisplay = '';
    }, 3000);
  }
}
