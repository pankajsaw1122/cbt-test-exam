import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class MatDialogComponent implements OnInit {
  public confirmMessage: string;

  constructor(
    public dialogRef: MatDialogRef<MatDialogComponent>,
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
      this.confirmMessage = this.data.confirmMessage;
  }
}
