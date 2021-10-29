import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss']
})
export class AlertDialogComponent implements OnInit {

  @Input() title: string;
  @Input() message: string;

  constructor(private dialogRef: MatDialogRef<AlertDialogComponent>) { }

  ngOnInit(): void {
  }

  dismiss(didPressContinue: boolean) {
    this.dialogRef.close(didPressContinue);
  }

}
