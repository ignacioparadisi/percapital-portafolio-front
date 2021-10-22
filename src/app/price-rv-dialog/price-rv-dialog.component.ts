import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PriceRV } from 'src/common/classes/PriceRV';

@Component({
  selector: 'app-price-rv-dialog',
  templateUrl: './price-rv-dialog.component.html',
  styleUrls: ['./price-rv-dialog.component.scss']
})
export class PriceRvDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<PriceRvDialogComponent>) { }

  ngOnInit(): void {
  }


  dismiss(priceRV?: PriceRV) {
    this.dialogRef?.close(priceRV);
  }
}
