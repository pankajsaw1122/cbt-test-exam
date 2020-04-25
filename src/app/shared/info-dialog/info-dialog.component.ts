import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.scss']
})
export class MatInfoDialogComponent implements OnInit {
  public confirmMessage: string;

  constructor(
    public dialogRef: MatDialogRef<MatInfoDialogComponent>,
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
      this.confirmMessage = this.data.confirmMessage;
  }
}
